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
        {/* <a href="/admin-login" className="admin-login"> */}
          Admin Login
        {/* </a> */}
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

        {/* About MediaVerse Section */}
 <div className="about-section">
        {/* Left Content */}
        <div className="about-left">
          <div className="about-title">
            <span className="title-text">
              About <span className="highlight">MediaVerse</span>
            </span>
          </div>
          <div className="about-description">
          MediaVerse brings together movies, series, anime, and music into one cohesive platform, making it the ultimate destination for media enthusiasts. Whether you're discovering, organizing, or sharing your favorite media, MediaVerse has everything you need in one place
          </div>
        </div>

        {/* Right Content */}
        <div className="about-right">
          {/* Features List */}
          <div className="features-list">
            <div className="feature-item">
              <i className="fas fa-sync-alt feature-icon"></i>
              <div className="feature-text">
              MediaVerse is your ultimate hub for movies, series, anime, and music.
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-headphones-alt feature-icon"></i>
              <div className="feature-text">
              Discover detailed information about your favorite media all in one place.
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-video feature-icon"></i>
              <div className="feature-text">
              Organize and list your favorites effortlessly with personalized tools
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-play-circle feature-icon"></i>
              <p className="feature-text">
              Engage in vibrant discussions and connect with like-minded enthusiasts.
              </p>
            </div>
            <div className="feature-item">
              <i className="fas fa-music feature-icon"></i>
              <div className="feature-text">
              Stay updated with the latest news, releases, and trends in entertainment!
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="features-section">
        <div className="feature">
          <i className="fas fa-sync-alt feature-icon"></i>
          <p>Explore the Media World</p>
        </div>
        <div className="feature">
          <i className="fas fa-video feature-icon"></i>
          <p>List all your types</p>
        </div>
        <div className="feature">
          <i className="fas fa-music feature-icon"></i>
          <p>Discuss with others</p>
        </div>
      </section>

      <section className="cards-section">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="card">
            <p>
            MediaVerse is your ultimate hub for movies, series, anime, and music. Discover detailed information about your favorite media all in one place. Organize and list your favorites effortlessly with personalized tools. Engage in vibrant discussions and connect with like-minded enthusiasts. Stay updated with the latest news, releases, and trends in entertainment!
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
