import React from "react";
import Banner from "../../components/banner/Banner";
import PetCategory from "../../components/petCategory/PetCategory";
import CallToAction from "../../components/callToAction/CallToAction";

const Home = () => {
  return (
    <div>
      <div>
        <Banner />
      </div>
      <div className="md:py-14 py-7 max-w-7xl lg:mx-auto mx-2">
        <CallToAction />
      </div>
      <div className="md:py-12 py-7 max-w-7xl lg:mx-auto mx-2">
        <PetCategory />
      </div>
    </div>
  );
};

export default Home;
