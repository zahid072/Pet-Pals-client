import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Tiptap from "../tipTap/Tiptap";
import Select from "react-select";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";

const options = [
  { value: "Cat", label: "Cat" },
  { value: "Dog", label: "Dog" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Fish", label: "Fish" },
  { value: "Bird", label: "Bird" },
];

const PetsUpdate = ({ refetch, selectedPet, setPetUpdateModal }) => {
  const [err, setErr] = useState("");
  const [petCategory, setPetCategory] = useState({
    value: selectedPet?.petCategory,
    label: selectedPet?.petCategory,
  });
  const [tempPhoto, setTempPhoto] = useState(selectedPet?.image);
  const [submitLoader, setSubmitLoader] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const convertJsonToHtml = () => {
    if (selectedPet?.longDescription) {
      const editor = new Editor({
        content: selectedPet.longDescription,
        extensions: [StarterKit, Underline, BulletList],
      });
      return editor.getHTML();
    }
    return "";
  };
  const htmlContent = convertJsonToHtml();
  const [editorDescription, setEditorDescription] = useState(htmlContent);
  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  console.log(editorDescription);
  const defaultValues = {
    name: selectedPet?.petName,
    age: selectedPet?.petAge,
    location: selectedPet?.location,
    shortDescription: selectedPet?.shortDescription,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleAddPet = async (e) => {
    const petName = e.name;
    const image = e.photo[0];
    const petAge = e.age;
    const location = e.location;
    const shortDescription = e.shortDescription;
    const formData = new FormData();
    formData.append("image", image);
    setErr("");
    if (!editorDescription) {
      return setErr("Long description is required.");
    }
    setSubmitLoader(true);

    const res = await fetch(
      "https://api.imgbb.com/1/upload?key="+import.meta.env.VITE_IMGBB_KEY,
      {
        method: "POST",
        body: formData,
      }
    );

    const imgbbData = await res.json();

    const newPet = {
      petName,
      image: imgbbData.data?.url ? imgbbData.data?.url : selectedPet?.image,
      petAge,
      petCategory: petCategory.value,
      location,
      shortDescription,
      longDescription: editorDescription,
      timestamp: selectedPet?.timestamp,
      adopted: selectedPet?.adopted,
      email: selectedPet?.email,
    };

    if (imgbbData.data?.url || selectedPet.image) {
      axiosSecure
        .patch(`/pets/${selectedPet?._id}`, newPet)
        .then((res) => {
          if (res.data.modifiedCount) {
            setSubmitLoader(false);
            setTempPhoto("");
            setEditorDescription("");
            reset(defaultValues);
            setPetUpdateModal(false);
            refetch();
            toast.success("Pet Updated Successfully.");
          }
        })
        .catch((err) => {
          setSubmitLoader(false);
          toast.error(`Error saving pet: ${err.message}`);
        });
    }
  };
  return (
    <div className="bg-[#22dcea6f] md:h-auto h-[600px] overflow-y-auto lg:w-1/2 md:w-4/5 w-[95%] backdrop-blur-md z-50 rounded shadow-lg fixed left-1/2 -translate-x-1/2 lg:top-5 top-2">
      <div className="bg-[#e786405e] relative p-6 rounded-lg w-full z-10 shadow ">
        <button
          onClick={() => {
            setPetUpdateModal(false);
          }}
          className="p-1 absolute top-3 right-3 bg-blue-gray-200 rounded"
        >
          <IoClose className="text-black text-xl" />
        </button>
        {submitLoader && (
          <span className="loader absolute z-50 top-0 right-0 left-0 "></span>
        )}
        <div>
          <form onSubmit={handleSubmit(handleAddPet)} className="space-y-5">
            <div className="grid md:grid-cols-2 grid-cols-1 justify-items-center gap-4">
              {/* ----------------------- */}
              <div className="w-full">
                <label>Pet Name</label>
                <input
                  className="w-full p-4 rounded-lg border-2"
                  type="text"
                  placeholder="Enter your pet name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              {/* ----------------------- */}
              <div className="w-full">
                <label>Pet Image</label>

                <div className="flex items-center">
                  <input
                    className="w-full p-4 rounded-lg border-2"
                    type="file"
                    {...register("photo")}
                    onChange={(e) => {
                      setTempPhoto(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <img className="h-14" src={tempPhoto} alt="" />
                </div>
                {errors.photo && (
                  <p className="text-red-500">{errors.photo.message}</p>
                )}
              </div>
              {/* ----------------------- */}
              <div className="w-full">
                <label>Pet Age</label>
                <input
                  className="w-full p-4 rounded-lg border-2"
                  type="text"
                  placeholder="Enter your pet Age"
                  {...register("age", {
                    required: {
                      value: true,
                      message: "Age is required",
                    },
                  })}
                />
                {errors.age && (
                  <p className="text-red-500">{errors.age.message}</p>
                )}
              </div>
              {/* ----------------------- */}
              <div className="w-full">
                <label>Pet Category</label>
                <Select
                  defaultValue={petCategory}
                  onChange={setPetCategory}
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
              {/* ----------------------- */}
              <div className="w-full">
                <label>Pet Location</label>
                <input
                  className="w-full p-4 rounded-lg border-2"
                  type="text"
                  placeholder="Enter your Location"
                  {...register("location", {
                    required: {
                      value: true,
                      message: "Location is required",
                    },
                  })}
                />
                {errors.location && (
                  <p className="text-red-500">{errors.location.message}</p>
                )}
              </div>
              {/* ----------------------- */}
              <div className="w-full">
                <label>Short Description</label>
                <input
                  className="w-full p-4 rounded-lg border-2"
                  type="text"
                  placeholder="Enter a short description"
                  {...register("shortDescription", {
                    required: {
                      value: true,
                      message: "Short-Description is required",
                    },
                  })}
                />
                {errors.shortDescription && (
                  <p className="text-red-500">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>
            </div>
            {/* ----------------------- */}
            <div className="w-full">
              <label>Long Description</label>
              {/* <textarea
                className="w-full p-4 rounded-lg border-2"
                type="text"
                placeholder="Enter Description "
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                })}
              /> */}
              <Tiptap
                setEditorDescription={setEditorDescription}
                editorDescription={editorDescription}
              />
              {err && <p className="text-red-500">{err}</p>}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-3 rounded-lg border-2 text-white uppercase bg-deep-orange-500 btn-hover"
              >
                Add Pet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetsUpdate;
