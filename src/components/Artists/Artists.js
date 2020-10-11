import React from 'react';

import './Artists.css';

function Artists({ artist }) {

  return (
    <div className="artist">
      <h1>{artist.name}</h1>
      {artist.members && 
        artist.members.map(member => {
        return <h2>{member.name}</h2>
      })}
  </div>
  )
}

export default Artists;
