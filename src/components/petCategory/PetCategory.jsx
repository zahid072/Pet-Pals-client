import React from "react";
import { Link } from "react-router-dom";

const PetCategory = () => {
  return (
    <div>
      <h1 className="text-center font-semibold text-3xl">Browse By Category</h1>
      <div className="mt-5 flex gap-5 flex-wrap justify-center">
        <Link to={"/category/cat"}>
          {" "}
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg")`,
            }}
            className="flex items-center categoryHover bg-cover bg-center bg-no-repeat justify-center cursor-pointer size-48 rounded-lg border-2 border-orange-500"
          >
            <h2 className="text-white text-xl font-semibold font-gilda uppercase tracking-widest">
              Cats
            </h2>
          </div>
        </Link>
        {/* ---------------------------------------------------------- */}
        <Link to={"/category/dog"}>
          {" "}
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2013/May/130522/6C7536084-g-hlt-120105-puppy-423p.jpg")`,
            }}
            className="flex items-center categoryHover bg-cover bg-center bg-no-repeat justify-center cursor-pointer size-48 rounded-lg border-2 border-orange-500"
          >
            <h2 className="text-white text-xl font-semibold font-gilda uppercase tracking-widest">
              Dogs
            </h2>
          </div>
        </Link>
        {/* ------------------------------------------------------- */}
        <Link to={"/category/rabbit"}>
          {" "}
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://hips.hearstapps.com/hmg-prod/images/rabbit-breeds-american-white-1553635287.jpg?crop=0.976xw:0.651xh;0.0242xw,0.291xh&resize=980:*")`,
            }}
            className="flex items-center categoryHover bg-cover bg-center bg-no-repeat justify-center cursor-pointer size-48 rounded-lg border-2 border-orange-500"
          >
            <h2 className="text-white text-xl font-semibold font-gilda uppercase tracking-widest">
              Rabbits 
            </h2>
          </div>
        </Link>
        {/* ------------------------------------------------------- */}
        <Link to={"/category/fish"}>
          {" "}
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq00uXqOWNZb9Hcc-i0DPZk7MRQRyzxNV-3g&s")`,
            }}
            className="flex items-center categoryHover bg-cover bg-center bg-no-repeat justify-center cursor-pointer size-48 rounded-lg border-2 border-orange-500"
          >
            <h2 className="text-white text-xl font-bold font-gilda uppercase tracking-widest">
              Fishes 
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PetCategory;
