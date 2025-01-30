import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './MovieSlider.css'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { moviesdata } from '../Assests/Data';
function MovieSlider() {

    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const slidermovie = moviesdata.filter(movie => movie.slider === 'yes')
    console.log(slidermovie)
    return (
        <div className='mt-[70px]'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >

                {
                    slidermovie.map(movie => (
                        isDesktop ? (
                            <SwiperSlide style={{ background: `url(${movie.background_url})`, height: '80vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                                {/* <img src="" alt="" style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', width: '100%' }} /> */}
                                <div className="absolute inset-0 bg-black bg-opacity-50">
                                    <div className=' absolute bottom-[100px] left-10'>
                                        <h1 className='text-4xl text-white font-serif'>{movie.title}</h1>
                                        <p className='text-white text-xl w-[50%] mt-[2%]'>{movie.description}</p>
                                        <button type="button" class="mt-[2%] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Wtach Now</button>
                                    </div>
                                </div>


                            </SwiperSlide>
                        ) : (
                            <SwiperSlide style={{ background: `url(${movie.mobile_background_url})`, height: '80vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                                {/* <img src="" alt="" style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', width: '100%' }} /> */}
                                <div className="absolute inset-0 bg-black bg-opacity-50">
                                    <div className=' absolute bottom-[100px] left-10'>
                                        <h1 className='text-4xl text-white font-serif my-5'>{movie.title}</h1>
                                        {/* <p className='text-white text-xl w-[50%] mt-[2%]'>{movie.description}</p> */}
                                        <button type="button" class="mt-[2%] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Wtach Now</button>
                                    </div>
                                </div>


                            </SwiperSlide>
                        )
                    ))
                }

            </Swiper>
        </div>
    )
}

export default MovieSlider