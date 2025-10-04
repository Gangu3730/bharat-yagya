// server/index.js
import "dotenv/config";
import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";
import { promises as fs } from "fs";
import { v4 as uuid } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  })
);
app.use(express.json());

// Razorpay
const KEY_ID = process.env.RZP_KEY_ID;
const KEY_SECRET = process.env.RZP_KEY_SECRET;
if (!KEY_ID || !KEY_SECRET) {
  console.error("Missing RZP_KEY_ID / RZP_KEY_SECRET");
  process.exit(1);
}
const rzp = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });

// Simple JSON "DB"
const DB_PATH = path.join(__dirname, "donations.json");
async function readDB() {
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}
async function writeDB(rows) {
  await fs.writeFile(DB_PATH, JSON.stringify(rows, null, 2));
}

// Health
app.get("/", (_req, res) => res.send("Server OK"));

// Create order
app.post("/create-order", async (req, res) => {
  try {
    let { amount, name, email, phone, seva } = req.body || {};
    amount = parseInt(amount, 10);
    if (!Number.isFinite(amount) || amount < 1) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }
    const order = await rzp.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
      notes: { name, email, phone, seva },
      payment_capture: 1,
    });
    res.json({
      success: true,
      key: KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Order error:", err?.error || err?.message);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
});

// Save donor + payment (client success handler se call)
app.post("/donations", async (req, res) => {
  try {
    const { donor, payment } = req.body || {};
    if (!donor?.name || !donor?.email || !donor?.phone || !donor?.amount) {
      return res.status(400).json({ success: false, message: "Missing donor fields" });
    }
    const id = uuid().slice(0, 8);
    const rows = await readDB();
    rows.unshift({
      id,
      created_at: new Date().toISOString(),
      donor,
      payment,
    });
    await writeDB(rows);
    res.json({ success: true, id });
  } catch (e) {
    console.error("donations save error:", e);
    res.status(500).json({ success: false });
  }
});

// PDF Receipt
app.get("/receipt/:id", async (req, res) => {
  const rows = await readDB();
  const row = rows.find((r) => r.id === req.params.id);
  if (!row) return res.status(404).send("Not found");

  const { donor, payment, created_at } = row;

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="receipt-${row.id}.pdf"`);

  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(res);

  // Optional logo
  try {
    const logoPath = path.join(__dirname, "assets", "logo.png");
    await fs.access(logoPath);
    doc.image(logoPath, 260, 20, { width: 80 });
  } catch {}
  doc.moveDown(3);

  doc.fontSize(16).text("Maharishi Ved Vigyan Sansthan", { align: "center" });
  doc.moveDown(0.5);
  doc
    .fontSize(10)
    .text(
      "Registered Address: 121, First Floor, DLF Galleria, Mayur Vihar Phase-I, Delhi-110091",
      { align: "center" }
    )
    .moveDown(1.2);
  doc.fontSize(18).text("Donation Receipt", { align: "center" }).moveDown();

  const line = () => doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();
  doc.moveDown(0.5);
  line();
  doc.moveDown(0.5);

  doc
    .fontSize(11)
    .text(`Receipt No: ${row.id}`, { continued: true })
    .text(`Date: ${new Date(created_at).toLocaleDateString()}`, { align: "right" });

  doc.moveDown();
  doc.text(`Name: ${donor.name}`);
  doc.text(`Gotra: ${donor.gotra || "-"}`);
  doc.text(`Email: ${donor.email}   Phone: ${donor.phone}`);
  doc.text(`Seva: ${donor.seva}`);
  doc.text(`Donation Amount: ₹ ${donor.amount}`);
  doc.text(`Payment ID: ${payment?.razorpay_payment_id || "-"}`);
  doc.moveDown(1);
  line();

  doc
    .moveDown(1.2)
    .fontSize(10)
    .text("Thank you for your generous contribution. This receipt is system-generated.", {
      align: "center",
    });
  doc.end();
});

/* ==================== ADMIN (Basic Auth) ==================== */
function basicAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const [type, creds] = auth.split(" ");
  if (type !== "Basic" || !creds) {
    res.set("WWW-Authenticate", 'Basic realm="Admin"');
    return res.status(401).send("Authentication required");
  }
  const [user, pass] = Buffer.from(creds, "base64").toString().split(":");
  if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) return next();
  res.set("WWW-Authenticate", 'Basic realm="Admin"');
  return res.status(401).send("Unauthorized");
}

app.get("/admin", basicAuth, (req, res) => res.type("html").send(adminHTML));

app.get("/admin/api/payments", basicAuth, async (req, res) => {
  try {
    const { from, to, count = 25, skip = 0 } = req.query;
    const params = {
      count: Math.min(parseInt(count, 10) || 25, 100),
      skip: parseInt(skip, 10) || 0,
    };
    if (from) params.from = Math.floor(new Date(from).getTime() / 1000);
    if (to) params.to = Math.floor(new Date(to).getTime() / 1000);
    const list = await rzp.payments.all(params);
    res.json(list);
  } catch (e) {
    console.error("/admin/api/payments error:", e?.error || e?.message);
    res.status(500).json({ error: e?.error || e?.message });
  }
});

app.get("/admin/api/payment/:id", basicAuth, async (req, res) => {
  try {
    const p = await rzp.payments.fetch(req.params.id);
    res.json(p);
  } catch (e) {
    res.status(404).json({ error: e?.error || e?.message });
  }
});

app.get("/admin/api/order/:id", basicAuth, async (req, res) => {
  try {
    const o = await rzp.orders.fetch(req.params.id);
    const list = await rzp.orders.fetchPayments(req.params.id);
    res.json({ order: o, payments: list });
  } catch (e) {
    res.status(404).json({ error: e?.error || e?.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API http://localhost:${PORT}`);
  console.log(`RZP key: ${KEY_ID?.slice(0, 8)}...`);
});

