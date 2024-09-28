import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from "../Navbar/Navbar"
import { onValue, ref } from 'firebase/database'
import { database, auth } from '../../Firebase'
import { onAuthStateChanged } from 'firebase/auth'

function MovieType() {

    const { type } = useParams();
    const [filterMovies, setFilterMovies] = useState([]);
    const navigate = useNavigate();
    const movietypeMap = {
        bollywood: 'Bollywood',
        southhindidubbedmovies: 'South',
        hollywood: 'Hollywood'
    };

    const movietype = movietypeMap[type.toLowerCase()];
    useEffect(() => {
        const movieRef = ref(database, 'Movies');

        const unsubscribe = onValue(movieRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const movieList = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key]
                }));

                const filteredMovies = movieList.filter(movie => movie.movieType === movietype);
                console.log(filterMovies)
                // Sort movies based on the numerical part of the id
                const sortedMovies = filteredMovies.sort((a, b) => {
                    const idA = parseInt(a.id.replace('movie', ''), 10);
                    const idB = parseInt(b.id.replace('movie', ''), 10);
                    return idA - idB;
                });

                setFilterMovies(sortedMovies.reverse());
            }
        });

        return () => unsubscribe();  // Clean up the listener on unmount

    }, [movietype]); // Dependency array to only run when movietype changes

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (!user) {
                // If not logged in, redirect to login page
                navigate('/login');
            }
        });

        return () => unsubscribeAuth();  // Clean up the listener on unmount
    }, [navigate])
    return (
        <div>
            <Navbar />
            <h1 className='text-4xl text-white'>{type}</h1>

            <div className="h-full grid lg:grid-cols-5 grid-cols-2 justify-between max-w-fit ml-auto mr-auto gap-10 mt-32">
                {filterMovies.map((movie, index) => (
                    <Link key={index} to={`/moviedisplay/${movie.title}`}>
                        <div className="card flex justify-center items-center" style={{ background: `url(${movie.posterUrl})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                            <h1 className='text-lg text-black bg-white w-full mt-[225px] rounded-b-[17px]'>{movie.title}</h1>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MovieType;
