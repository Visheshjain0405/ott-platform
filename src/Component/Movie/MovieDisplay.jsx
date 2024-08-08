import React, { useState, useEffect } from 'react'
import Navbar from "../Navbar/Navbar"
import { Link } from 'react-router-dom';
import axios from "axios";
import "./MovieDisplay.css";
import { moviesdata } from "../Home/Assests/Data"



function MovieDisplay({type}) {

    const movietype=type;
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Adjust the API endpoint or data source based on the type of movie
                let filteredMovies = moviesdata.filter(movie => movie.type === type);
                setMovies(filteredMovies);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [type]);
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <Navbar />

            <h1 className='text-4xl text-white ml-[13%] my-[50px]'>{movietype} Movies</h1>

            <div class="h-full grid lg:grid-cols-5 grid-cols-2 justify-between max-w-fit ml-auto mr-auto gap-10">
                {movies.map((movie, index) => (
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



export default MovieDisplay