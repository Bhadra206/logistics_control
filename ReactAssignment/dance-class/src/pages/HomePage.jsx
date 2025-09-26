import "./HompePage.css";

export default function HomePage() {
  return (
    <div className="background">
      <div className="left">
        <img src="./src/assets/Dance6.png" alt="dance" className="image" />
      </div>
      <div className="right">
        <h1 className="home-heading">Welcome to Srishti 🤗</h1>
        <h2 className="text-box">Life is better when you dance! </h2>
        <p className="text-box1">
          Feet on the floor, heart in the music! Dance is the hidden language of
          the soul! Find your groove and dance it out!
        </p>
        <button type="button" className="join-btn">Join Us</button>
      </div>
    </div>
  );
}
