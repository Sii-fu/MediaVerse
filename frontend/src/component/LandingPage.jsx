import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/mediaverse_logo.png";
import bgImage from "../assets/bg_pic.jpg";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div
      className="landing-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <header className="landing-header">
        <img className="logo" alt="MediaVerse Logo" src={logo} />
        <a href="/admin-login" className="admin-login">
          {/* Admin Login */}
        </a>
      </header>

      <section className="cta-section">
        <h2>Explore • List • Discuss</h2>
        <Link to="/registration">
          <button className="cta-button">Sign Up</button>
        </Link>
        <p>
          Already have an account?{" "}
          <Link to="/Login" className="signin-link">
            Sign in
          </Link>
        </p>
        <div className="social-buttons">
          <button className="social-button google">
            <i className="fab fa-google"></i>
          </button>
          <button className="social-button facebook">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button className="social-button twitter">
            <i className="fab fa-twitter"></i>
          </button>
        </div>
      </section>

      <section className="about-section">
        <h3>About MediaVerse</h3>
        <p>
          With Watch2Gether you can watch YouTube together. Services like Vimeo,
          Netflix, Amazon, Disney & Co are also supported. Create a room and
          invite friends to your WatchParty.
        </p>
      </section>

      <section className="features-section">
        <div className="feature">
          <i className="fas fa-sync-alt feature-icon"></i>
          <p>Synchronized player for video and audio</p>
        </div>
        <div className="feature">
          <i className="fas fa-video feature-icon"></i>
          <p>Enjoy content from YouTube, Vimeo, and more</p>
        </div>
        <div className="feature">
          <i className="fas fa-music feature-icon"></i>
          <p>Create and share your WatchParty room</p>
        </div>
      </section>

      <section className="cards-section">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="card">
            <p>
              With Watch2Gether you can watch YouTube together. Services like
              Vimeo, Netflix, Amazon, Disney & Co are also supported. Create a
              room and invite friends to your WatchParty.
            </p>
            <div className="card-footer">- Ted by Email</div>
          </div>
        ))}
      </section>

      <footer className="landing-footer">
        <p>© 2024 MediaVerse. All rights reserved.</p>
        <nav>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/help">Help</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/disclaimer">Disclaimer</a>
        </nav>
      </footer>
    </div>
  );
}

export default LandingPage;
