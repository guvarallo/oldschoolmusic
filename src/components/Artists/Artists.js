import React from 'react';
import { PlusCircleTwoTone } from '@ant-design/icons';

import Releases from '../Releases/Releases';
import './Artists.css';

function Artists({ artist, onAdd }) {
  const url = 'https://www.discogs.com';

  return (
    <div className="artist">
      {!!Object.keys(artist).length && 
      <>
        <h4>{artist.title}</h4>
        <div style={{ position: "relative" }}>
          <a href={url + artist.uri} target="blank" className="artistContainer">
            <img alt={artist.title} src={artist.img} className="image" />
            <div className="middle">
              <PlusCircleTwoTone />
              <div style={{ 
                color: "#1890ff", 
                fontWeight: "bold" 
              }}>
                Click for more info at DiscoGS
              </div>
            </div>
          </a>
        </div>
        <h4>{`Here are all the releases we found for ${artist.title}:`}</h4>
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
