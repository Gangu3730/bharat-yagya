import React, { useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";

const API = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function ThankYou() {
  const [search] = useSearchParams();
  const id = search.get("donationId") || "";
  // aap donor name ko bhi query se bhej sakte ho, par name ko server se fetch karna best hota hai
  // yahan simple version: URL me ?name=...
  const name = decodeURIComponent(search.get("name") || "");

  // agar name nahi aa raha to aap chaho to ek GET /donations/:id endpoint banake fetch karke name set kar lo.

  const downloadReceipt = () => {
    window.location.href = `${API}/receipt/${id}`;
  };

  const downloadCertificate = async () => {
    // hidden template ke text ko set karo
    const el = document.getElementById("cert-name");
    if (el) el.textContent = name || "Devotee";

    const host = document.getElementById("cert-a4");
    if (!host) return;

    // bg image load sure
    const bg = host.querySelector("img");
    if (bg && (!bg.complete || bg.naturalHeight === 0)) {
      await new Promise((resolve) => {
        bg.onload = resolve;
        bg.onerror = resolve;
      });
    }
    const canvas = await html2canvas(host, { scale: 2, useCORS: true, backgroundColor: null });
    const link = document.createElement("a");
    link.download = `certificate-${id}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-[70vh] bg-[#f7faef] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white border border-[#cfd8b2] rounded-xl p-6 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-[#2e7d32] mb-2">Thank You for Your Donation!</h2>
        <p className="text-gray-700 mb-6">
          We deeply appreciate your generous contribution to Maharishi Ved Vigyan Sansthan.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={downloadReceipt}
            className="px-4 py-3 rounded-lg font-semibold text-white bg-[#e65100] hover:opacity-95"
          >
            ⬇ Download Receipt (PDF)
          </button>
          <button
            onClick={downloadCertificate}
            className="px-4 py-3 rounded-lg font-semibold text-white bg-[#2e7d32] hover:opacity-95"
          >
            🏅 Download Certificate (Image)
          </button>
          <a
            href="/"
            className="px-4 py-3 rounded-lg font-semibold text-white bg-gray-600 hover:opacity-95"
          >
            🏠 Back to Home
          </a>
        </div>
      </div>

      {/* Hidden certificate template */}
      <div id="cert-hidden" style={{ position: "fixed", left: -99999, top: -99999, opacity: 0 }}>
        <div
          id="cert-a4"
          style={{
            width: "297mm", height: "210mm", position: "relative", overflow: "hidden",
          }}
        >
          {/* BG image (apni image put in /public/certificate-bg.png ya external URL) */}
          <img
            src="/certificate-bg.png"
            alt="Certificate Background"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            crossOrigin="anonymous"
          />
          {/* Name position – adjust top/right/width/font as needed */}
          <p
            id="cert-name"
            style={{
              position: "absolute",
              top: "33%",
              right: "21%",
              width: 320,
              fontSize: 30,
              fontWeight: 700,
              lineHeight: "39px",
              textAlign: "center",
              color: "#000",
              margin: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
}
