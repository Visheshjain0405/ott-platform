import axios from 'axios';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../Firebase';
import { toast, ToastContainer } from 'react-toastify';

function Login() {

    const [email, setEmailid] = useState('');
    const [password, setPassword] = useState('');

    const HandleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password).then(() => {
                toast.success('Login success');
                window.location.href = "/";
            })
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <div className='flex justify-center items-center' style={{ background: 'url(https://w.wallhaven.cc/full/0w/wallhaven-0w2de6.jpg)', height: '100vh', backgroundSize: 'cover' }}>
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full h-[75vh]">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Login to Cinema Hub
                    </h2>
                    <form id="registrationForm" noValidate="" onSubmit={HandleSubmit}>
                        <div className="mb-8">
                            <label
                                htmlFor="username"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={email}
                                onChange={(e) => setEmailid(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your username"
                                required=""
                            />
                            <p className="text-red-500 text-sm mt-2 hidden" id="usernameError">
                                Username is required.
                            </p>
                        </div>

                        <div className="mb-8">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your password"
                                required=""
                            />
                            <p className="text-red-500 text-sm mt-2 hidden" id="passwordError">
                                Password is required.
                            </p>
                        </div>
                        <div className='mb-10'>
                            <input type="checkbox" name="" id="checkbox" className='mr-5' />
                            <label htmlFor="checkbox">i agree to the <a href='#' className='text-blue-500 font-semibold'>Terms & Conditions</a></label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-center text-gray-600 mt-4">
                        Don't have an account?{" "}
                        <Link to="/signup" href="#" className="text-blue-500 font-semibold">
                            Sign Up
                        </Link>
                    </p>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login