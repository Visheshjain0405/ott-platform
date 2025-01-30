import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
function Movies() {
    return (
        <div className=' bg-black'>
            <Carousel responsive={responsive}>
                <div className=''>
                <Link to="/badnewz">
                    <div className="relative mx-auto mt-20 h-[350px] w-[250px]">
                        <img
                            className="h-[350px] w-[250px] object-cover rounded-md"
                            src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/bad-newz-et00391805-1721214274.jpg"
                            alt="Random image"
                        />
                        <div className="absolute inset-0 bg-black opacity-60 rounded-md" />
                        <div className="absolute inset-0 h-full">
                            <h2 className="text-white text-3xl font-bold mt-[115%] text-center">Bad Newz</h2>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className=''>
                    <Link to="moviedetails">
                     <div className="relative mx-auto mt-20 h-[350px] w-[250px]">
                        <img
                            className="h-[350px] w-[250px] object-cover rounded-md"
                            src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/deadpool-and-wolverine-et00341295-1718018322.jpg"
                            alt="Random image"
                        />
                        <div className="absolute inset-0 bg-black opacity-60 rounded-md" />
                        <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-xl font-bold mt-[115%] text-center">Deadpool & Wolverine</h2>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className=''>
                     <div className="relative mx-auto mt-20 h-[350px] w-[250px]">
                        <img
                            className="h-[350px] w-[250px] object-cover rounded-md"
                            src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/sarfira-et00387250-1720677970.jpg"
                            alt="Random image"
                        />
                        <div className="absolute inset-0 bg-black opacity-60 rounded-md" />
                        <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-3xl font-bold mt-[115%] text-center">Safira</h2>
                        </div>
                    </div>
                </div>
                <div className=''>
                     <div className="relative mx-auto mt-20 h-[350px] w-[250px]">
                        <img
                            className="h-[350px] w-[250px] object-cover rounded-md"
                            src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kill-et00374797-1718179453.jpg"
                            alt="Random image"
                        />
                        <div className="absolute inset-0 bg-black opacity-60 rounded-md" />
                        <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-3xl font-bold mt-[115%] text-center">Kill</h2>
                        </div>
                    </div>
                </div>
                <div className=''>
                     <div className="relative mx-auto mt-20 h-[350px] w-[250px]">
                        <img
                            className="h-[350px] w-[250px] object-cover rounded-md"
                            src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/hindustani-2-et00402649-1720515789.jpg"
                            alt="Random image"
                        />
                        <div className="absolute inset-0 bg-black opacity-60 rounded-md" />
                        <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-3xl font-bold mt-[115%] text-center">Hindustani 2</h2>
                        </div>
                    </div>
                </div>
                <div className=''>
                     <div className="relative mx-auto mt-20 h-[350px] w-[250px]">
                        <img
                            className="h-[350px] w-[250px] object-cover rounded-md"
                            src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/maharaja-hindi-et00402946-1719504211.jpg"
                            alt="Random image"
                        />
                        <div className="absolute inset-0 bg-black opacity-60 rounded-md" />
                        <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-3xl font-bold mt-[115%] text-center">Maharaja</h2>
                        </div>
                    </div>
                </div>
                <div className=''>
                     <div className="relative mx-auto mt-20 h-[350px] w-[250px]">
                        <img
                            className="h-[350px] w-[250px] object-cover rounded-md"
                            src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/despicable-me-4-et00386901-1715335701.jpg"
                            alt="Random image"
                        />
                        <div className="absolute inset-0 bg-black opacity-60 rounded-md" />
                        <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-3xl font-bold mt-[115%] text-center">Despicable Me 4</h2>
                        </div>
                    </div>
                </div>
                <div className=''>
                     <div className="relative mx-auto mt-20 h-[350px] w-[250px]">
                        <img
                            className="h-[350px] w-[250px] object-cover rounded-md"
                            src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/trisha-on-the-rocks-et00397769-1717822379.jpg"
                            alt="Random image"
                        />
                        <div className="absolute inset-0 bg-black opacity-60 rounded-md" />
                        <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-3xl font-bold mt-[115%] text-center">Trisha on Rocks</h2>
                        </div>
                    </div>
                </div>
            </Carousel>;
        </div>
    )
}

export default Movies