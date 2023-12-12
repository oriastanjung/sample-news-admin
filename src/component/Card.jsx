import React from 'react'

function Card(props) {
  return (
    <div className='w-[25rem] h-[15rem] bg-white overflow-hiddeb px-4 py-4 md:px-8 md:py-6 border border-black rounded-2xl'>{props.children}</div>
  )
}

export default Card