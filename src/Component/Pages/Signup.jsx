import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../../Firebase';
import { ref, set } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
function Signup() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const HandleSubmit = async (e) => {

        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    const user = auth.currentUser;
                    const userRef = ref(database, 'Users/' + username)
                    set(userRef, {
                        emailid: email,
                        password: password,
                        username: username
                    })
                        .then(() => {
                            console.log("Data Saved Successfully !")
                            toast.success("User Register Successfully !")
                        }).catch((error) => {
                            console.error(error)
                            toast.error('Registration Failed');
                        })
                    console.log("Form submitted with:", email, password)
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        toast.error('Email ID already registered with us.');
                    } else {
                        console.log(error.message);
                    }
                })

        } catch (error) {
            console.error(error)
        }
        // Add validation here
    }
    return (
        <div>
            <div className='flex justify-center items-center' style={{ background: 'url(https://w.wallhaven.cc/full/0w/wallhaven-0w2de6.jpg)', height: '100vh', backgroundSize: 'cover' }}>
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Create an Account
                    </h2>
                    <form id="registrationForm" noValidate="" onSubmit={HandleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your username"
                                required=""
                            />
                            <p className="text-red-500 text-sm mt-2 hidden" id="usernameError">
                                Username is required.
                            </p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your email"
                                required=""
                            />
                            <p className="text-red-500 text-sm mt-2 hidden" id="emailError">
                                Please enter a valid email.
                            </p>
                        </div>
                        <div className="mb-4">
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
                        <div className="mb-4">
                            <label
                                htmlFor="confirm-password"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Confirm your password"
                                required=""
                            />
                            <p className="text-red-500 text-sm mt-2 hidden" id="confirmPasswordError">
                                Passwords do not match.
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        >
                            Register
                        </button>
                    </form>
                    <p className="text-center text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link to="/" className="text-blue-500 font-semibold">
                            Sign In
                        </Link>
                    </p>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Signup