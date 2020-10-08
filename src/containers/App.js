import React, { useState } from 'react';
import { Input, Button } from 'antd';

import './App.css';

function App() {
  const apiKey = 'xHkvirUsAkQKmuPtVhkNgQFyjUkQbbWFAhKwREnq';
  const [searchTerm, setSearchTerm] = useState({term: ''});
  // const [albumResults, setAlbumResults] = useState([]);
  const [artistResults, setArtistResults] = useState([{}]);

  function handleTermChange(event) {
    setSearchTerm({term: event.target.value});
  }

  function handleArtistSearch() {
    searchArtist(searchTerm.term);
  }

  // function handleAlbumSearch() {
  //   searchAlbum(searchTerm.term);
  // }

  function searchArtist(term) {
    try {
      fetch(`https://api.discogs.com/database/search?q=${term}`, {
        headers: {
          Authorization: `Discogs token=${apiKey}`
        }
      })
      .then(res => res.json())
      .then(data => {
        let art = data.results.filter(result => result.type === 'artist');
        return setArtistResults(art[0]);
      })
    } catch (err) {
      console.log(err);
    }
  }

  // function searchAlbum(term) {
  //   try {
  //     fetch(`https://api.discogs.com/database/search?q=${term}`, {
  //       headers: {
  //         Authorization: `Discogs token=${apiKey}`
  //       }
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //       return data.results.map(result => {
  //         return setAlbumResults(el => [...el, {
  //           id: result.id,
  //           genre: result.genre,
  //           style: result.style,
  //           title: result.title,
  //           year: result.year,
  //           img: result.cover_image
  //         }])
  //       })
  //     })
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }


  return (
    <div className="App">
      <h1>Artists</h1>
      <Input onChange={handleTermChange} placeholder="Search Artist" />
      <Button type="primary" onClick={() => handleArtistSearch()} >Go!</Button>
      <div>
        {artistResults
          ? 
            <>
              <a href={artistResults.resource_url}>Click</a>
              <img src={artistResults.cover_image} alt="band"/>
            </>
          : 
            ''
        }
      </div>
    </div>
  );
}

export default App;
