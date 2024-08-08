import React from 'react'
import { useParams } from 'react-router-dom'
import { moviesdata } from '../Home/Assests/Data'
function Movieplay() {
    const {name}=useParams()
    console.log(name)
    const movie=moviesdata.find(movie=>movie.title===name)
    if(!movie){
        return <h1>No Movie Found</h1>
    }
  return (
    <div>
        {/* <h1 className='text-4xl text-white'>{movie.title}</h1> */}
        <iframe className='h-[100vh] w-[100vw]' src={`${movie.movielink}`}></iframe>
    </div>
  )
}

export default Movieplay