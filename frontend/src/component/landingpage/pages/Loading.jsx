import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimationTitles from "./AnimationTitles";
import "./Loading.css"; // Importing the CSS file
import loading1 from "./loading1.png";
import loading2 from "./loading2.png";
import logo from "./mediaverse_logo.png";


function Loading() {
  // Like button functionality
  function toggleLike(e) {
    e.target.classList.toggle("liked");
  }

  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-content-upper">
          <motion.div
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8 }}
            className="loading-content-upper-left"
          >
            <AnimationTitles
              title="MediaVerse: Your Ultimate Unified Media Experience"
              className="loading-content-upper-left-text"
            />
            <p className="loading-content-upper-left-description">
              Explore a world of diverse media with MediaVerse—your one-stop
              platform for movies, series, anime, music, and more. Powered by
              Algo recommendations, real-time notifications, and a vibrant
              community, MediaVerse brings together all your favorite
              entertainment in one place. Discover new content, engage with
              fellow enthusiasts, and stay updated with personalized
              notifications about your media interests, all while enjoying
              seamless integration across platforms. Join us in revolutionizing
              the digital media landscape!
            </p>
            <button
              className="loading-content-upper-left-explore-btn"
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
            >
              Explore
            </button>
          </motion.div>

          <motion.div
            initial={{ x: 90 }}
            whileInView={{ x: 0 }}
            // animate={{ x: 0 }}
            transition={{ duration: 0.8 }}
            className="loading-content-upper-right"
          >
            {/* <img
              className="loading-content-upper-right-img"
              src={loading1}
              alt="Background"
            /> */}
            <div
              className="loading-content-upper-right-container"
              style={{
                backgroundImage: `url(${loading1})`,
                backgroundSize: "cover", // Ensures the image covers the div in both height and width
                backgroundPosition: "center", // Centers the image to avoid cutting important parts
                backgroundRepeat: "no-repeat", // Prevents the image from repeating
                objectFit: "fill", // Ensures the image covers the div in both height and width
                height: "300px", // Ensures the div takes full viewport height
                width: "80%", // Ensures the div takes full viewport width
              }}
            >
              <img
                className="loading-content-upper-right-container-img"
                src={logo}
                alt="Background"
              />
              <h2>
                Start Your Journey with MediaVerse—Sign Up and Unlock
                Personalized Content!
              </h2>
              <Link to="/registration">
                <button className="loading-content-upper-right-button">
                  Sign Up
                </button>
              </Link>
              <p>
                Already have an account?{" "}
                <Link
                  to="/Login"
                  className="loading-content-upper-right-signin-link"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            // animate={{ x: 0 }}
            transition={{ duration: 0.8 }}
          className="loading-content-middle"
        >
        <img
              className="loading-content-middle-img"
              src={loading2}
              alt="Background"
            />
        </motion.div>
      </div>
    </div>
  );
}

export default Loading;
