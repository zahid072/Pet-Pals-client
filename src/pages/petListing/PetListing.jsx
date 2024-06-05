import React from "react";
import useAllData from "../../Hooks/useAllData";
import PetDetails from "../../components/petDetails/PetDetails";

const PetListing = () => {
  const [petListingData, PetListingRefetch] = useAllData();
  console.log(petListingData)
  return <div>

    {
      petListingData.map((pet, index)=>(
        <div key={index}>
         <PetDetails pet={pet}/>
        </div>
      ))
    }
  </div>;
};

export default PetListing;
