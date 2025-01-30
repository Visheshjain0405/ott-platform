import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import { useParams, Link } from 'react-router-dom';
import "./MovieDetails.css";
import { database } from '../../Firebase';
import { ref, onValue, orderByChild, equalTo, query } from 'firebase/database';

function MovieDetails() {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    const [movie, setMovie] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const movieRef = ref(database, 'Movies');
        
        // Combine constraints correctly
        const q = query(movieRef, orderByChild('title'), equalTo(name));

        const unsubscribe = onValue(q, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const movieList = Object.values(data)[0]; // Get the first matching movie
                setMovie(movieList);
            }
        });

        return () => unsubscribe(); // Clean up the listener
    }, [name]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            {
                isDesktop ? (
                    <>
                        <section className='mt-[60px]' style={{ backgroundImage: `url(${movie.backgroundUrl})`, height: '95vh', width: '98vw', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                            <div className="absolute inset-0 bg-black bg-opacity-50">
                                <div className='absolute bottom-[100px] left-10'>
                                    <h1 className='text-4xl text-white font-serif'>{movie.title}</h1>
                                    <p className='text-white text-xl w-[50%] mt-[2%]'>{movie.description}</p>
                                    <Link to={`/movieplay/${movie.title}`}><button type="button" className="mt-[2%] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Watch Now</button></Link>
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <>
                        <section className='mt-[60px]' style={{ backgroundImage: `url(${movie.mobileBackgroundUrl})`, height: '95vh', width: '98vw', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        </section>
                        <div className=''>
                            <h1 className='text-xl text-white m-4'>{movie.title}</h1>
                            <p className='text-white m-4 text-lg'>{movie.description}</p>
                            <p>Drama Comedy</p>
                            <Link to={`/movieplay/${movie.title}`}><button type="button" className="mt-[2%] m-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Watch Now</button></Link>
                        </div>
                    </>
                )
            }
            <section className='mt-[5%] my-10 flex items-center justify-center'>
                <iframe width="80%" height="800" src={`${movie.movieTrailer}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </section>
        </div>
    );
}

export default MovieDetails;
