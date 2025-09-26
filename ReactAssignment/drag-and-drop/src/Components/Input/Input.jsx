import React, { useState } from "react";
import "./Input.css";

function Input({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input) {
      return;
    }
    onSubmit(input);
    setInput("");
  };

  return (
    <div className="container">
      <input
        className="input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="button" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}

export default Input;