/* =============== Inline Admin HTML =============== */
const adminHTML = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Admin · Razorpay Payments</title>
<style>
:root{--bg:#fff7ef;--card:#fff;--accent:#e65100;--muted:#fde7cf}
body{margin:0;font:14px/1.45 system-ui,Segoe UI,Roboto,Arial;background:var(--bg);color:#222}
.wrap{max-width:1100px;margin:28px auto;padding:0 16px}
h1{margin:0 0 16px;font-size:20px;font-weight:800}
.band{background:#fff;border:1px solid #eee;box-shadow:0 8px 24px rgba(0,0,0,.06);border-radius:12px;padding:14px}
.row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.row>*{flex:0 0 auto}
input,select,button{height:36px;border-radius:8px;border:1px solid #ddd;padding:0 10px;font:inherit}
button{background:var(--accent);color:#fff;border:none;font-weight:700;cursor:pointer}
button:disabled{opacity:.6;cursor:not-allowed}
table{width:100%;border-collapse:separate;border-spacing:0;margin-top:14px;background:var(--card);border-radius:12px;overflow:hidden;border:1px solid #eee}
th,td{padding:10px;border-bottom:1px solid #f1f1f1;font-size:12.5px;vertical-align:top}
th{background:var(--muted);text-align:left}
tr:last-child td{border-bottom:0}
.pill{display:inline-block;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:800}
.ok{background:#e8f7ec;color:#127c33;border:1px solid #c9eccf}
.fail{background:#fde7e7;color:#b42318;border:1px solid #f5caca}
.copy{padding:2px 6px;border-radius:6px;border:1px solid #ddd;background:#fafafa;cursor:pointer}
.right{display:flex;gap:8px;margin-left:auto}
.foot{display:flex;gap:8px;align-items:center;margin-top:12px}
.muted{opacity:.7}
</style>
</head>
<body>
<div class="wrap">
  <h1>Razorpay Payments · Admin</h1>
  <div class="band">
    <div class="row">
      <label>From <input type="date" id="from"></label>
      <label>To <input type="date" id="to"></label>
      <label>Count
        <select id="count"><option>25</option><option>50</option><option>100</option></select>
      </label>
      <button id="load">Load</button>
      <div class="right">
        <button id="prev">◀ Prev</button>
        <button id="next">Next ▶</button>
      </div>
    </div>

    <table id="tbl">
      <thead><tr>
        <th>Date</th><th>Payment ID</th><th>Order ID</th><th>Amount</th><th>Status</th><th>Method</th><th>Customer</th><th></th>
      </tr></thead>
      <tbody></tbody>
    </table>

    <div class="foot">
      <span id="stats" class="muted">—</span>
      <span class="right"></span>
    </div>
  </div>
</div>

<script>
const state={skip:0};
const D=id=>document.getElementById(id);
const tbody=document.querySelector("#tbl tbody");
const fmt=p=> "₹ "+(p/100).toLocaleString("en-IN",{maximumFractionDigits:2});
const dt=t=> new Date(t*1000).toLocaleString();
function pill(s){const ok=s==="captured";return '<span class="pill '+(ok?'ok':'fail')+'">'+s+'</span>'}

async function load(){
  const params=new URLSearchParams();
  const from=D('from').value, to=D('to').value, count=D('count').value||'25';
  if(from) params.set('from', from);
  if(to) params.set('to', to);
  params.set('count', count);
  params.set('skip', state.skip);

  D('load').disabled=true;
  const res=await fetch('/admin/api/payments?'+params.toString());
  const data=await res.json();
  D('load').disabled=false;

  tbody.innerHTML='';
  (data.items||[]).forEach(p=>{
    const tr=document.createElement('tr');
    tr.innerHTML=\`
      <td>\${dt(p.created_at)}</td>
      <td><code>\${p.id}</code></td>
      <td><code>\${p.order_id||'-'}</code></td>
      <td>\${fmt(p.amount)}</td>
      <td>\${pill(p.status)}</td>
      <td>\${p.method||'-'}</td>
      <td>\${p.email||p.contact||'-'}</td>
      <td><button class="copy" data-val="\${p.id}">Copy ID</button></td>\`;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.copy').forEach(b=>{
    b.onclick=async()=>{try{await navigator.clipboard.writeText(b.dataset.val);b.textContent='Copied';setTimeout(()=>b.textContent='Copy ID',800);}catch{}};
  });

  const start=state.skip+1, end=state.skip+(data.items?.length||0);
  D('stats').textContent=\`Showing \${start}–\${end} (count=\${count}, skip=\${state.skip})\`;
}
D('load').onclick=()=>{state.skip=0;load()};
D('next').onclick=()=>{state.skip+=parseInt(D('count').value||'25',10);load()};
D('prev').onclick=()=>{state.skip=Math.max(0,state.skip-parseInt(D('count').value||'25',10));load()};

const today=new Date().toISOString().slice(0,10);
D('to').value=today;
const yday=new Date(Date.now()-86400000).toISOString().slice(0,10);
D('from').value=yday;

load();
</script>
</body></html>`;
