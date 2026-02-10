import React from 'react'
import {workshopsData} from '../assets/Data'

export default function Workshops() {
  return (
    <div className='event-bg'>
        <h1 className='text-6xl font-serif text-white font-bold text-center py-10'>WORKSHOPS</h1>

        <div className='flex flex-wrap justify-center gap-10'>
    {workshopsData.map((item, index) => (
  <div 
    key={index} 
    className='w-80 workshop-bg rounded-lg shadow-2xl border-4 border-gray-800 overflow-hidden flex flex-col'
  >
    {/* Upper Part: 16:9 Image Container */}
    <div className='p-3'> {/* Creating the 'Frame' padding */}
      <div className='w-full aspect-video overflow-hidden border-2 border-black rounded-sm shadow-inner bg-black'>
        <img 
          src={item.image} 
          alt={item.title} 
          className='w-full h-full object-cover object-top' 
        />
      </div>
    </div>

    {/* Lower Part: Content Container */}
    <div className='px-4 pb-4 grow'>
      {/* Title Area */}
      <div className='bg-white/80 backdrop-blur-sm p-2 rounded border border-gray-400 mb-3 shadow-sm'>
        <h2 className={`text-lg font-black uppercase leading-tight ${item.color}`}>
          {item.title}
        </h2>
        <p className='text-[10px] uppercase font-bold text-gray-600 tracking-widest'>
          {item.position}
        </p>
      </div>

      {/* Description Area (The 'Text Box') */}
      <div className='bg-white/90 p-3 rounded-sm border border-gray-400 shadow-inner h-40 overflow-y-auto'>
        <p className='text-xs text-gray-800 leading-relaxed'>
          {item.description}
        </p>
        
        <div className='mt-3 pt-2 border-t border-gray-300'>
          <p className='text-[10px] font-bold text-gray-500'>FEES: {item.fees}</p>
          <p className='text-[10px] font-bold text-gray-500'>DATE: {item.date}</p>
        </div>
      </div>

      {/* Footer Info */}
      <div className='mt-2 flex justify-between items-center px-1'>
        <span className='text-[10px] font-bold text-gray-700 italic'>Mode: {item.mode}</span>
        <span className='text-[10px] font-bold text-gray-700'>© CDAC & CyberPeace</span>
      </div>
    </div>
  </div>
))}
        </div>
    </div>
  )
}
