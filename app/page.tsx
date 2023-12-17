"use client";

import Input from "./components/Input";
import React, { useState } from "react";
import Current from "./components/Current";
import WeatherDetails from "./components/WeatherDetails";
import WeekForcast from "./components/WeekForcast";

const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const url = `http://api.weatherapi.com/v1/forecast.json?key=4526004a8112495e89a82253231212&q=${location} &days=7&aqi=yes&alerts=yes`;

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setData(data);
        setLocation(" ");
        setError("");
      } catch (error) {
        setError("City Not Found");
        setData({});
      }
    }
  };

  let content;
  if (Object.keys(data).length === 0 && error === "") {
    content = (
      <div className="text-white text-center h-screen mt-[5rem] ">
        <h2 className=" text-3xl font-bold mb-4">
          Welcome the the Weather Application
        </h2>
        <p className="text-xl">
          Enter the City name to get the Weather Details
        </p>
      </div>
    );
  } else if (error !== "") {
    content = (
      <div className="text-white text-center h-screen mt-[5rem]">
        <p className="text-3xl font-bold mb-4">City Not Found</p>
        <p className="text-xl">Enter the valid city</p>
      </div>
    );
  } else {
    content = (
      <>
        <div className=" flex md:flex-row flex-col p-12 items-center justify-between h-fit">
          <Current data={data} />
          <WeekForcast data={data} />
        </div>
        <div>
          <WeatherDetails data={data} />
        </div>
      </>
    );
  }

  return (
    <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-fit">
      <div className="bg-white bg-opacity-25 w-full flex flex-col h-sceen">
        {/* input and logo */}
        <div className="flex flex-col md:flex-row justify-between items-center p-12 h-max">
          <Input handleSearch={handleSearch} setLocation={setLocation} />
          <h1 className="mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl font-bold h-max">
            Weather App.
          </h1>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Home;
