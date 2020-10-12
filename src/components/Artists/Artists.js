import React, { useState, useEffect } from 'react';

import Discogs from '../../utils/DiscogsAPI';
import './Artists.css';

function Artists({ artists }) {
  const [artist, setArtist] = useState({});
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    Discogs.artist(artists.url)
    .then(result => setArtist(result))
    .catch(err => setInputError('Artist not found'));
  }, [artists.url]);

  return (
    <div className="artist">
      {inputError && <p className="error">{inputError}</p>}
      <h4>{artist.name}</h4>
      <img src={artist.img} alt={artist.name}/>
      <h4>Check out the releases we have for this artist:</h4>
    </div>
  )
}

export default Artists;
