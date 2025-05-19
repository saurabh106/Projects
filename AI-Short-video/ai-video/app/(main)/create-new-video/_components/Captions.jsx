import React, { useState } from 'react'

const options = [
    {
        name: 'Youtube',
        style: 'text-red-600 text-4xl font-bold uppercase tracking-wide'
    },
    {
        name: 'Supreme',
        style: 'text-white text-3xl font-black uppercase bg-red-600 px-2 py-1 rounded'
    },
    {
        name: 'Neon',
        style: 'text-green-400 text-4xl font-extrabold uppercase drop-shadow-neon'
    },
    {
        name: 'Glitch',
        style: 'text-pink-500 text-3xl font-bold uppercase animate-glitch'
    },
    {
        name: 'Fire',
        style: 'text-orange-500 text-4xl font-bold uppercase animate-pulse'
    },
    {
        name: 'Cyberpunk',
        style: 'text-purple-600 text-3xl font-bold uppercase bg-black px-3 py-2 border-l-4 border-pink-500'
    },
    {
        name: 'Vaporwave',
        style: 'text-pink-300 text-3xl italic uppercase bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent'
    },
    // {
    //     name: 'Matrix',
    //     style: 'text-green-500 text-2xl font-mono uppercase animate-flicker'
    // },
    {
        name: 'Retro',
        style: 'text-blue-600 text-3xl font-extrabold uppercase tracking-tight underline decoration-wavy decoration-pink-500'
    },
    // {
    //     name: 'Minimal',
    //     style: 'text-gray-800 text-xl font-light uppercase'
    // }
];

function Captions({onHandleInputChange}) {
    const [selectedCaptionStyle,setSelectedCaptionStyle] = useState()
  return (
    <div className='mt-5'><h2>
    Caption Style
        </h2>
        <p className='text-sm text-gray-400'>Select Caption Style</p>
        <div className='flex flex-wrap gap-4 mt-2'>
            {options.map((option,index)=>(
                <div key={index} onClick={()=>{
                    setSelectedCaptionStyle(option.name)
                    onHandleInputChange('caption' ,option)
                }} className={`p-2 hover:border bg-slate-900 rounded-lg border-gray-300
                 cursor-pointer ${selectedCaptionStyle == option.name && 'border'}`}>
                <h2 className={option.style}>{option.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Captions