import React from "react";
import "./aboutPage.scss";

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Our Platform</h1>
        <p>
          Connecting you with your dream home, whether you're buying, renting,
          or selling.
        </p>
      </div>
      <div className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            Our platform is dedicated to making the process of finding, renting,
            or buying a property as seamless and enjoyable as possible. Whether
            you're looking to purchase your first home, rent a cozy apartment,
            or list your own property, we've got you covered.
          </p>
          <h2>What We Offer</h2>
          <p>
            We provide a wide range of listings, from apartments and houses to
            condos and land. Our advanced search tools allow you to filter
            properties by location, type, price range, and more, making it
            easier to find exactly what you're looking for.
          </p>
          <h2>Why Choose Us</h2>
          <p>
            Our user-friendly interface, comprehensive property database, and
            commitment to customer satisfaction set us apart. We are here to
            support you at every step, from browsing listings to closing deals.
          </p>
          <h2>Join Our Community</h2>
          <p>
            Become a part of our growing community of homeowners, renters, and
            real estate enthusiasts. List your property, explore our offerings,
            and let us help you find your next home.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
