import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UpdateCampaign = ({
  setRefetch,
  updateCampaign,
  setUpdateCampaignModal,
}) => {
  const [tempPhoto, setTempPhoto] = useState(updateCampaign?.image);
  const [submitLoader, setSubmitLoader] = useState(false);
  const axiosSecure = useAxiosSecure();

  const defaultValues = {
    name: updateCampaign?.petName,
    maximum: updateCampaign?.userCanDonate,
    shortDescription: updateCampaign?.shortDescription,
    longDescription: updateCampaign?.longDescription,
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
    const userCanDonate = parseInt(e.maximum);
    const shortDescription = e.shortDescription;
    const longDescription = e.longDescription;
    const date = parseInt(e.endDate);

    console.log(typeof date)

    const formData = new FormData();
    formData.append("image", image);
    setSubmitLoader(true);

    const res = await fetch(
      "https://api.imgbb.com/1/upload?key=" + import.meta.env.VITE_IMGBB_KEY,
      {
        method: "POST",
        body: formData,
      }
    );

    const imgbbData = await res.json();

    const newCampaign = {
      petName,
      image: imgbbData.data?.url ? imgbbData.data?.url : updateCampaign?.image,
      lastDate:
        date > 0
          ? new Date(
              new Date().setDate(new Date().getDate() + date)
            ).toISOString()
          : updateCampaign?.lastDate,
      maxAmount: updateCampaign?.maxAmount,
      shortDescription,
      longDescription,
      timestamp: updateCampaign?.timestamp,
      email: updateCampaign?.email,
      userCanDonate,
      pauseStatus: updateCampaign?.pauseStatus,
    };

    axiosSecure
      .patch(`/donationCampaign/update/${updateCampaign?._id}`, newCampaign)
      .then((res) => {
        if (res.data.modifiedCount) {
          setSubmitLoader(false);
          setUpdateCampaignModal(false);
          setRefetch(false);
          setTempPhoto("");
          toast.success("Campaign Updated Successfully.");
        }
      })
      .catch((err) => {
        setSubmitLoader(false);
        toast.error(`Error update pet: ${err.message}`);
      });
  };
  return (
    <div className="bg-[#22dcea6f] z-[999] md:h-auto h-[600px] overflow-y-auto lg:w-1/2 md:w-4/5 w-[95%] backdrop-blur-md rounded shadow-lg fixed left-1/2 -translate-x-1/2 lg:top-5 top-2">
      <div className="bg-white relative p-6 rounded-lg w-full z-10 shadow ">
        <button
          onClick={() => {
            setUpdateCampaignModal(false);
          }}
          className="p-1 absolute top-2 right-2 bg-blue-gray-200 rounded"
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
                <label>Maximum Amount</label>
                <input
                  className="w-full p-4 rounded-lg border-2"
                  type="number"
                  placeholder="Enter a maximum amount"
                  {...register("maximum", {
                    required: {
                      value: true,
                      message: "Maximum Donation is required",
                    },
                  })}
                />
                {errors.maximum && (
                  <p className="text-red-500">{errors.maximum.message}</p>
                )}
              </div>
              {/* ----------------------- */}
              <div className="w-full">
                <label>Campaign End date</label>
                <input
                  className="w-full p-4 rounded-lg border-2"
                  type="number"
                  placeholder="Do you need to increase the date?"
                  {...register("endDate")}
                
                />
              </div>
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
            {/* ----------------------- */}
            <div className="w-full">
              <label>Long Description</label>
              <textarea
                className="w-full p-4 rounded-lg border-2"
                type="text"
                placeholder="Enter Description "
                {...register("longDescription", {
                  required: {
                    value: true,
                    message: "Long Description is required",
                  },
                })}
              />
              {errors.longDescription && (
                <p className="text-red-500">{errors.longDescription.message}</p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-3 rounded-lg border-2 text-white uppercase bg-deep-orange-500 btn-hover"
              >
                Update Campaign
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCampaign;
