import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import { database } from '../../../Firebase';
import { ref, push, set, onValue, remove, serverTimestamp, orderByChild, query } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Movies() {
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

  const handleDelete = (title) => {
    const movieRef = ref(database, `Movies/${title}`);
    remove(movieRef)
      .then(() => {
        toast.success("Movie deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
        toast.error("Failed to delete movie");
      });
  };

  return (
    <div>
      <Sidebar />
      <ToastContainer />
      <Link to="/addmovie">
        <button
          type="button"
          className="block text-white bg-blue-700 ml-[500px] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Movie
        </button>
      </Link>
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-black ">
                Upload Movie Images
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleMultipleUploads}>
                <div>
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-black">
                    Movie Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="poster" className="block mb-2 text-sm font-medium text-black">
                    Movie Poster
                  </label>
                  <input
                    type="file"
                    id="poster"
                    onChange={(e) => handleFileChange(e, setPoster)}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="background" className="block mb-2 text-sm font-medium text-black">
                    Movie Background Poster
                  </label>
                  <input
                    type="file"
                    id="background"
                    onChange={(e) => handleFileChange(e, setBackground)}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="mobileBackground" className="block mb-2 text-sm font-medium text-black">
                    Movie Mobile Background Poster
                  </label>
                  <input
                    type="file"
                    id="mobileBackground"
                    onChange={(e) => handleFileChange(e, setMobileBackground)}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-black">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="movieTrailer" className="block mb-2 text-sm font-medium text-black">
                    Movie Trailer
                  </label>
                  <input
                    type="text"
                    id="movieTrailer"
                    value={movieTrailer}
                    onChange={(e) => setMovieTrailer(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="movieLink" className="block mb-2 text-sm font-medium text-black">
                    Movie Link
                  </label>
                  <input
                    type="text"
                    id="movieLink"
                    value={movieLink}
                    onChange={(e) => setMovieLink(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="slider" className="block mb-2 text-sm font-medium text-black">
                    Slider
                  </label>
                  <select
                    id="slider"
                    value={slider}
                    onChange={(e) => setSlider(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="movieType" className="block mb-2 text-sm font-medium text-black">
                    Movie Type
                  </label>
                  <select
                    id="movieType"
                    value={movieType}
                    onChange={(e) => setMovieType(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400"
                  >
                    <option value="bollywood">Bollywood</option>
                    <option value="south">South Hindi Dubbed Movie</option>
                    <option value="hollywood">Hollywood</option>
                    <option value="web-series">Web Series</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Upload Images
                </button>
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
      <section className='ml-[300px]'>
        <ul>

        </ul>
        <div className='grid grid-cols-4 gap-5'>
          {movies.map((movie, index) => (
            <>
              <div className='border-2 border-red-500 h-[250px] w-[200px] relative' style={{ background: `url(${movie.posterUrl})`, backgroundSize: 'cover' }}>
                <div className='bg-white h-10 w-full absolute bottom-0'>
                  <h1 className='text-black font-bold text-center'>{movie.title}</h1>
                  <div className='float-right'>
                    <span className='p-2'><i className="fa-solid fa-pen-to-square"></i></span>
                    <span className='p-2'>
                      <button className='' onClick={() => handleDelete(movie.title)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </span>
                  </div>

                </div>
              </div>
            </>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Movies;
