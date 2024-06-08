import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Tiptap from "../../../../components/tipTap/Tiptap";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../../../Hooks/useAuth";

const options = [
  { value: "Cat", label: "Cat" },
  { value: "Dog", label: "Dog" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Fish", label: "Fish" },
  { value: "Bird", label: "Bird" },
];

const AddAPet = () => {
  const [err, setErr] = useState("");
  const [petCategory, setPetCategory] = useState(null);
  const [tempPhoto, setTempPhoto] = useState("");
  const [submitLoader, setSubmitLoader] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  const email = user?.email
  ? user?.email
  : user?.reloadUserInfo?.providerUserInfo[0].email;

  const [editorDescription, setEditorDescription] = useState("");
  console.log(editorDescription);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddPet = async (e) => {
    const petName = e.name;
    const image = e.photo[0];
    const petAge = e.age;
    const location = e.location;
    const shortDescription = e.shortDescription;
    setErr("")
    const formData = new FormData();
    formData.append("image", image);
    setSubmitLoader(true);
    if (!editorDescription) {
      setSubmitLoader(false)
      return setErr("Long description is required.");
    }
    try {
      const res = await fetch(
        "https://api.imgbb.com/1/upload?key="+import.meta.env.VITE_IMGBB_KEY,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const imgbbData = await res.json();
  
      if (!imgbbData.success) {
        throw new Error(imgbbData.error.message);
      }
  
      const newPet = {
        petName,
        image: imgbbData.data?.url,
        petAge,
        petCategory: petCategory.value,
        location,
        shortDescription,
        longDescription: editorDescription,
        timestamp: new Date().toISOString(),
        adopted: false,
        email
      };
  
      if (imgbbData.data?.url) {
        axiosSecure
          .post("/pets", newPet)
          .then((res) => {
            if (res.data.insertedId) {
              setSubmitLoader(false);
              setTempPhoto("");
              setEditorDescription("")
              reset();
              toast.success("Pet Added Successfully.");
            }
          })
          .catch((err) => {
            setSubmitLoader(false);
            toast.error(`Error saving pet: ${err.message}`);
          });
      }
    } catch (error) {
      setSubmitLoader(false);
      toast.error(`Error uploading image: ${error.message}`);
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-semibold font-baloo mt-5 uppercase ">
        Add A Pet For Adoption
      </h1>
      <div className="my-5 h-[2px] w-full bg-blue-gray-50"></div>
      <div className="bg-white relative p-6 rounded-lg lg:w-4/6 mx-auto md:w-4/5 w-full z-10 shadow ">
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
                    {...register("photo", {
                      required: {
                        value: true,
                        message: "Image is required",
                      },
                    })}
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
            <div
              className="w-full"
            >
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
              <Tiptap setEditorDescription={setEditorDescription} />
              {err && (
                <p className="text-red-500">{err}</p>
              )}
            </div>

            <div className="flex justify-center">
              <button type="submit" className="px-4 py-3 rounded-lg border-2 text-white uppercase bg-deep-orange-500 btn-hover">
                Add Pet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAPet;
