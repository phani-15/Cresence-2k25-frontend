import React from "react";
import Navbar from "../Components/Navbar";
import EntryScene from "../Components/EntryScene";

export default function HomeScene() {
  return (
    <>
      <div className="night-bg">

        <Navbar />
        <div>
          <div className="min-h-screen min-w-screen">
            <EntryScene />
          </div>
          
        </div>
      </div>
    </>
  );
}
