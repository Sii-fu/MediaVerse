import { motion } from 'framer-motion';
import { FaFilm, FaRobot, FaListAlt, FaUsers, FaBell } from 'react-icons/fa'; // Importing icons from react-icons
import './WhyChoose.css'; // Import the CSS file

function WhyChoose() {
  return (
    <div className="why-choose-container">
      <h2 className="why-choose-title">Why Choose MediaVerse?</h2>
      <div className="features-container">
        {/* Feature 1: Unified Media Database */}
        <motion.div
          className="feature"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FaFilm className="feature-icon" />
          <h4 className="feature-title">Unified Media Database</h4>
          <p className="feature-description">
            Access movies, series, anime, and music in one place.
          </p>
        </motion.div>

        {/* Feature 2: AI-Powered Recommendations */}
        <motion.div
          className="feature"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FaRobot className="feature-icon" />
          <h4 className="feature-title"> Recommendations</h4>
          <p className="feature-description">
            Discover content tailored to your preferences.
          </p>
        </motion.div>

        {/* Feature 3: Personalized Watchlists & Wishlists */}
        <motion.div
          className="feature"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FaListAlt className="feature-icon" />
          <h4 className="feature-title">Personalized Watchlists & Wishlists</h4>
          <p className="feature-description">
            Track your favorite media effortlessly.
          </p>
        </motion.div>

        {/* Feature 4: Community Discussions & Reviews */}
        <motion.div
          className="feature"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FaUsers className="feature-icon" />
          <h4 className="feature-title">Community Discussions & Reviews</h4>
          <p className="feature-description">
            Engage with media enthusiasts worldwide.
          </p>
        </motion.div>

        {/* Feature 5: Real-Time Notifications */}
        <motion.div
          className="feature"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FaBell className="feature-icon" />
          <h4 className="feature-title">Real-Time Notifications</h4>
          <p className="feature-description">
            Stay updated on new releases, streaming availability, and more.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default WhyChoose;
