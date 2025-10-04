import React from 'react'

const PitruSlider = () => {
  return (
 function PitruSlider() {
  return (
    <section className="pitru-slider-section relative overflow-hidden">
      <div className="before-left"></div>
      <div className="before-right"></div>

      <div className="pitru-slider-container max-w-[1200px] mx-auto flex flex-wrap items-center gap-10 relative z-10 px-4">
        {/* Slider */}
        <div className="pitru-slider relative flex-1 min-w-[380px] overflow-hidden rounded-xl shadow-lg">
          <div className="pitru-slides flex transition-transform duration-700 ease-in-out w-full">
            <img
              src="https://bharatutkarshmahayagya.org/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-21-at-17.00.49.jpeg"
              alt="Anna Daan Seva"
              className="h-80 w-full object-cover flex-shrink-0"
            />
            <img
              src="https://bharatutkarshmahayagya.org/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-21-at-17.00.49-2.jpeg"
              alt="परिवार कल्याण"
              className="h-80 w-full object-cover flex-shrink-0"
            />
            <img
              src="https://bharatutkarshmahayagya.org/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-21-at-17.00.50-2.jpeg"
              alt="Sadhu Bhojan Seva"
              className="h-80 w-full object-cover flex-shrink-0"
            />
            <img
              src="https://bharatutkarshmahayagya.org/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-21-at-17.00.50-5.jpeg"
              alt="Khichadi Vitaran Seva"
              className="h-80 w-full object-cover flex-shrink-0"
            />
          </div>
          <span className="pitru-caption absolute bottom-4 left-5 bg-black/70 text-white text-sm font-semibold px-3 py-1 rounded">
            श्रद्धा आहुति
          </span>
        </div>

        {/* Text */}
        <div className="pitru-text flex-1 min-w-[380px]">
          <h2 className="text-3xl font-bold mb-4 text-[#331a00]">
            भारत उत्कर्ष महायज्ञ
          </h2>
          <p className="text-gray-800 leading-relaxed mb-6">
            ब्रह्मलीन महर्षि महेश योगी जी की पावन प्रेरणा से 'भारत उत्कर्ष महायज्ञ'
            प्रत्येक भारतवासी की समृद्धि एवं भारतवर्ष की उन्नति हेतु आयोजित किया जा रहा है।
            महर्षि संस्थान के अध्यक्ष श्री अजय प्रकाश जी एवं महर्षि महेश योगी जी के परम शिष्य
            जगद्गुरु रामानंदाचार्य प्रेमेश्वर पीठाधीश्वर स्वामी श्री सतीशाचार्य जी के
            पावन निर्देशन में आयोजित यह महायज्ञ अनंत पुण्य की कामना प्राप्त करने वाले
            धर्मप्रेमी जनो को सादर आमंत्रित करता है। आप भौतिक रूप से अथवा आध्यात्मिक रूप से
            online अपनी आहुति अर्पित कर धर्मलाभ की प्राप्ति कर सकते हैं।
          </p>
          <a
            href="#donation-form"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold shadow hover:from-orange-600 hover:to-red-700"
          >
            Donate Now
          </a>
        </div>
      </div>
    </section>
  );
}
 
  )
}

export default PitruSlider