import React, { useState } from "react";
import "../styles/styles.css";

const AnimatedBox = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
  };

  return (
    <div className="card">
      <h2>Animated Box</h2>

      <button className="button" onClick={handleClick} disabled={isAnimating}>
        Animate Box
      </button>

      <div style={{ marginTop: "20px" }}>
        <div className={`animated-box ${isAnimating ? "moving" : ""}`} />
      </div>
    </div>
  );
};

export default AnimatedBox;
