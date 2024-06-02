import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const SignUp = () => {
  const axiosSecure = useAxiosSecure()
  const [error, setError] = useState({});
  const [tempPhoto, setTempPhoto] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const { signUpUsers, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePhoto = (e) => {
    setTempPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // handle all signIn methods
  const handleSignUp = async (data) => {
    const name = data.name;
    const photo = data.photo[0];
    const email = data.email;
    const password = data.password;
    const formData = new FormData();
    formData.append("image", photo);
    setSubmitLoader(true);
    setError({})
    const Res = await fetch(
      "https://api.imgbb.com/1/upload?key=f2486eb7f065ef91f753ffa00a2bae90",
      {
        method: "POST",
        body: formData,
      }
    );
    const imgbbData = await Res.json();
    if (imgbbData.data?.url) {
      signUpUsers(email, password)
        .then((res) => {
          updateUserProfile(name, imgbbData.data?.url)
          setSubmitLoader(false);
          setTempPhoto("");
          reset();
          toast.success("Account successfully created.");
        })
        .catch((err) => {
          if (err.message === "Firebase: Error (auth/email-already-in-use).") {
            setSubmitLoader(false);
            setError({ email: "Email already in use." });
          } else {
            setSubmitLoader(false);
            console.log(err.message);
          }
        });
      const newUser = { name, email, role: "user" };
      axiosSecure.post("/users", newUser).then((res) => {});
    }
  };

  return (
    <div className="h-screen bg-blue-gray-100">
      <div className="w-full flex justify-center items-center ">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Sign Up || Pet Pals</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>

        <div className=" bg-white p-6 rounded-lg lg:w-2/5 md:w-4/5 w-[95%] mt-8 relative">
          {submitLoader && (
            <span className="loader absolute top-0 right-0 left-0 "></span>
          )}
          <h1 className="text-3xl font-bold text-center">Sign Up</h1>
          <form
            onSubmit={handleSubmit(handleSignUp)}
            className=" flex flex-col gap-4"
          >
            <div className="">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="Name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                className="px-4 py-3 rounded-lg border w-full mt-2"
              />
              <>
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </>
            </div>
            <div className="">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  {...register("photo")}
                  onChange={handlePhoto}
                  className="px-4 py-3 rounded-lg border w-full mt-2"
                  required
                />
                <img className="h-14" src={tempPhoto} alt="" />
              </div>
            </div>
            <div className="">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                className="px-4 py-3 rounded-lg border w-full mt-2"
              />
              <>
                {errors.email && (
                  <p className="text-red-500 mt-2">{errors.email.message}</p>
                )}
                {
                  error?.email && <p className="text-red-500 mt-2">{error.email}</p>
                }
              </>
            </div>
            <div className="">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="w-full flex items-center ">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password should be at least 6 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/,
                      message:
                        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character",
                    },
                  })}
                  className="px-4 py-3 rounded-lg border w-full mt-2"
                />
                <div onClick={handleShowPass} className="-ml-7 cursor-pointer">
                  {showPass ? (
                    <span>
                      <FaEye />
                    </span>
                  ) : (
                    <span>
                      <FaEyeSlash />
                    </span>
                  )}
                </div>
              </div>
              <>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </>
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div className=" mt-6">
              <button className=" w-full px-4 py-2 rounded-lg bg-[#1e3f2f] hover:bg-[#264838eb] text-white text-xl ">
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-4">
            Have an account?{" "}
            <Link
              to={"/signIn"}
              className="text-blue-500 font-semibold underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
