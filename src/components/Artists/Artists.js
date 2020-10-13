import React, { useState, useEffect } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';

import Releases from '../Releases/Releases';
import Discogs from '../../utils/DiscogsAPI';
import './Artists.css';

function Artists({ artists, onAdd }) {
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
      {!!Object.keys(artist).length && 
      <>
        <h4>{artist.name}</h4>
          <div className="container">
            <a href={artist.uri} target="blank">
              <img src={artist.img} alt={artist.name} className="artistImg" />
            </a>
            <div className="middle">
              <PlusCircleOutlined />
              <div>Click for more info at DiscoGS</div>
            </div>
          </div>
        <h4>All the releases for this artist:</h4>
        <Releases 
          artistsUrl={artists.url} 
          onAdd={onAdd}
          artist={artist}
        /> 
      </>
      }
    </div>
  )
}

export default Artists;
