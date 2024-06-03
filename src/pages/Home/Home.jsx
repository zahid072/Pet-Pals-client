import React from "react";
import Banner from "../../components/banner/Banner";
import PetCategory from "../../components/petCategory/PetCategory";

const Home = () => {
  return (
    <div>
      <div>
        <Banner />
      </div>
      <div className="md:py-12 py-7">
        <PetCategory />
      </div>
    </div>
  );
};

export default Home;
