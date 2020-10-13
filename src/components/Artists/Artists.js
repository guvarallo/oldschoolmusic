import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';

import Releases from '../Releases/Releases';
import './Artists.css';

function Artists({ artist, onAdd }) {
  return (
    <div className="artist">
      {!!Object.keys(artist).length && 
      <>
        <h4>{artist.title}</h4>
          <div className="container">
            <a href={artist.uri} target="blank">
              <img src={artist.img} alt={artist.title} className="artistImg" />
            </a>
            <div className="middle">
              <PlusCircleOutlined />
              <div>Click for more info at DiscoGS</div>
            </div>
          </div>
        <h4>All the releases for this artist:</h4>
        <Releases 
          artistsUrl={artist.url} 
          onAdd={onAdd}
          artist={artist}
        /> 
      </>
      }
    </div>
  )
}

export default Artists;
