import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { moviesdata } from '../Home/Assests/Data'
import { Link } from 'react-router-dom'
import Navbar from "../Navbar/Navbar"
function MovieType() {

    const { type } = useParams()
    const [filterMovies,setFilterMovies]=useState([]);
    const movietype = type

    useEffect(() => {
        let filtered;
        if (type === "southhindidubbedmovies") {
          filtered = moviesdata.filter(movie => movie.type === "south");
        } else {
          filtered = moviesdata.filter(movie => movie.type === type);
        }
        setFilterMovies(filtered);
      }, [type]);
    
    return (
        <div>
            <Navbar />
            <h1 className='text-4xl text-white'>{type}</h1>
            <div class="h-full grid lg:grid-cols-5 grid-cols-2 justify-between max-w-fit ml-auto mr-auto gap-10 mt-32">
                {filterMovies.map((movie, index) => (
                    <Link to={`/moviedisplay/${movie.title}`}>
                        <div key={index} class="card flex justify-center items-center" style={{ background: `url(${movie.poster_url})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                            <h1 className='text-lg text-black bg-white w-full mt-[225px] rounded-b-[17px]'>{movie.title}</h1>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MovieType