import BulletList from "@tiptap/extension-bullet-list";
import Underline from "@tiptap/extension-underline";
import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import "./petDetails.css";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PetAdoption from "../modals/PetAdoption";
import { FaLocationDot, FaRegCalendarCheck } from "react-icons/fa6";
import NeuralNoiseBackground from "../NeuralNoiseBackground/NeuralNoiseBackground";
import { Helmet } from "react-helmet";

const PetDetails = () => {
  const [petAdoptionModal, setPetAdoptionModal] = useState(false);
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const axiosSecure = useAxiosSecure();
  // get the matched pets
  useEffect(() => {
    axiosSecure.get(`/pets/details/${id}`).then((res) => {
      setPet(res.data);
    });
  }, [id]);
  // ---------------------------------------
  // convert the description json to html
  const convertJsonToHtml = () => {
    if (pet?.longDescription) {
      const editor = new Editor({
        content: pet.longDescription,
        extensions: [StarterKit, Underline, BulletList],
      });
      return editor.getHTML();
    }
    return "";
  };
  const htmlContent = convertJsonToHtml();
  // --------------------------------------------
  return (
    <>
    <Helmet>
          <meta charSet="utf-8" />
          <title>Pet Details || Pet Pals</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
    <div className="bg-blue-gray-100 h-full pb-10">
      <div className="bg-gradient-to-r to-[#42446B] from-[#974063] w-full h-28 relative overflow-hidden cursor-pointer"><NeuralNoiseBackground/></div>
      <div>
        <div className=" w-full border-x-4 bg-blue-gray-200 flex items-center justify-center text-white">
          <div className="relative size-full md:h-[601px] md:block hidden">
            <img
              className="w-full h-full object-cover"
              src={pet?.image}
              alt=""
            />
            <span className="absolute top-0 backdrop-blur-xl bottom-0 left-0 right-0 size-full bg-[#1b1b1b67]"></span>
          </div>
          <img className="w-full md:h-[601px]" src={pet?.image} alt="" />
          <div className="relative size-full md:h-[601px] md:block hidden">
            <img
              className="w-full h-full object-cover"
              src={pet?.image}
              alt=""
            />
            <span className="absolute top-0 backdrop-blur-xl bottom-0 left-0 right-0 size-full bg-[#1b1b1b65]"></span>
          </div>
        </div>
        <div className="bg-white p-5 relative overflow-hidden rounded-lg max-w-7xl w-full lg:mx-auto  shadow mt-10">
          
          <div className="z-50">
            <div className="flex justify-between gap-4 items-center my-5">
              <h1 className="text-3xl font-semibold py-3 font-baloo uppercase">
                {pet?.petName}
              </h1>
              {pet?.adopted ? (
                <button
                  disabled
                  className="px-4 py-3 rounded-lg text-white uppercase font-ballo font-medium bg-deep-orange-500 border"
                >
                  Adopted
                </button>
              ) : (
                <button
                  onClick={() => {
                    setPetAdoptionModal(!petAdoptionModal);
                  }}
                  className="px-4 py-3 rounded-lg text-white uppercase font-ballo font-medium bg-deep-orange-500 btn-hover border"
                >
                  Adopt
                </button>
              )}
            </div>
            <div className="mb-5 space-y-5">
              <p className="text-xl font-semibold">{pet?.shortDescription}</p>
              <p className="flex gap-1 text-xl font-semibold items-center"><FaRegCalendarCheck />{pet?.petAge}</p>
              <p className="flex gap-1 text-xl font-semibold items-center"><FaLocationDot />{pet?.location}</p>
            </div>
           
          </div>
          <div className="z-50">
            <h1 className="uppercase py-7 w-full bg-blue-gray-700 text-white px-5 rounded-t text-2xl font-semibold">
              description
            </h1>
            <div
              className="p-5 bg-blue-gray-100 rounded-b max-h-64 overflow-y-auto"
              id="tiptap"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      </div>
      {petAdoptionModal && (
        <PetAdoption pet={pet} setPetAdoptionModal={setPetAdoptionModal} />
      )}
    </div>
    </>
  );
};

export default PetDetails;
