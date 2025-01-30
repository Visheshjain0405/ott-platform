import React, { useState, useEffect } from "react";
import { auth } from '../../Firebase';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Authentication() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })

        return () => unsubscribe(); // cleanup function
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Successfully Logout !');
        } catch (error) {
            toast.error('Failed to Logout');
        }
    }
    return (
        <div>
            {user ? (
                <button onClick={handleLogout} className="text-black bg-white px-8 py-2 rounded-lg">Logout</button>
            ) : (
                <Link to="/login"> <button className="text-black bg-white px-8 py-2 rounded-lg">Login</button></Link>
            )}
        </div>
    )
}

export default Authentication