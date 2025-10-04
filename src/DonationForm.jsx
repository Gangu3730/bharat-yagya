import React, { useState, useEffect } from "react";
import "./donationform.css";

export default function DonationForm() {
  const [donor, setDonor] = useState({
    seva: "सम्पूर्ण यज्ञ वेदी दक्षिणा",
    amount: "",
    name: "",
    phone: "",
    email: "",
    dob: "",
    pincode: "",
    gotra: "",
  });
  const [loading, setLoading] = useState(false);
  const presetAmounts = [10000, 5100, 3100, 2100, 1100, 501];

  const API = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  useEffect(() => {
    if (!window.Razorpay) {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied: " + text);
    } catch {
      alert("Copy failed");
    }
  };

  const handlePayment = async () => {
    if (!donor.name || !donor.phone || !donor.email || !donor.amount) {
      alert("⚠️ Please fill all required fields");
      return;
    }
    if (!window.Razorpay) {
      alert("Razorpay not loaded yet. Please try again.");
      return;
    }

    try {
      setLoading(true);

      // 1) Create order on server (server must return {success,key,orderId,amount,currency})
      const res = await fetch(`${API}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donor),
      });
      const data = await res.json();
      if (!data?.success) {
        console.error("Create-order error:", data);
        alert("Order creation failed. Please try again.");
        setLoading(false);
        return;
      }

      // 2) Open Razorpay checkout
      const options = {
        key: data.key,
        order_id: data.orderId,
        amount: data.amount,
        currency: data.currency,
        name: "Maharishi Ved Vigyan Sansthan",
        description: donor.seva + " Donation",
        prefill: {
          name: donor.name,
          email: donor.email,
          contact: donor.phone,
        },
        theme: { color: "#e65100" },
        handler: async function (response) {
          alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
          // Optional: save donor + payment on your server
          try {
            await fetch(`${API}/save-donor`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ donor, payment: response }),
            });
          } catch {}
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="raaj-seva" className="seva-wrap">
      <h2 className="seva-title">
        Offer your Seva in the Mahayagya and receive the divine blessings
      </h2>

      <div className="donation-box green-skin">
        <div className="donation-form">
          <div className="row-2">
            <div className="field">
              <label>Select Seva</label>
              <select
                value={donor.seva}
                onChange={(e) => setDonor({ ...donor, seva: e.target.value })}
              >
                <option>सम्पूर्ण यज्ञ वेदी दक्षिणा</option>
                <option>श्रद्धा आहुति</option>
                <option>परिवार कल्याण</option>
                <option>धर्म सेवा</option>
              </select>
            </div>
            <div className="field">
              <label>Amount</label>
              <input
                type="number"
                placeholder="Custom Amount"
                value={donor.amount}
                onChange={(e) => setDonor({ ...donor, amount: e.target.value })}
              />
            </div>
          </div>

          <div className="amount-options chips">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setDonor({ ...donor, amount: amt })}
              >
                {amt}
              </button>
            ))}
          </div>

          <div className="row-2">
            <div className="field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your Full Name"
                value={donor.name}
                onChange={(e) => setDonor({ ...donor, name: e.target.value })}
              />
            </div>
            <div className="field">
              <label>WhatsApp Number</label>
              <div className="phone-wrap">
                <span className="cc">+91</span>
                <input
                  type="text"
                  placeholder="9876543210"
                  value={donor.phone}
                  onChange={(e) => setDonor({ ...donor, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="row-2">
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                placeholder="Your Email"
                value={donor.email}
                onChange={(e) => setDonor({ ...donor, email: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Date of Birth (Optional)</label>
              <input
                type="date"
                value={donor.dob}
                onChange={(e) => setDonor({ ...donor, dob: e.target.value })}
              />
            </div>
          </div>

          <div className="row-2">
            <div className="field">
              <label>Pincode</label>
              <input
                type="text"
                placeholder="City Pincode"
                value={donor.pincode}
                onChange={(e) => setDonor({ ...donor, pincode: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Gotra (Optional)</label>
              <input
                type="text"
                placeholder="Your Gotra"
                value={donor.gotra}
                onChange={(e) => setDonor({ ...donor, gotra: e.target.value })}
              />
            </div>
          </div>

          <button
            type="button"
            className="donate-btn"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Donate"}
          </button>
        </div>

        <div className="right-combo">
          <div className="rc-grid">
            <section className="rc-col upi">
              <h3 className="rc-title">📱 For UPI & QR</h3>
              <img src="/qr.webp" alt="UPI QR" className="raaj-qr" />
              <div className="upi-line">
                <code id="upi-id">maharishivedvigyan@sbi</code>
                <button
                  type="button"
                  className="micro-copy"
                  onClick={() => handleCopy("maharishivedvigyan@sbi")}
                >
                  Copy
                </button>
              </div>
            </section>

            <section className="rc-col bank">
              <h3 className="rc-title">🏦 For Bank Transfer</h3>
              <ul className="bank-list">
                <li><b>Account Name:</b> महर्षि वेदविज्ञान संस्थान</li>
                <li><b>Account Number:</b> 10002303204</li>
                <li><b>Bank Name:</b> State Bank of India (SBI)</li>
                <li><b>IFSC Code:</b> SBIN0031789</li>
                <li><b>Branch:</b> B Block Market, Sarita Vihar, New Delhi – 110076</li>
              </ul>
              <button
                type="button"
                className="copy-strip"
                onClick={() =>
                  handleCopy(
                    "Account: महर्षि वेदविज्ञान संस्थान\nAcc No: 10002303204\nBank: SBI\nIFSC: SBIN0031789\nBranch: B Block Market, Sarita Vihar, New Delhi – 110076"
                  )
                }
              >
                Copy
              </button>
            </section>
          </div>

          <div className="rc-notes">
            <p className="tiny">
              *By proceeding, you are agreeing to our Terms & Conditions & Privacy Policy
            </p>
          </div>

          <div className="badges">
            <span className="pill green">Tax Benefits</span>
            <span className="badge logos">
              <img src="https://cdn.worldvectorlogo.com/logos/paytm-1.svg" alt="Paytm" />
            </span>
            <span className="badge logos">
              <img src="https://cdn.worldvectorlogo.com/logos/razorpay.svg" alt="Razorpay" />
            </span>
            <span className="badge logos">
              <img src="https://cdn.worldvectorlogo.com/logos/google-pay-2.svg" alt="Google Pay" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
