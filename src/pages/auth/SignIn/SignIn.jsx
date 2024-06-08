import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import getToken from "../../../utils/localStorage";

const SignIn = () => {
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const { signInUsers, signInWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();
  const location = useLocation();

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
  const handleSignIn = (data) => {
    const email = data.email;
    const password = data.password;
    setError("");
    setSubmitLoader(true);

    signInUsers(email, password)
      .then((res) => {
        setSubmitLoader(false);
        reset();
        toast.success("Login successful.");
        const token = getToken()

          navigate(location?.state ? location.state : "/");
       
      })
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/invalid-credential).") {
          setError("Email or password invalid");
        }
      });
  };

  // google signIn
  const handleGoogleSignIn = () => {
    signInWithGoogle().then((res) => {
      const newUser = {
        name: res.user?.displayName,
        email: res.user?.email,
        role: "user",
      };
      toast.success("Login successful.");
      axiosSecure.post("/users", newUser).then((res) => { 
        navigate(location?.state ? location.state : "/");});
    });
  };
  const handleGitHubSignIn = () => {};
  return (
    <div className=" h-screen bg-blue-gray-100">
      <div className="w-full flex justify-center items-center ">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Sign In || Pet Pals</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <div className=" bg-white p-6 rounded-lg lg:w-2/5 md:w-4/5 w-[95%] mt-8 relative">
          {submitLoader && (
            <span className="loader absolute top-0 right-0 left-0 "></span>
          )}
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="space-y-3 flex flex-col gap-4"
          >
            <h1 className="text-3xl font-bold text-center">Sign In</h1>
            <div className="form-control">
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
                  <p className="text-red-500">{errors.email.message}</p>
                )}
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
                      message: "Password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password should be at least 6 characters",
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
              <p className="text-red-500">{error}</p>
            </div>
            <div className=" mt-6">
              <button className=" w-full px-4 py-2 rounded-lg bg-[#1e3f2f] hover:bg-[#264838eb] text-white text-xl ">
                Sign In
              </button>
            </div>
          </form>
          <div className="w-full flex items-center gap-1">
            <span className="h-[1.5px] w-full bg-[#43414198]"></span>
            <p className="text-nowrap font-bold text-[#43414198]">Or</p>
            <span className="h-[1.5px] w-full bg-[#43414198]"></span>
          </div>
          <div className="w-full flex md:flex-row flex-col gap-2 text-center font-semibold">
            <button
              onClick={handleGoogleSignIn}
              className=" w-full py-3 bg-[#d8dbdb] hover:bg-[#c5cfcfeb] rounded-md flex items-center justify-center gap-2 border border-[#3e3d3d4f]"
            >
              <FcGoogle className="text-2xl " />
              Google
            </button>
            <button
              onClick={handleGitHubSignIn}
              className=" w-full py-3 bg-[#d8dbdb] hover:bg-[#c5cfcfeb] rounded-md flex items-center justify-center gap-2 border border-[#3e3d3d4f]"
            >
              <FaGithub className="text-2xl " />
              GitHub
            </button>
          </div>
          <p className="mt-4">
            Don't have an account?{" "}
            <Link
              to={"/signUp"}
              className="text-blue-500 font-semibold underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
