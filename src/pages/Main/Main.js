import React, { useState } from 'react';
import { Radio, Input, Button, Spin } from 'antd';
import { Link } from 'react-router-dom';

import Albuns from '../Albuns/Albuns';

import './Main.css';

function Main() {
  const [searchTerm, setSearchTerm] = useState('');
  const [radioValue, setRadioValue] = useState('artist');
  const [artists, setArtists] = useState([]);
  const [masters, setMasters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = 'xHkvirUsAkQKmuPtVhkNgQFyjUkQbbWFAhKwREnq';
  const url = 'https://api.discogs.com/database/search?';

  function handleRadioValue(event) {
    setRadioValue(event.target.value);
  }

  function handleTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearch(term) {
    setIsLoading(true);
    try {
      fetch(`${url}q=${term}`, {
        headers: {
          Authorization: `Discogs token=${apiKey}`
        }
      })
      .then(res => res.json())
      .then(data => {
        let artists = data.results.filter(result => result.type === 'artist');
        let masters = data.results.filter(result => result.type === 'master');
        setIsLoading(false);
        setArtists(artists[0]);
        setMasters(masters);
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="Main">
      <h1>Search</h1>
      <div>
        <Radio.Group 
          defaultValue="artist" 
          buttonStyle="solid" 
          onChange={handleRadioValue}
        >
          <Radio.Button value="artist">Artist</Radio.Button>
          <Radio.Button value="album">Album</Radio.Button>
        </Radio.Group>
        {radioValue === 'artist'
          ? <div>
              <Input 
                onChange={handleTermChange} 
                placeholder="Search by Artist" 
                onPressEnter={() => handleSearch(searchTerm)}
              />
              <Button 
                type="primary" 
                onClick={() => handleSearch(searchTerm)}
              >
                Go!
              </Button>
                {artists.cover_image &&
                  <Link to={`/artists/${artists.id}`} >
                    <img src={artists.cover_image} alt="band"/>
                  </Link>
                }
            </div>
          : <div>
            <Input 
                onChange={handleTermChange} 
                placeholder="Search by Album" 
                onPressEnter={() => handleSearch(searchTerm)}
              />
              <Button 
                type="primary" 
                onClick={() => handleSearch(searchTerm)}
              >
                Go!
              </Button>
              <Albuns albuns={masters} />
          </div>
        }
      </div>
      <div>
        {isLoading &&
          <Spin />
        }
      </div>
    </div>
  );
}

export default Main;