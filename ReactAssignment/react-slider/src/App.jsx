import "./App.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 0,
  };
  return (
    <div className="app">
      <div className="container">
        <Slider {...settings}>
          {data.map((d) => (
            <div className="card-container">
              <div className="image-container">
                <img className="image" src={d.img} alt="" />
              </div>
              <div className="text-container">
                <p className="name">{d.name}</p>
                <p className="review">{d.review}</p>
                <button className="card-button">Read More</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
const data = [
  {
    name: "Michell Tom",
    img: "/Student/student2.jpg",
    review:
      "The classes are very engaging and the instructor is patient. I learned so much in a short time.",
  },
  {
    name: "Jacob Paul",
    img: "/Student/student1.avif",
    review: "Great experience! The environment is friendly and motivating.",
  },
  {
    name: "Laurel Jhonson",
    img: "/Student/student3.jpg",
    review:
      "I loved the personalized attention. The steps were explained clearly.",
  },
  {
    name: "Emily Johnson",
    img: "/Student/student5.jpg",
    review:
      "Good place to improve skills, but the timings could be a bit more flexible.",
  },
  {
    name: "Olivia Taylor",
    img: "/Student/student4.jpg",
    review:
      "Amazing atmosphere, very professional staff, and fun learning sessions!",
  },
  {
    name: "Sophia Brown",
    img: "/Student/student6.jpg",
    review: "The sessions are worth every penny. Highly recommend this place.",
  },
];

export default App;
