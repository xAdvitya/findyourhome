import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../../context/AuthContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  console.log("currentUser", currentUser);
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Discover Your Perfect Home with Ease</h1>
          <p>
            Whether you are buying your first home, searching for an investment
            property, or looking to rent, we make finding the perfect place
            simple and enjoyable. Explore a wide range of listings, from cozy
            apartments to spacious family homes, and let us help you turn your
            real estate dreams into reality.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
