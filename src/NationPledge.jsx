import React from "react";

const NationPledge = () => {
  return (
    <section className="relative py-16 bg-[radial-gradient(ellipse_at_top,_rgba(139,69,19,.10),transparent_55%),#fbf4e8]">
      <div className="mx-auto max-w-5xl px-4">
        {/* Parchment / Ancient framed card */}
        <div className="
          relative rounded-[18px]
          bg-[linear-gradient(180deg,#fff6e3_0%,#fff0d6_100%)]
          shadow-[0_18px_40px_rgba(72,41,10,.20)]
          border-2 border-[#7b3f10] ring-1 ring-[#b87333]/50
          overflow-hidden
        ">
          {/* Corner ornaments */}
          <span className="pointer-events-none absolute -left-2 -top-2 h-10 w-10 rotate-45 rounded-[6px] border-2 border-[#7b3f10] bg-[#c7903a]/30" />
          <span className="pointer-events-none absolute -right-2 -top-2 h-10 w-10 -rotate-45 rounded-[6px] border-2 border-[#7b3f10] bg-[#c7903a]/30" />
          <span className="pointer-events-none absolute -left-2 -bottom-2 h-10 w-10 -rotate-45 rounded-[6px] border-2 border-[#7b3f10] bg-[#c7903a]/30" />
          <span className="pointer-events-none absolute -right-2 -bottom-2 h-10 w-10 rotate-45 rounded-[6px] border-2 border-[#7b3f10] bg-[#c7903a]/30" />

          {/* Top band with motif */}
          <div className="relative bg-[linear-gradient(90deg,#5d2f0a_0%,#8a4f1d_50%,#5d2f0a_100%)]">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-center">
              <div className="flex items-center gap-3 text-amber-200">
                <span className="text-xl">ॐ</span>
                <h2 className="text-center text-[22px] sm:text-2xl md:text-[26px] font-extrabold tracking-wide text-amber-200 drop-shadow">
                  राष्ट्र-संकल्प पत्र
                </h2>
                <span className="text-xl">ॐ</span>
              </div>
            </div>
            <div className="h-[3px] w-full bg-[repeating-linear-gradient(90deg,#d6a752_0_22px,transparent_22px_28px)] opacity-80" />
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 md:p-10">
            {/* subtle center divider */}
            <div className="mx-auto mb-6 h-[2px] w-28 rounded-full bg-gradient-to-r from-[#c68a2b] via-[#e3b35b] to-[#c68a2b]" />

            <div className="space-y-5 text-[15.5px] leading-relaxed text-stone-800">
              <p className="pl-4 border-l-[3px] border-[#c68a2b] bg-amber-50/40 rounded-sm">
                वैदिक शास्त्र महायज्ञ की महिमा का गुणगान करते हैं, इसे श्रेष्ठतम
                अनुष्ठानों में से एक बताते हैं, जो पितरों, समाज और सम्पूर्ण सृष्टि
                के कल्याण के लिए सम्पादित किया जाता है।
              </p>

              <p>
                इस पावन यज्ञ के दौरान भक्तजन वैदिक मंत्रों का उच्चारण करते हैं,
                आहुति अर्पित करते हैं और सार्वभौमिक शांति एवं समृद्धि हेतु अपनी
                सेवाएँ समर्पित करते हैं।
              </p>

              <p>
                महायज्ञ का सार केवल अनुष्ठान ही नहीं, बल्कि निरंतर दैवीय सेवा में
                निहित है। शास्त्र बताते हैं कि जब भगवान श्रीकृष्ण यज्ञ और सेवा से
                प्रसन्न होते हैं, तब पितरों सहित समस्त प्राणी स्वतः सुखी हो जाते
                हैं।
              </p>

              <p>
                भारत उत्कर्ष महायज्ञ का आयोजन समस्त सनातन धर्मावलंबियों समेत पूरे
                भारत को एक सूत्र में पिरोने के उद्देश्य से किया जा रहा है।
              </p>

              <p>
                भगवान श्रीकृष्ण, जिन्हें योगेश्वर भी कहा जाता है, फलों द्वारा
                महायज्ञ में की गई स्वीकृति को स्वीकार करते हैं और इसे उसी रूप में,
                समाज एवं आत्माओं के कल्याण हेतु प्रदान देते हैं।
              </p>

              <p>
                भारत उत्कर्ष महायज्ञ आपके लिए एक दिव्य अवसर है, जहाँ आपकी
                सहभागिता पूरे भारत वर्ष की ऊर्जा का कारण बनते हुए आपके व्यक्तिगत
                जीवन में परिवर्तनकारी सेवा का रूप ले सकती है।
              </p>

              <p className="rounded-xl bg-[linear-gradient(180deg,rgba(255,237,213,.9),rgba(255,236,205,.75))] p-4 font-semibold text-[#7b3f10] ring-1 ring-[#c79244]/60 shadow-inner">
                आइये! ब्रह्मलीन परम तपस्वी पूज्य महर्षि महेश योगी जी की प्रेरणा से
                आयोजित भारत उत्कर्ष महायज्ञ में सम्मिलित होकर अपने जीवन को सफल
                बनाते हुए, राष्ट्र के उत्थान का मार्ग प्रशस्त करें।
              </p>
            </div>
          </div>

          {/* bottom fillet */}
          <div className="h-[6px] w-full bg-[repeating-linear-gradient(90deg,#8a4f1d_0_18px,#5d2f0a_18px_28px)] opacity-70" />
        </div>
      </div>
    </section>
  );
};

export default NationPledge;
