import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../../../Hooks/useAuth";

const options = [
  { value: 2, label: "2 Day" },
  { value: 3, label: "3 Day" },
  { value: 4, label: "4 Day" },
  { value: 5, label: "5 Day" },
  { value: 6, label: "6 Day" },
];

const CreateDonationCampaign = () => {
  const [endDate, setEndDate] = useState(null);
  const [tempPhoto, setTempPhoto] = useState("");
  const [submitLoader, setSubmitLoader] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email
    ? user?.email
    : user?.reloadUserInfo?.providerUserInfo[0].email;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddPet = async (e) => {
    const petName = e.name;
    const image = e.photo[0];
    const minAmount = e.minimum;
    const maxAmount = e.maximum;
    const shortDescription = e.shortDescription;
    const longDescription = e.longDescription;


    const formData = new FormData();
    formData.append("image", image);
    setSubmitLoader(true);
    try {
      const res = await fetch(
        "https://api.imgbb.com/1/upload?key=" + import.meta.env.VITE_IMGBB_KEY,
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

      const newCampaign = {
        petName,
        image: imgbbData.data?.url,
        minAmount,
        lastDate: new Date(new Date().setDate(new Date().getDate() + endDate?.value)).toISOString(),
        maxAmount,
        shortDescription,
        longDescription,
        timestamp: new Date().toISOString(),
        email,
      };

      if (imgbbData.data?.url) {
        axiosSecure
          .post("/donationCampaign", newCampaign)
          .then((res) => {
            if (res.data.insertedId) {
              setSubmitLoader(false);
              setTempPhoto("");
              reset();
              toast.success("Campaign Added Successfully.");
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
        Create A Donation Campaign
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
                <label>Minimum Amount</label>
                <input
                  className="w-full p-4 rounded-lg border-2"
                  type="number"
                  placeholder="Enter a minimum amount"
                  {...register("minimum", {
                    required: {
                      value: true,
                      message: "Minimum donation required",
                    },
                  })}
                />
                {errors.age && (
                  <p className="text-red-500">{errors.age.message}</p>
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
                {errors.location && (
                  <p className="text-red-500">{errors.location.message}</p>
                )}
              </div>
              {/* ----------------------- */}
              <div className="w-full">
                <label>Campaign Ends In</label>
                <Select
                  defaultValue={endDate}
                  onChange={setEndDate}
                  options={options}
                  placeholder="Select Campaign End date"
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
                Create Campaign
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDonationCampaign;
