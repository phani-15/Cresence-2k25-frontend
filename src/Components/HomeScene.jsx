import React from "react";
import Navbar from "./Navbar";
import EntryScene from "./EntryScene";

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
