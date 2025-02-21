import { Swiper, SwiperSlide } from "swiper/react";
import AnimationTitles from "./AnimationTitles";
import "swiper/css";
import "./Join.css"; // Import the new CSS file
import u1 from "../image/u1.png";
import u2 from "../image/u2.png";
import u3 from "../image/u3.png";

function Join() {
  return (
    <div className="join-section">
       <AnimationTitles
          title="User Testimonials"
          className="join-title"
        />
        <p className="join-text">
        Some testimonials from users highlighting how MediaVerse improves their media experience
        </p>

      <div className="join-container">
        <Swiper
          grabCursor={true}
          spaceBetween={40}
          slidesPerView={1}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            808: { slidesPerView: 3 },
          }}
          className="join-swiper"
        >
          {[ 
            {
              id: 1,
              image: u1, // Replace with actual image paths
              feedback: "“MediaVerse has completely transformed my entertainment experience! The personalized recommendations are spot-on, and I never have to search endlessly for something to watch.” – Emma L.",
            },
            {
              id: 2,
              image: u2,
              feedback: "“As a huge anime fan, I’ve never found a platform that offers such a seamless experience across multiple media types. I can explore movies, series, and anime all in one place. MediaVerse is truly the ultimate entertainment hub.” – Daniel R.",
            },
            {
              id: 3,
              image: u3,
              feedback: "“I love how easy it is to keep track of my watchlist and wishlist. MediaVerse’s real-time notifications keep me updated on new releases and special offers. It's the most convenient way to stay connected to everything I love.” – Sophia W.",
            },
          ].map((item) => (
            <SwiperSlide key={item.id} className="join-slide">
              {/* <h4 className="slide-number">{item.id}</h4> */}
              <img src={item.image} alt="User Feedback" className="slide-image" />
              <AnimationTitles title="User Feedback" className="slide-title" />
              <p className="slide-feedback">{item.feedback}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Join;
