import React, { useState } from "react";

const faqs = [
  {
    q: "Q1. वैदिक शास्त्रों में महायज्ञ की महिमा क्या बताई गई है?",
    a: "A1. वैदिक शास्त्र महायज्ञ को श्रेष्ठतम अनुष्ठानों में गिनते हैं, जो पितरों, समाज और सम्पूर्ण सृष्टि के कल्याण हेतु सम्पादित किया जाता है। इसमें वैदिक मंत्रों के उच्चारण और आहुति के माध्यम से सार्वभौमिक शांति एवं समृद्धि की कामना की जाती है।",
  },
  {
    q: "Q2. महायज्ञ का वास्तविक सार क्या है?",
    a: "A2. महायज्ञ का सार है – सामूहिक कल्याण हेतु सामूहिक आहुति, जिसमें प्रत्येक व्यक्ति का योगदान राष्ट्र और समाज के लिए पुण्यफलकारी होता है।",
  },
  {
    q: "Q3. महायज्ञ में सहभागिता से व्यक्ति और परिवार को क्या लाभ मिलता है?",
    a: "A3. सहभागिता से व्यक्ति और परिवार को आध्यात्मिक उत्थान, मानसिक शांति और सामाजिक मान्यता प्राप्त होती है।",
  },
  {
    q: "Q4. भारत उत्कर्ष महायज्ञ का आयोजन किस उद्देश्य से किया जा रहा है?",
    a: "A4. यह महायज्ञ राष्ट्र की समृद्धि, एकता और शांति के लिए आयोजित किया जा रहा है।",
  },
  {
    q: "Q5. इस महायज्ञ में मेरी सहभागिता का क्या महत्व है?",
    a: "A5. प्रत्येक व्यक्ति की सहभागिता सामूहिक चेतना को प्रभावित करती है, जिससे समाज में सकारात्मक ऊर्जा का प्रसार होता है।",
  },
];

export default function FAQSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-16 bg-[radial-gradient(ellipse_at_top,_rgba(139,69,19,.10),transparent_55%),#fbf4e8]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Left */}
          <div className="md:col-span-1">
            <div className="mx-auto w-max">
              <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-2xl shadow-inner">
                ❓
              </div>
              <h2 className="text-center md:text-left text-2xl md:text-3xl font-extrabold tracking-wide text-[#7b3f10]">
                Frequently Asked
                <br />
                Questions
              </h2>
              <div className="mx-auto md:mx-0 mt-4 h-[3px] w-28 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />
            </div>
          </div>

          {/* Right */}
          <div className="md:col-span-3 space-y-4">
            {faqs.map((item, i) => {
              const open = active === i;
              return (
                <div
                  key={i}
                  className="
                    group rounded-xl overflow-hidden
                    border-2 border-[#7b3f10]/70
                    bg-[linear-gradient(180deg,#fff6e6_0%,#ffefd9_100%)]
                    shadow-[0_10px_24px_rgba(72,41,10,.15)]
                    ring-1 ring-[#c79244]/40
                    transition
                  "
                >
                  <button
                    onClick={() => setActive(open ? -1 : i)}
                    className="
                      w-full flex items-center justify-between gap-4
                      px-5 py-4 text-left
                      text-[#5b2f0c] font-semibold
                      hover:bg-amber-50/60
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50
                    "
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                  >
                    <span className="flex-1">{item.q}</span>
                    <svg
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                        open ? "rotate-180" : "rotate-0"
                      } text-[#7b3f10]`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <div
                    id={`faq-panel-${i}`}
                    className={`
                      grid transition-all duration-400 ease-out
                      ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                    `}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 pt-0">
                        <div
                          className="
                            rounded-lg bg-[linear-gradient(180deg,rgba(255,237,213,.85),rgba(255,236,205,.65))]
                            p-4 text-[15px] leading-relaxed
                            text-stone-800 ring-1 ring-[#e6b36b]/50
                          "
                        >
                          {item.a}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-[3px] w-full bg-[repeating-linear-gradient(90deg,#8a4f1d_0_18px,#5d2f0a_18px_28px)] opacity-50" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
