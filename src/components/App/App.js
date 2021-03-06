import React, { useState } from 'react';
import { Radio, Input, Button, Layout, notification } from 'antd';

import Discogs from '../../utils/DiscogsAPI';
import Artists from '../Artists/Artists';
import Albums from '../Albums/Albums';
import Collection from '../Collection/Collection';

import './App.css';

const { Header, Sider, Content } = Layout;

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputError, setInputError] = useState('');
  const [radioValue, setRadioValue] = useState('artist');
  const [artist, setArtist] = useState({});
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
      notification['info']({
        message: 'Element already in your collection',
      })
      return;
    }

    setCollection(myCollection => [...myCollection, {
      id: element.id,
      img: element.img,
      title: element.title,
      type: element.type
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
      setArtist(result[0]);
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
        <Sider style={{ 
          position:"fixed", 
          width: "20%", 
          overflowY: "scroll", 
          top: "0", 
          bottom: "0" 
        }}>
          <Collection collection={collection} onRemove={removeFromCollection} />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header >
            <h1>Old School Music</h1>
          </Header>
          <Content>
          <h3>Search</h3>
          <Radio.Group
              defaultValue="artist" 
              buttonStyle="solid" 
              onChange={handleRadioValue}
            >
              <Radio.Button 
                value="artist"
                onClick={() => setArtist([])}
              >
                Artist
              </Radio.Button>
              <Radio.Button 
                value="album"
                onClick={() => setMasters([])}
              >
                Album
              </Radio.Button>
            </Radio.Group>
            <Input 
              onChange={handleTermChange} 
              placeholder={
                radioValue === 'artist'
                  ? 'Search by Artist'
                  : 'Search by Album'
              }
              onPressEnter={() => {
                setInputError('');
                setMasters([]);
                setArtist([]);
                handleSearch(searchTerm)
              }}
            />
            <Button 
              type="primary" 
              loading={isLoading}
              onClick={() => {
                setInputError('');
                setMasters([]);
                setArtist([]);
                handleSearch(searchTerm)
              }}
            >
              Search
            </Button>
            {inputError && <p className="error">{inputError}</p>}
            {radioValue === 'artist'
                ? <>
                    {artist.title &&
                      <>
                        <Artists artist={artist} onAdd={addToCollection} />
                      </>
                    }
                  </>
                : <Albums 
                    albums={masters} 
                    onAdd={addToCollection} 
                    isLoading={isLoading}
                    term={searchTerm}
                  />
              }
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
