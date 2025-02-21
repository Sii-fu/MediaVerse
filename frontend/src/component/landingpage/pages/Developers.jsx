import { Swiper, SwiperSlide } from "swiper/react";
import AnimationTitles from "./AnimationTitles";
import { motion } from "framer-motion";
import "swiper/css";
import "./Developers.css";

// Import image
import d1 from "../image/dev/d1.png";
import d2 from "../image/dev/d2.png";
import d3 from "../image/dev/d3.png";
import d4 from "../image/dev/d4.png";
import d5 from "../image/dev/d5.png";
import d6 from "../image/dev/d6.png";
import d7 from "../image/dev/d7.png";
import d8 from "../image/dev/d8.png";
import d9 from "../image/dev/d9.png";
import d10 from "../image/dev/d10.png";
import d11 from "../image/dev/d11.png";
import d12 from "../image/dev/d12.png";
import d13 from "../image/dev/d13.png";

function Developers() {
  return (
    <div className="developers-container">
      <div className="developers-content">
        <AnimationTitles
          title="About Company User"
          className="developers-title"
        />
        <p className="developers-text">
          At MediaVerse, we recognize the vital role companies play in shaping
          the entertainment ecosystem. Whether you're a production company,
          distribution network, or content creator, our platform offers an
          innovative and comprehensive way to reach a broader audience and
          interact with users.
        </p>

        <motion.div
          initial={{ x: -80 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            className="developers-swiper"
            grabCursor={true}
            slidesPerView={5}
            breakpoints={{
              0: { slidesPerView: 2 },
              596: { slidesPerView: 3 },
              998: { slidesPerView: 4 },
              1198: { slidesPerView: 5 },
            }}
          >
            {developerData1.map((dev, index) => (
              <SwiperSlide key={index}>
                <div className="developer-card">
                  <img className="developer-logo" src={dev.img} alt="logo" />
                  <h6 className="developer-name">{dev.name}</h6>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          initial={{ x: 80 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            className="developers-swiper"
            grabCursor={true}
            slidesPerView={4}
            breakpoints={{
              0: { slidesPerView: 2 },
              596: { slidesPerView: 3 },
              1298: { slidesPerView: 5 },
            }}
          >
            {developerData2.map((dev, index) => (
              <SwiperSlide key={index}>
                <div className="developer-card">
                  <img className="developer-logo" src={dev.img} alt="logo" />
                  <h6 className="developer-name">{dev.name}</h6>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
}

export default Developers;

// Developer data (with imported image)
const developerData1 = [
  { img: d1, name: "Walt Disney Pictures" },
  { img: d2, name: "21st Century Fox" },
  { img: d3, name: "NBC" },
  { img: d4, name: "Metro Goldwyn Mayer" },
  { img: d5, name: "Netflix" },
  { img: d6, name: "Nickelodean" },
];

const developerData2 = [
  { img: d7, name: "Mtv" },
  { img: d8, name: "History" },
  { img: d9, name: "Warner Bros" },
  { img: d10, name: "Paramount Channel" },
  { img: d11, name: "Nextar" },
  { img: d12, name: "VC" },
  { img: d13, name: "Sky" },
];
