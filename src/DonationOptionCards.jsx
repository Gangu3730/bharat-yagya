import React from "react";

export default function DonationOptionCards() {
  const cards = [
    { img: "/donationcard1.webp", title: "श्रद्धा आहुति (व्यक्तिगत आहुति - आत्म कल्याणार्थ)" },
    { img: "/donationcard2.webp", title: "परिवार कल्याण (समस्त परिवार की मंगल कामना हेतु)" },
    { img: "/donationcard3.webp", title: "धर्म सेवा (परिवार कल्याण एवं 9 ब्राह्मण दक्षिणा)" },
    { img: "/donationcard4.webp", title: "सम्पूर्ण यज्ञ वेदी दक्षिणा (परिवार की समृद्धि एवं यज्ञ वेदी दक्षिणा)" },
  ];

  return (
    <section className="py-16 bg-[#fff6ed]" id="donation-options">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8 text-[#c65a07]">
          Seva / Donation Options
        </h2>

        {/* same layout: each card = left img (1/2) + right orange (1/2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md border border-orange-100 overflow-hidden w-full max-w-[300px]"
            >
              <div className="relative h-48 flex">
                {/* LEFT: image (hover zoom only on image) */}
                <div className="w-1/2 h-full overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110"
                  />
                </div>

                {/* RIGHT: orange block (unchanged layout) */}
                <div className="w-1/2 bg-gradient-to-b from-[#ff7f22] to-[#e45705] text-white flex flex-col justify-between p-4">
                  <h3 className="text-sm font-semibold leading-snug">
                    {card.title}
                  </h3>

                  {/* link to form */}
                  <a
                    href="#donation-form"
                    className="mt-3 inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-[13px] font-semibold text-[#e45705] shadow-sm transition hover:bg-gray-100"
                  >
                    Donate
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
