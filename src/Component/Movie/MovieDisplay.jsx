import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import "./MovieDisplay.css";
import Aos from 'aos';
import { ref, onValue } from 'firebase/database';
import { database,auth } from '../../Firebase';
import { onAuthStateChanged } from 'firebase/auth';

function MovieDisplay({ type }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
const navigate=useNavigate();

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (!user) {
                // If not logged in, redirect to login page
                navigate('/login');
            }
        });

        return () => unsubscribeAuth();  // Clean up the listener on unmount
    }, [navigate])

    useEffect(() => {
        const movieRef = ref(database, 'Movies');

        const unsubscribe = onValue(movieRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const movieList = Object.keys(data).map((key) => ({
                    id: data[key].id,
                    ...data[key]
                }));

                // Filter movies by type
                const filteredMovies = movieList.filter(movie => movie.movieType === type);
                // Sort movies based on the numerical part of the id
                const sortedMovies = filteredMovies.sort((a, b) => {
                    const idA = parseInt(a.id.replace('movie', ''), 10);
                    const idB = parseInt(b.id.replace('movie', ''), 10);
                    return idA - idB;
                });

                setMovies(sortedMovies.reverse());
            } else {
                setError('No data found');
            }
            setLoading(false);
        }, (error) => {
            setError(error);
            setLoading(false);
        });

        return () => unsubscribe(); // Clean up the listener
    }, [type]); // Add `type` as a dependency to re-fetch data when it changes

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <Navbar />

            <h1 className='text-4xl text-white ml-[13%] my-[50px]'>{type} Movies</h1>

            <div className="h-full grid lg:grid-cols-5 grid-cols-2 justify-between max-w-fit ml-auto mr-auto lg:gap-10 gap-5" data-aos="fade-right">
                {movies.map((movie, index) => (
                    <Link to={`/moviedisplay/${movie.title}`} key={index}>
                        <div className="card flex justify-center items-center" style={{ background: `url(${movie.posterUrl})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                            <h1 className='text-lg text-black bg-white w-full mt-[225px] rounded-b-[17px]'>{movie.title}</h1>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MovieDisplay;
