import React from "react";
import Banner from "../../components/banner/Banner";
import PetCategory from "../../components/petCategory/PetCategory";
import CallToAction from "../../components/callToAction/CallToAction";
import HomeAbout from "../../components/homeAbout/HomeAbout";
import SectionTop from "../../components/sectionTop/SectionTop";

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
      <div className="container mx-auto p-6">
        {/* Featured Pets Section */}
        <section className="mb-12">
          <SectionTop title={"Featured Pets"} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <img
                src="https://assets.orvis.com/is/image/orvisprd/AdobeStock_106921037"
                alt="Pet 1"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Rocky</h3>
                <p className="text-gray-600">
                  A friendly dog looking for a loving home.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <img
                src="https://www.beverlyhillsvets.com/blog/wp-content/uploads/2017/11/BevHills_iStock-577334124.jpg"
                alt="Pet 2"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Tweety</h3>
                <p className="text-gray-600">
                  A playful budgie with a curious nature.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbt_InO2qRhSOhHCre6amMT7OQF9MEtlcJsA&s"
                alt="Pet 3"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Rex</h3>
                <p className="text-gray-600">A playful pup who loves to run.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section>
          <SectionTop title={"Success Stories"} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <img
                src="https://supremepetfoods.com/wp-content/uploads/2023/04/iStock-1406196935-1200px.jpg"
                alt="Success Story 1"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Thumper New Home</h3>
                <p className="text-gray-600">
                  Thumper found his forever home and loves playing in his new
                  backyard.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <img
                src="https://www.dogster.com/wp-content/uploads/2024/03/shutterstock_1717550440-1-scaled.jpg"
                alt="Success Story 2"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Max's Happy Tail</h3>
                <p className="text-gray-600">
                  Max is enjoying his new family and long walks in the park.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <img
                src="https://img.freepik.com/premium-photo/elegant-siamese-cat-with-striking-blue-eyes-lounging-golden-silk-pillow-against-dark_996993-13491.jpg"
                alt="Success Story 3"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Luna's New Life</h3>
                <p className="text-gray-600">
                  Luna has settled into her new home and loves her cozy bed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
