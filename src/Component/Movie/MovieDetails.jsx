import React, { useState, useEffect } from 'react'
import Navbar from "../Navbar/Navbar"
import { moviesdata } from "../Home/Assests/Data"
import { useParams, Link } from 'react-router-dom'
import "./MovieDetails.css"
function MovieDetails() {


    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    const { name } = useParams();
    console.log(name)
    const movie = moviesdata.find(movie => movie.title === name)


    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div>
            <Navbar />
            {
                isDesktop ? (
                    <>
                    <section className='mt-[60px]' style={{ backgroundImage: `url(${movie.background_url})`, height: '95vh', width: '98vw', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

                        <div className="absolute inset-0 bg-black bg-opacity-50">
                            <div className=' absolute bottom-[100px] left-10'>
                                <h1 className='text-4xl text-white font-serif'>{movie.title}</h1>
                                <p className='text-white text-xl w-[50%] mt-[2%]'>{movie.description}</p>
                                <Link to={`/movieplay/${movie.title}`}><button type="button" class="mt-[2%] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Wtach Now</button></Link>
                            </div>
                        </div>
                    </section>
    </>
                ) : (
                    <>
                    <section className='mt-[60px]' style={{ backgroundImage: `url(${movie.mobile_background_url})`, height: '95vh', width: '98vw', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

                    <div className="absolute inset-0 bg-black bg-opacity-50">
                        
                    </div>
                </section>
               
                    <div className=''>
                        <h1 className='text-xl text-white m-4'>{movie.title}</h1>
                        <p className='text-white m-4 text-lg'>{movie.description}</p>
                        <p>Drama Comedy</p>
                        <Link to={`/movieplay/${movie.title}`}><button type="button" class="mt-[2%] m-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Wtach Now</button></Link>

                    </div>
                    </>
                )
            }


            <section className='mt-[5%] my-10 flex items-center justify-center'>
                <iframe width="80%" height="800" src="https://www.youtube.com/embed/73_1biulkYk?si=4vF7F68bNi085BzB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </section>
        </div>
    )
}

export default MovieDetails