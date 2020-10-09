import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';

import './Main.css';

function Main() {
  const [searchTerm, setSearchTerm] = useState({term: ''});
  // const [albumResults, setAlbumResults] = useState([]);
  const [artistResults, setArtistResults] = useState([{}]);
  const apiKey = 'xHkvirUsAkQKmuPtVhkNgQFyjUkQbbWFAhKwREnq';
  const url = 'https://api.discogs.com/database/search?';

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
      fetch(`${url}q=${term}`, {
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
    <div className="Main">
      <h1>Search</h1>
      <Input onChange={handleTermChange} placeholder="Search Artist" />
      <Button type="primary" onClick={() => handleArtistSearch()} >Go!</Button>
        {artistResults
          ?
            <Link to={`/artists/${artistResults.id}`} >
              <img src={artistResults.cover_image} alt="band"/>
            </Link>
          : 
            ''
        }
    </div>
  );
}

export default Main;