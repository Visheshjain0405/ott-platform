import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database';
import { database } from '../../Firebase';

function Movieplay() {
  const { name } = useParams();
  const [movie, setMovie] = useState(null);

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
