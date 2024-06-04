import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const options = [
  { value: "cat", label: "Cat" },
  { value: "dog", label: "Dog" },
  { value: "rabbit", label: "Rabbit" },
  { value: "fish", label: "Fish" },
  { value: "bird", label: "Bird" },
];

const AddAPet = () => {
  const [petValue, setPetValue] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddPet = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-semibold font-baloo mt-5 ">
        Add A Pet For Adoption
      </h1>
      <div className="my-5 h-[2px] w-full bg-blue-gray-50"></div>
      <div className="bg-white p-6 rounded-lg lg:w-4/6 mx-auto md:w-4/5 w-full z-10 shadow ">
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
                <input
                  className="w-full p-4 rounded-lg border-2"
                  type="file"
                  {...register("photo", {
                    required: {
                      value: true,
                      message: "Image is required",
                    },
                  })}
                />
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
                  defaultValue={petValue}
                  onChange={setPetValue}
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
              <label>Description</label>
              <textarea
                className="w-full p-4 rounded-lg border-2"
                type="text"
                placeholder="Enter Description "
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                })}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="flex justify-center">
              <button className="px-4 py-3 rounded-lg border-2 text-white uppercase bg-deep-orange-500 btn-hover">
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
