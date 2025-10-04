import React from 'react'

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
    <div className="container py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
        Seva / Donation Options
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative h-48 flex">
              <img
                src={card.img}
                alt={card.title}
                className="w-1/2 h-full object-cover"
              />
              <div className="w-1/2 bg-orange-600 text-white flex flex-col justify-between p-4">
                <h3 className="text-sm font-semibold leading-snug">
                  {card.title}
                </h3>
                <button className="mt-3 px-4 py-2 bg-white text-orange-600 rounded-md shadow hover:bg-gray-100">
                  Donate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationOptionCards;
