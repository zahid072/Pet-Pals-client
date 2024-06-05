import React, { useEffect, useState } from "react";
import useAllData from "../../Hooks/useAllData";
import PetDetails from "../../components/petDetails/PetDetails";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import useAuth from "../../Hooks/useAuth";
import Select from "react-select";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
// ____________select options______________________
const options = [
  { value: "", label: "Select Pet Category" },
  { value: "Cat", label: "Cat" },
  { value: "Dog", label: "Dog" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Fish", label: "Fish" },
  { value: "Bird", label: "Bird" },
];
// _____________________________________________
const getPets = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `http://localhost:5000/pets/listing?page=${pageParam}&limit=10`
  );
  return { ...res?.data, prevOffset: pageParam };
};

const PetListing = () => {
  const [petListingData, PetListingRefetch] = useAllData();
  const [petCategory, setPetCategory] = useState(null);
  const [isDisplay, setIsDisplay] = useState(true);
  const [defaultValue, setDefaultValue] = useState("");
  const { setSearchTerm } = useAuth();

  // ______set infintie scroll with tanstack query______

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["listingPets"],
    queryFn: getPets,
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.prevOffset + 1;
      if (nextOffset > Math.ceil(lastPage.petsCount / 10)) {
        return undefined;
      }
      return nextOffset;
    },
  });
  const allPets = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.pets];
  }, []);
  console.log(allPets);
  //_______________________________

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
      <div className="flex md:flex-row flex-col justify-center items-center h-36 w-full border-b-2 border-gray-300 my-5">
        <form onSubmit={handleSearch} className="p-2 flex w-full max-w-md">
          <Input
            onChange={(e) => {
              setSearchTerm({ name: e.target.value, category: "" });
              setDefaultValue(e.target.value);
            }}
            value={defaultValue}
            label="Search"
          />
          <button className="px-4 py-2 rounded bg-blue-gray-100">
            <MagnifyingGlassIcon className="h-5 w-5" />
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
      <div>
        {isDisplay ? (
          <>
            <InfiniteScroll
              dataLength={allPets ? allPets.length : 0}
              next={() => fetchNextPage()}
              hasMore={hasNextPage}
              loader={<div>loading..</div>}
            >
              <div>
                {allPets &&
                  allPets.map((pet, index) => (
                    <div
                      key={index}
                      className="p-5 rounded border my-2 border-gray-500"
                    >
                      <PetDetails pet={pet} />
                    </div>
                  ))}
              </div>
            </InfiniteScroll>
          </>
        ) : (
          <>
            {petListingData.length > 0 &&
              petListingData.map((pet, index) => (
                <div
                  key={index}
                  className="p-5 rounded border my-2 border-gray-500"
                >
                  <PetDetails pet={pet} />
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PetListing;
