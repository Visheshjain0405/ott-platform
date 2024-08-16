import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import { Link } from 'react-router-dom';
import "./MovieDisplay.css";
import Aos from 'aos';
import { ref, query, orderByChild, onValue } from 'firebase/database';
import { database } from '../../Firebase';

function MovieDisplay({ type }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const movieRef = ref(database, 'Movies');
        const q = query(movieRef, orderByChild('title'));

        const unsubscribe = onValue(q, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const movieList = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key]
                }));
                console.log(movieList)
                const filteredMovies = movieList.filter(movie => movie.movieType === type);
                console.log(filteredMovies)
                setMovies(filteredMovies.reverse()); // Reverse to display the latest movie first
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

            <div className="h-full grid lg:grid-cols-5 grid-cols-2 justify-between max-w-fit ml-auto mr-auto lg:gap-10 gap-5 lg:mx-0 mx-2" data-aos="fade-right">
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
