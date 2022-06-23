import React from 'react'

function Metric({value, title}) {
  return (
    <div className='w-1/3 shadow-sm rounded-lg py-4 py-3 bg-white border border-gray-200'>
        <div className='flex flex-col justify-center items-center'>
            <div className='text-center text-black text-3xl font-bold'>{value}</div>
            <div className='text-center text-black text-xl font-bold'>{title}</div>
        </div>
    </div>
  )
}

export default Metric