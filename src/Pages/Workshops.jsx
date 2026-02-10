import React from 'react'
import { Link } from 'react-router-dom'
import { workshopsData } from '../assets/Data'

export default function Workshops() {
  const [selected, setSelected] = React.useState("practical");

  function removeSpaces(str) {
    return str.replace(/\s+/g, "");
  }
  return (
    <div className="event-bg">
      <div>

        <h1 className="text-6xl font-serif text-white font-bold text-center pt-10">
          WORKSHOPS
        </h1>

        <div className="flex justify-center px-6">
          <div className="flex flex-col lg:flex-row items-center gap-0 ">

            {/* LEFT : IMAGE */}
            <div className="flex flex-col items-center justify-center">
              <img
                src={workshopsData[selected].image}
                alt={workshopsData[selected].title}
                className="w-full max-w-lg rounded-xl object-cover shadow-md"
                loading="lazy"
              />
              {/* <div className='opacity-35 w-full h-4 text-white bg-black rounded-b-lg p-6'>
                <h1 className="text-center opacity-100 text-white">{workshopsData[selected].title}</h1>
              </div> */}
              <div className="w-full md:w-[90%] flex flex-col gap-7">
                <p className="text-2xl md:text-4xl mt-2 text-slate-200 font-cinzel font-semibold">
                  {workshopsData[selected].title.toUpperCase()}
                </p>
                <div className="bg-violet-950 rounded-xl text-slate-100 h-20 flex flex-col justify-center pl-5">
                  <p>
                    Date: <span>{workshopsData[selected].date} </span>
                  </p>
                  <p>
                    Registration Fees:{" "}
                    <span>{workshopsData[selected].fees} </span>
                  </p>
                </div>
                {(removeSpaces(workshopsData[selected].title) ===
                  "PracticalMachineLearning" ||
                  removeSpaces(workshopsData[selected].title) ===
                  "CyberThreatIntelligence") ? (
                  <div className="h-12 bg-gray-600 rounded-xl flex justify-center items-center">
                    <button
                      disabled
                      className="cursor-not-allowed"
                    >
                      Registrations Closed
                    </button>
                  </div>
                ) : (
                  <Link
                    to={`/workshop/${removeSpaces(
                      workshopsData[selected].title
                    )}/register`}
                    className="h-12 bg-cyan-600 rounded-xl flex justify-center items-center"
                  >
                    <button>Register Now</button>
                  </Link>
                )}
              </div>
            </div>

            {/* RIGHT : CARD */}
            <div className="flex-1 ws-bg mt-10 flex-col justify-center">
              <div className='px-28'>
                <h2 className="text-3xl mt-16 font-cinzel text-white text-left px-40 pt-4 pb-2">About</h2>
                <p className="text-white text-sm text-center px-36">{workshopsData[selected].description}</p>
              </div>
              <div>
                <h2 className="text-2xl font-cinzel text-white text-left px-66 pt-4">Co-Ordinators</h2>
                {workshopsData[selected].coordinators.map((coordinator, index) => (
                  <p
                    key={index}
                    className="text-white text-sm text-left px-68"
                  >
                    {coordinator.name}: {coordinator.contact}
                  </p>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
