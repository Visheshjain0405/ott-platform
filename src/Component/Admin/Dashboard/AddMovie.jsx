import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import { database } from '../../../Firebase';
import { ref, push, set, onValue, remove, serverTimestamp, orderByChild, query } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
function AddMovie() {

    const [poster, setPoster] = useState(null);
    const [background, setBackground] = useState(null);
    const [mobileBackground, setMobileBackground] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [movieType, setMovieType] = useState('');
    const [movieLink, setMovieLink] = useState('');
    const [movieTrailer, setMovieTrailer] = useState('');
    const [slider, setSlider] = useState('no');
    const [posterUrl, setPosterUrl] = useState('');
    const [backgroundUrl, setBackgroundUrl] = useState('');
    const [mobileBackgroundUrl, setMobileBackgroundUrl] = useState('');
    const modalRef = useRef(null);
    const preset_key = "CinemaCraze";
    const cloud_name = "djh2ro9tm";

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const now = new Date();
    const timestamp = now.getTime(); // Epoch time in milliseconds
    const date = now.toISOString(); // Human-readable date

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
                setMovies(movieList); // Reverse to display the latest movie first
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Clean up the listener
    }, []);

    const handleMultipleUploads = async (e) => {
        e.preventDefault();

        const uploaders = [
            { file: poster, folder: 'posters', setUrl: setPosterUrl },
            { file: background, folder: 'backgrounds', setUrl: setBackgroundUrl },
            { file: mobileBackground, folder: 'mobile_backgrounds', setUrl: setMobileBackgroundUrl }
        ].map(async ({ file, folder, setUrl }) => {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', preset_key);
                formData.append('folder', folder);

                try {
                    const response = await axios.post(
                        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                        formData
                    );

                    const imageUrl = response.data.secure_url;
                    setUrl(imageUrl);
                    return imageUrl;
                } catch (error) {
                    console.error('Error uploading image:', error);
                    toast.error('Image upload failed');
                    return null;
                }
            }
            return null;
        });

        const urls = await Promise.all(uploaders);

        const [posterImageUrl, backgroundImageUrl, mobileBackgroundImageUrl] = urls;

        if (posterImageUrl) setPosterUrl(posterImageUrl);
        if (backgroundImageUrl) setBackgroundUrl(backgroundImageUrl);
        if (mobileBackgroundImageUrl) setMobileBackgroundUrl(mobileBackgroundImageUrl);
        const movieCount = movies ? Object.keys(movies).length : 0;
        const newMovieId = `movie${movieCount + 1}`;
        const movieData = {
            id: newMovieId,
            title,
            description,
            movieType,
            movieLink,
            movieTrailer,
            slider,
            posterUrl: posterImageUrl,
            backgroundUrl: backgroundImageUrl,
            mobileBackgroundUrl: mobileBackgroundImageUrl,
            timestamp,
            date
        };

        try {
            const movieRef = ref(database, `Movies/${title}`);
            await set(movieRef, movieData);
            toast.success("Movie details saved successfully!");
            setTitle('');
            setDescription('');
            setMovieType('');
            setMovieLink('');
            setMovieTrailer('');
            setSlider('no');
            setPoster(null);
            setBackground(null);
            setMobileBackground(null);
            setPosterUrl('');
            setBackgroundUrl('');
            setMobileBackgroundUrl('');
            if (modalRef.current) {
                modalRef.current.classList.add('hidden'); // Hides the modal
            }
        } catch (error) {
            console.error('Error saving movie details:', error);
            toast.error('Failed to save movie details');
        }
    };

    const handleFileChange = (e, setFile) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        }
    };



    return (
        <div>
            <Sidebar />
            <div className='ml-[280px]'>
                <h1 className='text-4xl text-white text-center mt-5'>Add Movie</h1>


                <div className="min-h-screen flex flex-col justify-center  ">

                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form method="POST" action="#">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-5  text-gray-700"
                                    >
                                        Movie Title
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input

                                            type="text"
                                            placeholder="John Doe"
                                            name='title'
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required=""
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                        <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg
                                                className="h-5 w-5 text-red-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Movie Description
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required=""
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                        <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg
                                                className="h-5 w-5 text-red-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Movie Poster Image
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input
                                            type="file"
                                            name="password"
                                            id="poster"
                                            onChange={(e) => handleFileChange(e, setPoster)}
                                            required=""
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Movie Background Image
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input
                                            type="file"
                                            name="password_confirmation"
                                            id="background"
                                            onChange={(e) => handleFileChange(e, setBackground)}
                                            required=""
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Movie Mobile Background Image
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input
                                            type="file"
                                            name="password_confirmation"
                                            id="mobileBackground"
                                            onChange={(e) => handleFileChange(e, setMobileBackground)}
                                            required=""
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Movie Link
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            id="movieLink"
                                            value={movieLink}
                                            onChange={(e) => setMovieLink(e.target.value)}
                                            required=""
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                        Movie Trailer
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            id="movieTrailer"
                                            value={movieTrailer}
                                            onChange={(e) => setMovieTrailer(e.target.value)}
                                            required=""
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className='mt-6'>
                                    <label for="slider" class="block mb-2 text-sm font-medium text-black">Add To Slider</label>
                                    <select id="slider" value={slider} onChange={(e) => setSlider(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Add to Slider</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className='mt-6'>
                                    <label for="countries" class="block mb-2 text-sm font-medium text-black">Movie Type</label>
                                    <select id="movieType" value={movieType} onChange={(e) => setMovieType(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Movie Type</option>
                                        <option value="Bollywood">Bollywood</option>
                                        <option value="South">South Hindi Dubbed Movie</option>
                                        <option value="Hollywood">Hollywood</option>
                                        <option value="Web-Series">Web Series</option>
                                    </select>
                                </div>
                                <div className="mt-6">
                                    <span className="block w-full rounded-md shadow-sm">
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                            onClick={handleMultipleUploads}
                                        >
                                            Create account
                                        </button>
                                    </span>
                                </div>
                            </form>
                            {/* Display Uploaded Images */}
                            {posterUrl && (
                                <div className="mt-4">
                                    <p>Poster Uploaded Successfully!</p>
                                    <img src={posterUrl} alt="Poster" className="mt-2" style={{ width: '100%' }} />
                                </div>
                            )}
                            {backgroundUrl && (
                                <div className="mt-4">
                                    <p>Background Uploaded Successfully!</p>
                                    <img src={backgroundUrl} alt="Background" className="mt-2" style={{ width: '100%' }} />
                                </div>
                            )}
                            {mobileBackgroundUrl && (
                                <div className="mt-4">
                                    <p>Mobile Background Uploaded Successfully!</p>
                                    <img src={mobileBackgroundUrl} alt="Mobile Background" className="mt-2" style={{ width: '100%' }} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>


            </div>
            <ToastContainer />
        </div>
    )
}

export default AddMovie