import React from "react";
import Foodter from "../../components/foodter";
import Navbar from "../../components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <Foodter />
    </div>
  );
}
