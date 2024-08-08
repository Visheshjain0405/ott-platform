// src/pages/Movies.js
import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';

function Movies() {
  const [movie, setMovies] = useState({
    name: '',
    poster: null,
    backgroundPoster: null,
    watchLink: '',
    description: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setMovies((prevMovie) => ({
        ...prevMovie,
        [name]: files[0],
      }));
    } else {
      setMovies((prevMovie) => ({
        ...prevMovie,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert('Workimg')
    const formData = new FormData();
    formData.append('name', movie.name);
    formData.append('poster', movie.poster);
    formData.append('backgroundPoster', movie.backgroundPoster);
    formData.append('watchLink', movie.watchLink);
    formData.append('description', movie.description);
    formData.append('category', movie.category);

    try {
      const response = await axios.post('http://localhost:5000/api/movies', movie.name  , {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Movie Details:', response.data);
    } catch (error) {
      console.error('Error uploading movie:', error);
    }

  }


  return (
    <div>
      <Sidebar />
      <div className="border-2 border-red-500 ml-[250px]">
        <>
          {/* Modal toggle */}
          <button
            data-modal-target="authentication-modal"
            data-modal-toggle="authentication-modal"
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Toggle modal
          </button>
          {/* Main modal */}
          <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-black">
                    Add Movie
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
                {/* Modal body */}
                <div className="p-4 md:p-5">
                  <form className="" onSubmit={handleSubmit}>
                    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                          Movie Title
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          name="name"
                          value={movie.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter movie title"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                          Movie Description
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="description"
                          name="description"
                          value={movie.description}
                          onChange={handleChange}
                          required
                          placeholder="Enter movie description"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="poster">
                          Movie Poster
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="poster"
                          type="file"
                          name="poster"
                          onChange={handleChange}
                          required
                          placeholder="Upload movie poster"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="backgroundPoster">
                          Movie Background Poster
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="backgroundPoster"
                          type="file"
                          name="backgroundPoster"
                          onChange={handleChange}
                          required
                          placeholder="Upload movie background poster"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="watchLink">
                          Movie Watch Link
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="watchLink"
                          type="text"
                          name="watchLink"
                          value={movie.watchLink}
                          onChange={handleChange}
                          required
                          placeholder="Paste movie link"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
                          Movie Category
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="category"
                          type="text"
                          name="category"
                          value={movie.category}
                          onChange={handleChange}
                          required
                          placeholder="Enter movie category"
                        />
                      </div>
                      <div className="flex items-center justify-center mb-4">
                        <button
                          className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                          type="submit"
                        // onClick={handle}
                        >
                          Add Movie
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default Movies;
