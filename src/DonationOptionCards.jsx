import React from "react";

const DonationOptionCards = () => {
  const cards = [
    {
      img: "/donationcard1.webp",
      title: "श्रद्धा आहुति (व्यक्तिगत आहुति - आत्म कल्याणार्थ)",
    },
    {
      img: "/donationcard2.webp",
      title: "परिवार कल्याण (समस्त परिवार की मंगल कामना हेतु)",
    },
    {
      img: "/donationcard3.webp",
      title: "धर्म सेवा (परिवार कल्याण एवं 9 ब्राह्मण दक्षिणा)",
    },
    {
      img: "/donationcard4.webp",
      title: "सम्पूर्ण यज्ञ वेदी दक्षिणा (परिवार की समृद्धि एवं यज्ञ वेदी दक्षिणा)",
    },
  ];

  return (
    <div className="container py-16 text-center">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-12 text-orange-700 tracking-tight">
        Seva / Donation Options
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
        {cards.map((card, i) => (
          <div
            key={i}
            className="group bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative flex h-52">
              <img
                src={card.img}
                alt={card.title}
                className="w-1/2 h-full object-cover"
              />

              <div className="w-1/2 bg-gradient-to-br from-orange-600 to-orange-500 text-white flex flex-col justify-between p-4 transition-all duration-500 group-hover:from-orange-700 group-hover:to-orange-600">
                <h3 className="text-sm font-semibold leading-snug">
                  {card.title}
                </h3>

                <a
                  href="#donation-form"
                  className="mt-3 px-4 py-2 bg-white text-orange-600 font-semibold rounded-md shadow-md hover:bg-gray-100 transition-all duration-300"
                >
                  Donate
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Soft fade bottom border */}
      <div className="mt-12 w-32 h-1 bg-orange-600 mx-auto rounded-full"></div>
    </div>
  );
};

export default DonationOptionCards;
