import { useState } from "react";
import Popup from "./Components/Popup";
import "./Contact.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [matter, setMatter] = useState("");

  return (
    <div className="contact">
      <div className="contact-container">
        <h1 className="contact-heading">Contact Us</h1>
        <form className="contact-form">
          <input
            className="name"
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="email"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <textarea
            className="matter"
            type="text"
            value={matter}
            placeholder="Matter"
            onChange={(e) => {
              setMatter(e.target.value);
            }}
          />
          <div className="btn">
            <Popup name={name} email={email} matter={matter} />
          </div>
        </form>
      </div>
    </div>
  );
}
