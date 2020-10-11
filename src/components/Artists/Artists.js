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
      {artist.members && 
        artist.members.map(member => {
        return <p>{member.name}</p>
      })}
    </div>
  )
}

export default Artists;
