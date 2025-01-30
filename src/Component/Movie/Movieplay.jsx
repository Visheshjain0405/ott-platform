import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database';
import { database, auth } from '../../Firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Movieplay() {
  const { name } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const movieRef = ref(database, 'Movies');
    const q = query(movieRef, orderByChild('title'), equalTo(name));

    const unsubscribe = onValue(q, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const movieData = Object.values(data)[0]; // Get the first matching movie
        setMovie(movieData);
        console.log(movieData);
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, [name]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If not logged in, redirect to login page
        navigate('/login');
      }
    });

    return () => unsubscribeAuth();  // Clean up the listener on unmount
  }, [navigate])

  if (!movie) {
    return <h1>No Movie Found</h1>;
  }

  return (
    <div>
      <iframe
        className='h-[100vh] w-[100vw]'
        src={`${movie.movieLink}`}
        title={movie.title}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Movieplay;
