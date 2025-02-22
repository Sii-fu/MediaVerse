import { motion } from "framer-motion";
import AnimationTitles from "./AnimationTitles";
import "./AboutUs.css";
import { FaSearch, FaList, FaComments } from "react-icons/fa";

import about1 from "./about1.png";
import about2 from "./about2.png";
import about3 from "./about3.png";

function AboutUs() {
  return (
    <div className="about">
      <div className="about-top">
        <div className="about-container">
          <motion.div
            initial={{ x: -100 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.8 }}
            className="about-content-left"
          >
            <AnimationTitles
              title="What is MediaVerse?"
              className="about-title"
            />
            <p className="about-text">
              MediaVerse is a unified digital media platform designed to bring
              together movies, series, anime, and music in one place. Unlike
              existing platforms that focus on specific media types, MediaVerse
              integrates diverse content with recommendations, real-time
              notifications, and community-driven features. Users can explore,
              manage watchlists, engage in discussions, and even discover
              related merchandise—all in a seamless, interactive experience.
            </p>
            <button
              className="loading-content-upper-left-explore-btn"
              onClick={() => {
                const scrollHeight = document.body.scrollHeight;
                const halfScrollHeight = scrollHeight/1.7;
                window.scrollTo({ top: halfScrollHeight, behavior: "smooth" });
              }}
            >
              Read More
            </button>
          </motion.div>
          <motion.div
            initial={{ x: 100 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.8 }}
            className="about-content-right"
          >
            <div className="image-grid">
              <div className="image-item large">
                <img src={about3} alt="About Us" />
              </div>
              <div className="image-item small">
                <img src={about1} alt="About Us" />
              </div>
              <div className="image-item small">
                <img src={about2} alt="About Us" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="about-bottom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          // className="mobile-stats"
        >
          <h1 className="about-bottom-title">How It Works?</h1>
          <div className="mobile-stats">
            <div className="stat-item">
              <FaSearch className="stat-icon" />
              <div className="stat-text">
                <h5>Explore</h5>
                <span>
                  Discover a vast collection of movies, series, anime, and
                  music, all in one place.
                </span>
              </div>
            </div>
            <div className="stat-item">
              <FaList className="stat-icon" />
              <div className="stat-text">
                <h5>List</h5>
                <span>
                  Create and manage your watchlist, wishlist, and favorite media
                  effortlessly.
                </span>
              </div>
            </div>
            <div className="stat-item">
              <FaComments className="stat-icon" />
              <div className="stat-text">
                <h5>Discuss</h5>
                <span>
                  Engage with a vibrant community, share reviews, and
                  participate in discussions.
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutUs;
