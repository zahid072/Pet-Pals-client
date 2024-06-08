import React, { useEffect, useState } from "react";
import useAllData from "../../Hooks/useAllData";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import useAuth from "../../Hooks/useAuth";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import DefaultCard from "../../components/defaultCard/DefaultCard";
import useAllPetsData from "../../Hooks/useAllPetsData";
import CardSkeleton from "../../components/skeletonLoader/CardSkeleton";
// ____________select options______________________
const options = [
  { value: "", label: "Select Pet Category" },
  { value: "Cat", label: "Cat" },
  { value: "Dog", label: "Dog" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Fish", label: "Fish" },
  { value: "Bird", label: "Bird" },
];

const PetListing = () => {
  const [petListingData, PetListingRefetch, isLoading] = useAllData();
  const [petCategory, setPetCategory] = useState(null);
  const [isDisplay, setIsDisplay] = useState(true);
  const [defaultValue, setDefaultValue] = useState("");
  const { setSearchTerm } = useAuth();
  const [filteredPets, setFilteredPets] = useState([]);
  const [allPets, fetchNextPage, hasNextPage, refetch, allPetsIsLoading] =
    useAllPetsData();

  useEffect(() => {
    const filterPets = allPets?.filter((pet) => pet.adopted === false);
    if (filterPets) {
      setFilteredPets(filterPets);
    }
  }, [allPets]);

  // :::::::::::::::::::::::::::::::::::::::::::::::::::
  const handleChange = (selectedValue) => {
    setIsDisplay(false);
    setPetCategory(selectedValue);
    setSearchTerm({ name: "", category: selectedValue.value });
    if (selectedValue.value === "") {
      setIsDisplay(true);
    }
  };
  useEffect(() => {
    PetListingRefetch();
  }, [petCategory]);
  const handleSearch = (e) => {
    e.preventDefault();
    setIsDisplay(false);
    PetListingRefetch();
    setDefaultValue("");
    if (defaultValue === "") {
      setIsDisplay(true);
    }
  };
  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::

  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://png.pngtree.com/background/20230522/original/pngtree-puppy-and-a-kitten-next-to-each-other-picture-image_2696745.jpg")`,
        }}
        className="h-[300px] w-full bg-no-repeat bg-cover bg-center flex flex-col gap-5 items-center justify-center text-white"
      >
        <div className="z-50">
          <h1 className="font-baloo uppercase font-semibold md:text-5xl text-3xl text-center lg:text-6xl text-white ">
            Pets For Adoptions
          </h1>
        </div>
      </div>
      <div className="flex md:flex-row flex-col justify-center items-center md:py-7 py-3 w-full border-b-2 border-gray-300 my-5">
        <form onSubmit={handleSearch} className="p-2 flex w-full max-w-md">
          <Input
            onChange={(e) => {
              setSearchTerm({ name: e.target.value, category: "" });
              setDefaultValue(e.target.value);
            }}
            value={defaultValue}
            label="Search"
          />
          <button className="px-4 py-2 rounded bg-deep-orange-500 ">
            <MagnifyingGlassIcon className="h-5 w-5 text-white" />
          </button>
        </form>
        <div className="max-w-72 w-full">
          <Select
            defaultValue={petCategory}
            onChange={handleChange}
            options={options}
            placeholder="Select Pet Category"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                padding: 10,
              }),
            }}
            required
          />
        </div>
      </div>
      <div className="my-6 ">
        {isDisplay ? (
          <>
            <InfiniteScroll
              dataLength={filteredPets ? filteredPets.length : 0}
              next={() => fetchNextPage()}
              hasMore={hasNextPage}
              loader={<div class="loader-infinite"></div>}
            >
              {allPetsIsLoading ? (
                <CardSkeleton />
              ) : (
                <div className="grid gap-7 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center max-w-7xl lg:mx-auto mx-2">
                  {filteredPets &&
                    filteredPets.map((pet, index) => (
                      <div key={index} className="w-full">
                        <DefaultCard pet={pet} />
                      </div>
                    ))}
                </div>
              )}
            </InfiniteScroll>
          </>
        ) : (
          <>
            {isLoading ? (
              <CardSkeleton />
            ) : petListingData.length === 0 ? (
              <p className="text-xl text-red-400 font-semibold text-center py-5">
                No Pets Found.
              </p>
            ) : (
              <div className="grid gap-7 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center max-w-7xl lg:mx-auto mx-2">
                {petListingData.length > 0 &&
                  petListingData.map((pet, index) => (
                    <DefaultCard key={index} pet={pet} />
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PetListing;
