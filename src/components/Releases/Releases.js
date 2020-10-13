import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import Discogs from '../../utils/DiscogsAPI';
import Cards from '../Cards/Cards';

import './Releases.css';

function Releases({ artistsUrl, onAdd, artist }) {
  const [releases, setReleases] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState('');
  const releasesUrl = artistsUrl + `/releases?sort=year&sort_order=asc&page=${page}`;

  // Fetch the releases only if there is a valid artist
  useEffect(() => {
    if (!Object.keys(artist).length) {
      return;
    } else {
      Discogs.releases(releasesUrl)
      .then(setIsLoading(true))
      .then(setReleases([]))
      .then(results => {
        setReleases([...results[0]]);
        setPagination(results[1]);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setInputError('Releases not found')
      });
    }
  }, [artist, artistsUrl, releasesUrl]);

  function showTotal(total, range) {
    return `${range[0]}-${range[1]} of ${total} items`
  }

  function handlePage(page) {
    setPage(page);
  }

  return (
    <div>
      {isLoading && <SyncOutlined spin />}
      {inputError && <p className="error">{inputError}</p>}
      <Cards elements={releases} onAdd={onAdd} />
      <Pagination 
        size="small" 
        total={pagination.items}
        showTotal={showTotal}
        defaultPageSize={50}
        current={page}
        onChange={handlePage}
      />
    </div>
  )
}

export default Releases;
