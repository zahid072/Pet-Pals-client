import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-gray-50">
      <div className=" bg-white lg:w-[30%] p-5 py-8 rounded">
        <h1 className="text-center font-bold text-3xl py-2">Sign In</h1>
        <form className="flex flex-col justify-center gap-5">
          <div>
            <label>Email</label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2  mt-2"
              type="email"
              placeholder="Enter your email"
              name="email"
              required
            />
            <p></p>
          </div>
          <div>
            <label>Password</label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 mt-2"
              type="email"
              placeholder="Enter your email"
              name="email"
              required
            />
            <p></p>
          </div>
          <p className="">
            Don't have an account?.{" "}
            <Link to={"/signUp"} className="text-xl font-semibold underline">
              Sign Up
            </Link>
          </p>
          <div className="flex justify-center">
            <button className="px-6 py-3 rounded bg-blue-gray-400 text-xl font-semibold text-white">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
