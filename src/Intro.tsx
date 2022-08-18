import homeLogo from "./home.png";
import apiLogo from "./api.png";
import { useEffect } from "react";
import logo from "./logo.png";

export default function Intro() {
  useEffect(() => {
    document.title = "Money Manager";
  }, []);

  return (
    <html>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="bg-gradient-to-r from-green-500 to-green-200">
        {/* Heading */}
        <h1 className="font-bold pb-4 text-transparent bg-clip-text bg-gradient-to-tl from-pink-600 via-red-500 to-yellow-500 text-7xl flex justify-center items-center pt-12">
          Money Manager
        </h1>
        {/* Icons */}
        <p className="font-bold text-white flex justify-center items-center gap-3 text-5xl">
          <i className="fa fa-bitcoin text-transparent bg-clip-text bg-gradient-to-tl from-pink-500 to-blue-500"></i>
          <i className="fa fa-cny text-transparent bg-clip-text bg-gradient-to-tl from-pink-500 to-blue-500"></i>
          <i className="fa fa-eur text-transparent bg-clip-text bg-gradient-to-tl from-pink-500 to-blue-500"></i>
          <i className="fa fa-jpy text-transparent bg-clip-text bg-gradient-to-tl from-pink-500 to-blue-500"></i>
          <i className="fa fa-inr text-transparent bg-clip-text bg-gradient-to-tl from-pink-500 to-blue-500"></i>
          <i className="fa fa-money text-transparent bg-clip-text bg-gradient-to-tl from-pink-500 to-blue-500"></i>
        </p>
        {/* Intro */}
        <p className="text-blue-700 font-bold mt-24 text-2xl flex justify-center items-center">
          Manage money efficiently and learn how to save money
        </p>

        {/* Login/Signup */}
        <div className="flex flex-col mt-16 gap-2 justify-center items-center">
          <a
            href="/login"
            className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative text-white px-12 font-bold">Log in</span>
          </a>
          <p className="text-white">
            New User?&nbsp;
            <a
              href="/signup"
              className="font-bold text-blue-700 hover:text-blue-900"
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Images */}
        <div className="p-16 gap-y-6 flex flex-col">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2 w-full">
            <img
              className="w-full h-full lg:w-1/2 lg:h-1/2 rounded-lg shadow-lg"
              src={homeLogo}
              alt="Money Manager"
            />
            <p className="w-full lg:w-1/2 font-bold text-xl">
              Helps manage all your transactions efficiently
            </p>
          </div>
          <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-2 w-full">
            <p className="w-full lg:w-1/2 font-bold text-xl">
              Uses&nbsp;
              <a
                className="text-blue-500 hover:text-blue-700 hover:underline"
                href="http://money-manager-pranshu1902.herokuapp.com/api/swagger/"
                target="_blank"
                rel="noreferrer"
              >
                API
              </a>
              , build using DRF-Spectacular for efficient handling of data
            </p>
            <img
              className="w-full h-full lg:w-1/2 lg:h-1/2 rounded-lg shadow-lg"
              src={apiLogo}
              alt="Money Manager"
            />
          </div>
        </div>
        {/* Footer */}
        <div className="p-6 flex flex-row justify-center items-center gap-4 w-full">
          <img src={logo} alt="logo" width={"7%"} height={"7%"} />
          <div className="flex flex-col justify-center items-center gap-2 w-1/3">
            <p>
              Money Manager is an open source public utility designed to help
              people manage and get details on the money spent.
            </p>
            <a
              rel="noreferrer"
              className="text-xl font-medium text-blue-500 hover:text-blue-700 hover:font-bold"
              href="https://github.com/Pranshu1902/Money-Manager-fe"
              target="_blank"
            >
              Contribute on GitHub
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center">
          Made with &nbsp;<i className="fa fa-heart text-red-500"></i>&nbsp;
          by&nbsp;
          <a
            href="https://pranshu1902.netlify.app"
            target={"_blank"}
            rel={"noreferrer"}
            className="hover:text-green-900 hover:font-bold transition duration-300 underline"
          >
            Pranshu
          </a>
        </div>
      </div>
    </html>
  );
}
