import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultCard from "../../components/defaultCard/DefaultCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const BrowseCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const { petName } = useParams();
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get(`/pets/category/${petName}`).then((res) => {
      setCategoryData(res.data);
    });
  }, [petName]);
  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://stjohnsgardencentre.co.uk/wp-content/uploads/2016/05/cat-rabbit-hamster-dog.jpg")`,
        }}
        className="h-[300px] w-full bg-no-repeat bg-cover bg-center flex flex-col gap-5 items-center justify-center text-white"
      >
        <div className="z-50">
          <h1 className="font-baloo uppercase font-semibold md:text-5xl text-3xl text-center lg:text-6xl text-white ">
            {petName} For Adoptions
          </h1>
        </div>
      </div>
      <div className="grid gap-7 my-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center max-w-7xl lg:mx-auto mx-2">
        {categoryData.length > 0 &&
          categoryData.map((pet, index) => (
            <DefaultCard key={index} pet={pet} />
          ))}
      </div>
    </div>
  );
};

export default BrowseCategory;
