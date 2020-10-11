import React, { useEffect, useState } from 'react';
import { Radio, Input, Button } from 'antd';

import Discogs from '../../utils/DiscogsAPI';
import Artists from '../Artists/Artists';
import Albuns from '../Albuns/Albuns';

import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputError, setInputError] = useState('');
  const [radioValue, setRadioValue] = useState('artist');
  const [artists, setArtists] = useState([]);
  const [artist, setArtist] = useState({});
  const [releases, setReleases] = useState([]);
  const [masters, setMasters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let releasesUrl = artists.url + '/releases?sort=year&sort_order=asc&page=2';

  function handleRadioValue(event) {
    setRadioValue(event.target.value);
  }

  function handleTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearch(term) {
    if (!term) {
      setInputError('Please type an Artist or an Album');
      return;
    }

    setIsLoading(true);

    Discogs.search(term)
    .then(result => {
      setArtists(result[0]);
      setMasters(result[1]);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    // Artist fetch
    Discogs.artist(artists.url)
    .then(result => setArtist(result))
    .catch(err => console.log(err));
    
    // Releases fetch
    Discogs.releases(releasesUrl)
    .then(results => {
      setReleases([...results]);
      setIsLoading(false);
    })
    .catch(err => console.log(err));
  }, [artists.url, releasesUrl]);

  return (
    <div className="App">
      <h1>Search</h1>
      <header>
        <Radio.Group
          defaultValue="artist" 
          buttonStyle="solid" 
          onChange={handleRadioValue}
        >
          <Radio.Button 
            value="artist"
          >
            Artist
          </Radio.Button>
          <Radio.Button 
            value="album"
          >
            Album
          </Radio.Button>
        </Radio.Group>
        <Input 
          onChange={handleTermChange} 
          placeholder="Search by Artist or by Album" 
          onPressEnter={() => {
            setInputError('');
            setMasters([]);
            setArtists([]);
            handleSearch(searchTerm)
          }}
        />
        <Button 
          type="primary" 
          loading={isLoading}
          onClick={() => {
            setInputError('');
            setMasters([]);
            setArtists([]);
            handleSearch(searchTerm)
          }}
        >
          Search
        </Button>
        {inputError && <p>{inputError}</p>}
      </header>
      {radioValue === 'artist'
        ? <div>         
            {artist.name &&
              <Artists 
                artist={artist} 
                releases={releases} 
                isLoading={isLoading} 
              />
            }
          </div>
        : <div>
            <Albuns albuns={masters} />
          </div>
      }
    </div>
  );
}

export default App;
