import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

const PetAdoption = ({ pet, setPetAdoptionModal }) => {
  const [submitLoader, setSubmitLoader] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const userEmail = user?.email
    ? user?.email
    : user?.reloadUserInfo?.providerUserInfo[0].email;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddPet = async (e) => {
    const number = e.number;
    const address = e.address;
    const name = e.name;
    const email = e.email;

    setSubmitLoader(true);

    const newRequest = {
      petName:pet?.petName,
      petId: pet?._id,
      petImage: pet?.image,
      userName: name,
      userEmail: email,
      phoneNumber: number,
      address,
      ownerEmail: pet?.email,
      status: "pending",
    };

    axiosSecure
      .post(`/adoptionRequest`, newRequest)
      .then((res) => {
        if (res.data.insertedId) {
          setSubmitLoader(false);
          reset();
          setPetAdoptionModal(false);
          toast.success("Adoption Request Sent Successfully.");
        }
      })
      .catch((err) => {
        setSubmitLoader(false);
        toast.error(`Error saving pet: ${err.message}`);
      });
  };
  return (
    <div className="bg-[#22ddea8a] md:h-auto h-[600px] overflow-y-auto lg:w-1/2 md:w-4/5 w-[95%] backdrop-blur-md z-50 rounded shadow-lg fixed left-1/2 -translate-x-1/2 lg:top-20 top-2">
      <div className="bg-[#356c457e] relative p-6 rounded-lg w-full z-10 shadow ">
        <button
          onClick={() => {
            setPetAdoptionModal(false);
          }}
          className="p-1 absolute top-3 right-3 bg-blue-gray-200 rounded"
        >
          <IoClose className="text-black text-xl" />
        </button>
        {submitLoader && (
          <span className="loader absolute z-50 top-0 right-0 left-0 "></span>
        )}
        <div>
          <div className="flex flex-col justify-center items-center gap-4 mb-5">
            <img
              className="size-16 rounded-full border-4 border-deep-orange-400"
              src={pet?.image}
              alt=""
            />
            <h3 className="text-2xl font-semibold text-white">
              {pet?.petName}
            </h3>
          </div>
          <form onSubmit={handleSubmit(handleAddPet)} className="space-y-5">
            <div className="grid md:grid-cols-2 grid-cols-1 justify-items-center gap-4">
              {/* ----------------------- */}
              <div className="w-full">
                <label className="font-semibold mb-1 text-white">
                  User Name
                </label>
                <input
                  className="w-full p-4 rounded-lg border-2 text-gray-700"
                  type="text"
                  placeholder="Enter your pet name"
                  {...register("name")}
                  value={user?.displayName}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* ----------------------- */}
              <div className="w-full">
                <label className="font-semibold mb-1 text-white">
                  User email
                </label>
                <input
                  className="w-full p-4 rounded-lg border-2 text-gray-700"
                  type="email"
                  placeholder="Enter your pet Age"
                  {...register("email")}
                  value={userEmail}
                />
                {errors.age && (
                  <p className="text-red-500">{errors.age.message}</p>
                )}
              </div>

              {/* ----------------------- */}
              <div className="w-full">
                <label className="font-semibold mb-1 text-white">
                  Phone Number
                </label>
                <input
                  className="w-full p-4 rounded-lg border-2"
                  type="number"
                  placeholder="Enter your Location"
                  {...register("number", {
                    required: {
                      value: true,
                      message: "Number is required",
                    },
                  })}
                />
                {errors.number && (
                  <p className="text-red-500 bg-[#ffffff7d]">
                    {errors.number.message}
                  </p>
                )}
              </div>
              {/* ----------------------- */}
              <div className="w-full">
                <label className="font-semibold mb-1 text-white">Address</label>
                <input
                  className="w-full p-4 rounded-lg border-2"
                  type="text"
                  placeholder="Enter your Address"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Number is required",
                    },
                  })}
                />
                {errors.address && (
                  <p className="text-red-500 bg-[#ffffff8c]">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-3 rounded-lg border-2 text-white uppercase bg-deep-orange-500 btn-hover"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetAdoption;
