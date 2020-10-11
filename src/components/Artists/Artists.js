import React from 'react';

import './Artists.css';

function Artists({ artist }) {

  return (
    <div className="artist">
      <h4>{artist.name}</h4>
      {artist.members && 
        artist.members.map(member => {
        return <p>{member.name}</p>
      })}
    </div>
  )
}

export default Artists;
