import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Card, Pagination } from 'antd';
import { LeftOutlined, SyncOutlined } from '@ant-design/icons';

import apiConfig from '../../apiKeys';
import './Artists.css';

function Artists() {
  let { id } = useParams();
  let artistUrl = `https://api.discogs.com/artists/${id}`;
  let releasesUrl = artistUrl + '/releases?sort=year&sort_order=asc&page=2';
  const key = apiConfig.apiKey;
  const [artist, setArtist] = useState({});
  const [releases, setReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //Artist fetch
    fetch(artistUrl, {
      headers: {
        Authorization: `Discogs token=${key}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setArtist({
        id: data.id,
        img: data.images[0].resource_url,
        name: data.name,
        members: data.members
      })
      setIsLoading(false);
    })
    .catch(err => console.log(err));

    //Releases fetch
    fetch(releasesUrl, {
      headers: {
        Authorization: `Discogs token=${key}`
      }
    })
    .then(res => res.json())
    .then(data => {
      data.releases.map(release => {
        return setReleases(el => [...el, {
          id: release.id,
          img: release.thumb,
          title: release.title,
          year: release.year
        }])
      })
    })
    .catch(err => console.log(err));
  }, [artistUrl, key, releasesUrl]);

  function showTotal(total) {
    return `Total ${total} items`
  }

  return (
    <>
      <header>
        <Link to="/" >
          <LeftOutlined />
          <p>Back</p>
        </Link>
      </header>
      <div>
        {isLoading &&
          <SyncOutlined spin />
        }
      </div>
      {artist.name &&
        <div className="artist">
          <h1>{artist.name}</h1>
          {artist.members && 
            artist.members.map(member => {
            return <h2>{member.name}</h2>
          })}
        </div>
      }
      {releases &&
        <>
          <Row gutter={16}>
              {releases.map(release => {
                return (
                  <Col span={8}>
                    <Card
                      hoverable
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
        </>
      }
    </>
  )
}

export default Artists;
