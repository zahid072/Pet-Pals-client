import React, { useEffect, useState } from "react";
import "./textShadow.css";

const TextShadow = ({ title }) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [textShadow, setTextShadow] = useState("");

  useEffect(() => {
    const handleMouseMove = (event) => {
      const container = document.querySelector(".container3");
      const rect = container.getBoundingClientRect();
      const isInContainer =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (isInContainer) {
        setMouseX(event.clientX - rect.left);
        setMouseY(event.clientY - rect.top);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const text = document.getElementById("text");

    let distanceX = mouseX - text.offsetLeft - text.offsetWidth / 2;
    let distanceY = mouseY - text.offsetTop - text.offsetHeight / 2;

    let newShadow = "";
    for (let i = 0; i < 200; i++) {
      let shadowX = -distanceX * (i / 200);
      let shadowY = -distanceY * (i / 200);
      let opacity = 1 - i / 100;
      newShadow +=
        (newShadow ? "," : "") +
        shadowX +
        "px " +
        shadowY +
        "px 0 rgba(33,33,33," +
        opacity +
        ")";
    }
    setTextShadow(newShadow);
  }, [mouseX, mouseY]);

  return (
    <div className="container3 md:min-h-72 min-h-52">
      <div id="text" className="md:text-8xl uppercase text-4xl" style={{ textShadow: textShadow }}>
        {title}
      </div>
      <div
        id="light"
        className="md:size-12 size-7"
        style={{
          left: mouseX,
          top: mouseY,
        }}
      />
    </div>
  );
};

export default TextShadow;
