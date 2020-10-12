import React, { useState } from 'react';
import { Radio, Input, Button, Layout } from 'antd';

import Discogs from '../../utils/DiscogsAPI';
import Artists from '../Artists/Artists';
import Releases from '../Releases/Releases';
import Albuns from '../Albuns/Albuns';
import Collection from '../Collection/Collection';

import './App.css';

const { Header, Sider, Content } = Layout;

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputError, setInputError] = useState('');
  const [radioValue, setRadioValue] = useState('artist');
  const [artists, setArtists] = useState([]);
  const [masters, setMasters] = useState([]);
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleRadioValue(event) {
    setRadioValue(event.target.value);
  }

  function handleTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function addToCollection(element) {
    if (collection.find(el => el.id === element.id)) {
      alert('Element already on your collection');
      return;
    }

    setCollection(myCollection => [...myCollection, {
      id: element.id,
      img: element.img,
      title: element.title
    }]);
  }

  function removeFromCollection(element) {
    let result = collection.filter(el => el.id !== element.id);
    setCollection(result);
  }

  function handleSearch(term) {
    if (!term) {
      setInputError('Please type a valid Artist/Album');
      return;
    }

    setIsLoading(true);

    Discogs.search(term)
    .then(result => {
      setArtists(result[0]);
      setMasters(result[1]);
      setIsLoading(false);
    })
    .catch(err => {
      setIsLoading(false);
      setInputError('Not found');
    })
  }

  return (
    <>
      <Layout>
      <Header>
        <h1>Old School Music</h1>
      </Header>
      <Layout>
        <Sider className="collection">
          <Collection collection={collection} onRemove={removeFromCollection} />
        </Sider>
        <Content>
        <h3>Search</h3>
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
          {inputError && <p className="error">{inputError}</p>}
          {radioValue === 'artist'
              ? <>
                  {artists.title &&
                    <>
                      <Artists artists={artists} />
                      <Releases 
                        artistsUrl={artists.url} 
                        onAdd={addToCollection} 
                      /> 
                    </>
                  }
                </>
              : <Albuns albuns={masters} onAdd={addToCollection} />
            }
        </Content>
      </Layout>
    </Layout>
    </>
  );
}

export default App;
