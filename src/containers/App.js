import React, { useState } from 'react';
import { Input, Button } from 'antd';

import './App.css';

function App() {
  const apiKey = 'xHkvirUsAkQKmuPtVhkNgQFyjUkQbbWFAhKwREnq';
  const [searchTerm, setSearchTerm] = useState({term: ''});
  const [results, setResults] = useState([]);

  function handleTermChange(event) {
    setSearchTerm({term: event.target.value});
  }

  function handleSearch() {
    searchArtist(searchTerm.term);
  }

  function searchArtist(term) {
    try {
      fetch(`https://api.discogs.com/database/search?q=${term}`, {
        headers: {
          Authorization: `Discogs token=${apiKey}`
        }
      })
      .then(res => res.json())
      .then(data => {
        return data.results.map(result => {
          return setResults(el => [...el, {
            id: result.id,
            genre: result.genre,
            style: result.style,
            title: result.title,
            year: result.year,
            img: result.cover_image
          }])
        })
      })
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="App">
      <h1>Artists</h1>
      <Input onChange={handleTermChange} placeholder="Search Artist" />
      <Button type="primary" onClick={() => handleSearch()} >Go!</Button>
      <div>
        {/* {results.map(result => {
          return (
            <img src={result.img} alt="album"/>
          )
        })} */}
      </div>
    </div>
  );
}

export default App;
