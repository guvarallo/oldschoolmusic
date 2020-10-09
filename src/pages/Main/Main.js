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
        setArtists({
          id: artists[0].id,
          img: artists[0].cover_image,
          title: artists[0].title
        });
        masters.map(result => {
          return setMasters(el => [...el, {
            id: result.id,
            img: result.thumb,
            title: result.title,
            master_url: result.master_url
          }]);
        })
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
                {artists.img &&
                  <Link to={`/artists/${artists.id}`} >
                    <img src={artists.img} alt={artists.title}/>
                  </Link>
                }
            </div>
          : <div>
            <Input 
                onChange={handleTermChange} 
                placeholder="Search by Album" 
                onPressEnter={() => {
                  setMasters([]); //Needed for new searches
                  handleSearch(searchTerm)
                }}
              />
              <Button 
                type="primary" 
                onClick={() => {
                  setMasters([]);
                  handleSearch(searchTerm)
                }}
              >
                Go!
              </Button>
              <Albuns albuns={masters} />
          </div>
        }
      </div>
      {console.log(artists)}
      <div>
        {isLoading &&
          <Spin />
        }
      </div>
    </div>
  );
}

export default Main;