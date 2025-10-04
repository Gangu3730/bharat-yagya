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

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-[#fde7cf] py-12 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Left Side */}
        <div className="md:col-span-1 flex flex-col items-start">
          <div className="flex items-center gap-3">
            <span className="text-5xl text-orange-600">❓</span>
            <h2 className="text-2xl font-bold text-gray-800 leading-tight">
              Frequently Asked <br /> Question!
            </h2>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:col-span-3 space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded shadow bg-[#fda65d] text-white`}
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold"
              >
                <span>{faq.q}</span>
                <span className="text-xl">
                  {activeIndex === i ? "▲" : "▼"}
                </span>
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === i ? "max-h-40 py-3" : "max-h-0"
                }`}
              >
                <p className="text-black">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
