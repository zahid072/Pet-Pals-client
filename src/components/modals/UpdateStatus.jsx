import Select from "react-select";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUsersData from "../../Hooks/useUsersData";

const options = [
  { value: true, label: "Adopted" },
  { value: false, label: "Not Adopted" },
];

const UpdateStatus = ({ selectedPet, setStatusModal, refetch }) => {
  const [petStatus, setPetStatus] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { admin } = useUsersData();

  const handleStatusUpdate = (e) => {
    e.preventDefault();
    if (admin) {
      axiosSecure
        .patch(`/pets/${selectedPet?._id}`, { adopted: petStatus.value })
        .then((res) => {
          if (res.data.modifiedCount) {
            setStatusModal(false);
            refetch();
          }
        });
    }
  };
  return (
    <div className="bg-[#6c2a186d] lg:w-1/3 md:w-3/4 w-[95%] backdrop-blur-md p-5 z-50 rounded shadow-lg fixed left-1/2 -translate-x-1/2 top-[20%] text-white">
      <div className="size-full relative space-y-4 flex justify-center items-center flex-col">
        <button
          onClick={() => {
            setStatusModal(false);
          }}
          className="p-1 absolute -top-3 -right-3 bg-blue-gray-100 rounded"
        >
          <IoClose className="text-black" />
        </button>
        <img
          className="rounded-full size-24 mx-auto"
          src={selectedPet?.image}
          alt=""
        />
        <h1 className="text-center text-2xl font-semibold font-baloo">
          {selectedPet?.petName}
        </h1>
        <p>
          Current Status:{" "}
          <span className="font-semibold">
            {selectedPet?.adopted ? "Adopted" : "Not Adopted"}
          </span>
        </p>
        <form
          className="flex flex-col justify-center items-center gap-3"
          onSubmit={handleStatusUpdate}
        >
          <div>
            <Select
              defaultValue={petStatus}
              onChange={setPetStatus}
              options={options}
              placeholder="Select Status"
              styles={{
                menu: (baseStyles) => ({
                  ...baseStyles,
                  background: "#455A64",
                }),
              }}
              required
            />
          </div>
          <button className="bg-deep-orange-500 px-4 py-2 rounded-full border btn-hover mx-auto">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStatus;
