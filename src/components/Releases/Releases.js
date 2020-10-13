import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Pagination, Button } from 'antd';
import { SyncOutlined, PlusCircleOutlined } from '@ant-design/icons';

import Discogs from '../../utils/DiscogsAPI';

import './Releases.css';

function Releases({ artistsUrl, onAdd, artist }) {
  const [releases, setReleases] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState('');
  const releasesUrl = artistsUrl + `/releases?sort=year&sort_order=asc&page=${page}`;
  const url = 'https://www.discogs.com';

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
      <Row gutter={16}>
          {releases.map(release => {
            return (
              <Col key={release.id} span={8} className="releases">
                <Card
                  cover={
                    <>
                    <a href={`${url}/${release.type}/${release.id}`} target="blank">
                      <div className="container">
                        <img alt={release.title} src={release.img} className="image" />
                        <div className="middle">
                          <PlusCircleOutlined />
                          <div>Click for more info at DiscoGS</div>
                        </div>
                      </div>
                    </a>
                    </>
                  }
                >
                  <p className="title">{release.title}</p>
                  <p className="title">Year: {release.year}</p>
                  <Button type="primary" onClick={() => onAdd(release)}>
                    + Add to Collection
                  </Button>
                </Card>
              </Col>
            )
          })}
      </Row>
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
