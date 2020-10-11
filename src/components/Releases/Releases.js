import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Pagination } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import Discogs from '../../utils/DiscogsAPI';

import './Releases.css';

function Releases({ releasesUrl }) {
  const [releases, setReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    Discogs.releases(releasesUrl)
    .then(setIsLoading(true))
    .then(results => {
      setReleases([...results]);
      setIsLoading(false);
    })
    .catch(err => {
      setIsLoading(false);
      setInputError('Releases not found')
    });
  }, [releasesUrl]);

  function showTotal(total) {
    return `Total ${total} items`
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
        total={releases.length} 
        showTotal={showTotal} 
      />
    </div>
  )
}

export default Releases;
