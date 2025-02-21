import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import "./Partners.css";
import p1 from "../image/p1.png";
import p2 from "../image/p2.png";
import p3 from "../image/p3.png";
import p4 from "../image/p4.png";
import p5 from "../image/p5.png";
import p6 from "../image/p6.png";

const partnerLogos = [p1, p2, p3, p4, p5, p6];

function Partners() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="partners"
    >
      <h1 className="partners-title">About Our Media</h1>
      <p className="partners-text">
        At MediaVerse, we understand that today's entertainment goes beyond just
        movies or music. Our platform brings together a rich collection of
        diverse media types, from movies, series, and anime to music. We believe
        in creating a unified space where you can enjoy, discover, and explore
        your favorite media across different formats. Our extensive media
        database features detailed information about each title, including
        ratings, genres, descriptions, trailers, and release dates. Whether
        you're a fan of the latest blockbuster movie, a binge-watcher of series,
        or a dedicated anime lover, MediaVerse provides a holistic entertainment
        experience to suit every taste.
      </p>
      <div className="partners-wrapper">
        <Swiper
          className="partners-swiper"
          loop={true}
          grabCursor={true}
          breakpoints={{
            0: { slidesPerView: 2 },
            520: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 5 },
            1198: { slidesPerView: 5 },
          }}
        >
          {partnerLogos.map((logo, index) => (
            <SwiperSlide key={index}>
              <img
                src={logo}
                alt={`Partner ${index + 1}`}
                className="partner-logo"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
}

export default Partners;
