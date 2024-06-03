import React from "react";
import SectionTop from "../sectionTop/SectionTop";

const CallToAction = () => {
  return (
    <div>
      <SectionTop title={"Welcome To PET PALS"}/>
      <div className="flex lg:flex-row flex-col justify-center gap-4">
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url("https://i.ibb.co/y8xrY7n/Default-Create-a-heartwarming-scene-featuring-a-fluffy-Austral-3.jpg")`,
          }}
          className="lg:w-2/4 w-full bg-cover bg-center bg-no-repeat h-[600px] rounded"
        ></div>
        <div className="lg:w-2/4 w-full flex flex-col items-center gap-5">
          <p className="md:text-xl text-start">
            We believe every pet deserves a warm and loving home. By adopting,
            you're not just taking home a new friend; you're changing a life.
            Our furry companions are waiting to fill your home with joy, love,
            and loyalty. Take the first step towards making a difference and
            find your perfect pet match today.
          </p>
          <button className="px-6 py-3 bg-deep-orange-500 rounded-full text-white uppercase btn-hover border-2 border-white">
            Adopt Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
