import React, { useState } from "react";
import { Avatar, Card, Typography } from "@material-tailwind/react";
import { CiMenuKebab } from "react-icons/ci";
import useAuth from "../../../../Hooks/useAuth";
import { FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import InfiniteScroll from "react-infinite-scroll-component";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import UpdateStatus from "../../../../components/modals/UpdateStatus";
import PetsUpdate from "../../../../components/modals/PetsUpdate";
import Swal from "sweetalert2";
import useAllPetsData from "../../../../Hooks/useAllPetsData";
import useAdmin from "../../../../Hooks/useAdmin";
import { Helmet } from "react-helmet";


const AllPets = () => {
  const { admin } = useAdmin();
  const { user } = useAuth();
  const [selectedPet, setSelectedPet] = useState({});
  const [statusModal, setStatusModal] = useState(false);
  const [petUpdateModal, setPetUpdateModal] = useState(false);
  const [modal, setModal] = useState(0);
  const axiosSecure = useAxiosSecure();
  const [allPets, fetchNextPage, hasNextPage, refetch] = useAllPetsData();

  const handlePopUp = (e, id) => {
    e.stopPropagation();
    setModal(id);
    if (modal === id) {
      setModal(0);
    }
  };
  // ---------------------------------------------------
  const handleUpdate = (pet) => {
    if (user) {
      setSelectedPet(pet);
      setPetUpdateModal(!petUpdateModal);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/pets/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            setModal(0);
            Swal.fire({
              title: "Deleted!",
              text: "Pet has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  // ---------------------------------------------------

  const handleStatusModal = (pet) => {
    if (admin) {
      setSelectedPet(pet);
      setStatusModal(!statusModal);
    }
  };
  return (
    <div>
      <Helmet>
          <meta charSet="utf-8" />
          <title>All Pets || Pet Pals</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      <h1 className="text-center text-3xl font-semibold font-baloo uppercase">All Pets</h1>
      <div className="my-5 h-[2px] w-full bg-blue-gray-50"></div>
      <div
        onClick={
          modal > 0
            ? () => {
                setModal(0);
              }
            : ""
        }
        className="bg-white p-6 rounded-lg lg:w-4/6 mx-auto md:w-4/5 w-full z-10 shadow"
      >
        <div>
          <div >
            <InfiniteScroll
              dataLength={allPets ? allPets.length : 0}
              next={() => fetchNextPage()}
              hasMore={hasNextPage}
              loader={<div class="loader-infinite"></div>}
            >
              <Card className="h-full w-full overflow-x-auto">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Image
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Name
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Age
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Status
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Action
                        </Typography>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {allPets &&
                      allPets.map((pets, index) => (
                        <tr
                          key={index}
                          className={
                            pets?.adopted
                              ? "bg-blue-gray-50/50"
                              : `bg-white ${
                                  modal === index + 1 ? "bg-[#c8c8c850]" : ""
                                }`
                          }
                        >
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {index + 1}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              <Avatar
                                src={pets?.image}
                                alt={pets?.petName}
                                size="md"
                                className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                              />
                            </Typography>
                          </td>

                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {pets?.petName}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {pets?.petAge}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              <span
                                onClick={() => {
                                  handleStatusModal(pets);
                                }}
                                className={
                                  admin
                                    ? " hover:bg-blue-gray-100 p-2 rounded cursor-pointer"
                                    : "p-2 rounded"
                                }
                              >
                                {pets?.adopted ? "Adopted" : "Not Adopted"}
                              </span>
                            </Typography>
                          </td>
                          <td className="p-4">
                            <div className="relative inline">
                              <button
                                onClick={(e) => {
                                  handlePopUp(e, index + 1);
                                }}
                                className="px-1 py-2 rounded hover:bg-blue-gray-100 text-xl"
                              >
                                <CiMenuKebab />
                              </button>
                              {modal === index + 1 && (
                                <div className="absolute tooltip-shape w-48 right-[36px] -top-[100px] z-50 ">
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                    className="p-3"
                                  >
                                    <button
                                      onClick={() => {
                                        handleUpdate(pets);
                                      }}
                                      className="px-3 flex gap-2 hover:bg-cyan-900 items-center rounded border text-nowrap text-white border-white mb-2"
                                    >
                                      {" "}
                                      <FaPen />
                                      Update
                                    </button>

                                    <button
                                      onClick={() => {
                                        handleDelete(pets?._id);
                                      }}
                                      className={`px-3 flex gap-2 hover:bg-cyan-900 items-center rounded border text-nowrap text-white border-white`}
                                    >
                                      <FaTrashAlt />
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Card>
            </InfiniteScroll>
          </div>
        </div>
        {statusModal && (
          <>
            <UpdateStatus
              refetch={refetch}
              selectedPet={selectedPet}
              setStatusModal={setStatusModal}
            />
          </>
        )}
        {petUpdateModal && (
          <>
            <PetsUpdate
              refetch={refetch}
              selectedPet={selectedPet}
              setPetUpdateModal={setPetUpdateModal}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AllPets;
