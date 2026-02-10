import React from "react";
import Navbar from "../Components/Navbar";
import EntryScene from "../Components/EntryScene";
import Workshops from "./Workshops";

export default function HomeScene() {
  return (
    <>
      <div className="night-bg">
        <Navbar />
        <div>
          <div className="min-h-screen">
            <EntryScene />
          </div>
        </div>
      </div>
    </>
  );
}
