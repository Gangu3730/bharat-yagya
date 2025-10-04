import React from "react";
import "./Contributors.css";

const donors = [
  { name: "Yadavendra Kumar", amount: "₹204", time: "about 8 hours ago" },
  { name: "Prabha Verma", amount: "₹256", time: "about 17 hours ago" },
  { name: "Gautam Prakash", amount: "₹103", time: "about 18 hours ago" },
  { name: "Jyoti", amount: "₹110", time: "about 18 hours ago" },
  { name: "Rajesh Sharma", amount: "₹310", time: "about 21 hours ago" },
  { name: "Anil Kumar", amount: "₹150", time: "about 22 hours ago" },
  { name: "Deepak Verma", amount: "₹210", time: "about 23 hours ago" },
  { name: "Ritu Tandon", amount: "₹1122", time: "about 18 hours ago" },
  { name: "Shrinivas Adabe", amount: "₹103", time: "about 18 hours ago" },
  { name: "Chinar Gosavi", amount: "₹103", time: "about 20 hours ago" },
  { name: "Prerna Saxena", amount: "₹103", time: "about 19 hours ago" },
  { name: "Tamal Maity", amount: "₹204", time: "about 19 hours ago" },
];

const loopDonors = [...donors, ...donors, ...donors];

const Contributors = () => {
  return (
    <section className="contrib-section">
      <h2 className="contrib-title">Respected Contributors</h2>

      {/* Row 1 */}
      <div className="contrib-marquee ltr">
        <div className="contrib-track">
          {loopDonors.map((d, i) => (
            <div key={`r1-${i}`} className="contrib-card">
              <p className="font-semibold">{d.name}</p>
              <p>
                Donated <span>{d.amount}</span>
              </p>
              <small>{d.time}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="contrib-marquee rtl">
        <div className="contrib-track">
          {loopDonors.map((d, i) => (
            <div key={`r2-${i}`} className="contrib-card">
              <p className="font-semibold">{d.name}</p>
              <p>
                Donated <span>{d.amount}</span>
              </p>
              <small>{d.time}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 */}
      <div className="contrib-marquee ltr">
        <div className="contrib-track">
          {loopDonors.map((d, i) => (
            <div key={`r3-${i}`} className="contrib-card">
              <p className="font-semibold">{d.name}</p>
              <p>
                Donated <span>{d.amount}</span>
              </p>
              <small>{d.time}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contributors;
