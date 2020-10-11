import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Pagination } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import Discogs from '../../utils/DiscogsAPI';

import './Releases.css';

function Releases({ artistsUrl }) {
  const [releases, setReleases] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState('');
  const releasesUrl = artistsUrl + `/releases?sort=year&sort_order=asc&page=${page}`;


  useEffect(() => {
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
  }, [releasesUrl]);

  function showTotal(total, range) {
    return `${range[0]}-${range[1]} of ${total} items`
  }

  function handlePage(page) {
    console.log(page);
    setPage(page);
  }

  return (
    <div>
      {isLoading && <SyncOutlined spin />}
      {inputError && <p className="error">{inputError}</p>}
      <Row gutter={16}>
          {releases.map(release => {
            return (
              <Col span={8}>
                <Card
                  cover={<img alt="example" src={release.img} />}
                  style={{ width: "100%", margin: "10px" }}
                >
                  <p className="title">{release.title}</p>
                  <p className="title">Year: {release.year}</p>
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
