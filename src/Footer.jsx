import React from "react";

const Icon = {
  Facebook: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 4.99 3.66 9.14 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.8 8.44-4.95 8.44-9.94Z" />
    </svg>
  ),
  X: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 3H22l-7.1 8.15L23 21h-6.55l-5.14-6.12L5.4 21H2l7.62-8.77L1.5 3h6.7l4.66 5.56L18.9 3Zm-2.3 16h2.02L7.53 5H5.45L16.6 19Z" />
    </svg>
  ),
  YouTube: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.5 6.2a3.1 3.1 0 0 0-2.2-2.2C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.3.5A3.1 3.1 0 0 0 .5 6.2 32 32 0 0 0 0 12a32 32 0 0 0 .5 5.8 3.1 3.1 0 0 0 2.2 2.2c1.8.5 9.3.5 9.3.5s7.5 0 9.3-.5a3.1 3.1 0 0 0 2.2-2.2A32 32 0 0 0 24 12a32 32 0 0 0-.5-5.8ZM9.7 15.5v-7L16 12l-6.3 3.5Z" />
    </svg>
  ),
  Instagram: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2 0 1.9.3 2.3.5.6.2 1 .5 1.5 1 .4.4.7.9 1 1.5.2.4.5 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.3 1.9-.5 2.3-.2.6-.5 1-1 1.5-.4.4-.9.7-1.5 1-.4.2-1.1.5-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.9-.3-2.3-.5a4.3 4.3 0 0 1-1.5-1c-.4-.4-.7-.9-1-1.5-.2-.4-.5-1.1-.5-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.3-1.9.5-2.3.2-.6.5-1 1-1.5.4-.4.9-.7 1.5-1 .4-.2 1.1-.5 2.3-.5C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.8.1-1 0-1.6.2-1.9.4-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.2.3-.4.9-.4 1.9-.1 1.2-.1 1.6-.1 4.8s0 3.5.1 4.8c0 1 .2 1.6.4 1.9.2.5.4.8.8 1.2.4.4.7.6 1.2.8.3.2.9.4 1.9.4 1.2.1 1.6.1 4.8.1s3.5 0 4.8-.1c1 0 1.6-.2 1.9-.4.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.3.4-.9.4-1.9.1-1.2.1-1.6.1-4.8s0-3.5-.1-4.8c0-1-.2-1.6-.4-1.9a3 3 0 0 0-.8-1.2c-.4-.4-.7-.6-1.2-.8-.3-.2-.9-.4-1.9-.4-1.2-.1-1.6-.1-4.8-.1Zm0 3.1a6.9 6.9 0 1 1 0 13.8 6.9 6.9 0 0 1 0-13.8Zm0 2a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm5.6-2.4a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2Z" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#2b1b11] text-[#e9ddcf]">
      {/* CTA Bar */}
      <div className="bg-gradient-to-r from-[#3a2417] to-[#472b19]">
        <div className="container mx-auto px-4 py-6">
          <div className="rounded-2xl bg-white/95 shadow-xl border border-[#e7d7c2] backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#1e120c]">
                  आपका हर दान भारत उत्कर्ष महायज्ञ में एक आहुति है
                </h3>
                <p className="text-sm md:text-base text-[#6b5645] mt-1">
                  जो पितरों के सम्मान, समाज के कल्याण और राष्ट्र के उत्थान का मार्ग प्रशस्त करता है।
                </p>
              </div>
              <a
                href="#donation-form"
                className="inline-flex items-center rounded-xl bg-[#b8672a] text-white font-semibold px-5 py-3 hover:bg-[#a85d25] active:translate-y-[1px] transition"
              >
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Policies */}
      <div className="border-t border-[#4a2f21]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 text-center">
            <a href="/refund" className="hover:text-white transition">
              Refund &amp; Cancellation Policy
            </a>
            <a href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>

      {/* Social + Copyright */}
      <div className="border-t border-[#4a2f21]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-5">
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com/"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-[#3a2417] hover:bg-[#4a2f21] text-[#f4e9dc] flex items-center justify-center shadow-md transition"
              >
                <Icon.Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/"
                aria-label="X"
                className="w-10 h-10 rounded-full bg-[#3a2417] hover:bg-[#4a2f21] text-[#f4e9dc] flex items-center justify-center shadow-md transition"
              >
                <Icon.X className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-[#3a2417] hover:bg-[#4a2f21] text-[#f4e9dc] flex items-center justify-center shadow-md transition"
              >
                <Icon.YouTube className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#3a2417] hover:bg-[#4a2f21] text-[#f4e9dc] flex items-center justify-center shadow-md transition"
              >
                <Icon.Instagram className="w-5 h-5" />
              </a>
            </div>

            <p className="text-sm text-[#ccb9a4]">
              © {new Date().getFullYear()} Bharat Utkarsh Mahayagya. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
