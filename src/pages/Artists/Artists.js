import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card } from 'antd';

import './Artists.css';

function Artists() {
  const apiKey = 'xHkvirUsAkQKmuPtVhkNgQFyjUkQbbWFAhKwREnq';
  let { id } = useParams();
  let artistUrl = `https://api.discogs.com/artists/${id}`;
  let releasesUrl = artistUrl + '/releases?sort=year&sort_order=asc';
  const [artist, setArtist] = useState({});
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    try {
      fetch(artistUrl, {
        headers: {
          Authorization: `Discogs token=${apiKey}`
        }
      })
      .then(res => res.json())
      .then(data => setArtist(data));
    } catch (err) {
      console.log(err);
    }
    try {
      fetch(releasesUrl, {
        headers: {
          Authorization: `Discogs token=${apiKey}`
        }
      })
      .then(res => res.json())
      .then(data => setReleases(data.releases));
    } catch (err) {
      console.log(err);
    }
  }, [artistUrl, releasesUrl]);

  return (
    <>
      {artist.members &&
        <div className="artist">
          <h1>{artist.name}</h1>
          {artist.members.map(member => {
            return <h2>{member.name}</h2>
          })}
        </div>
      }
      {releases.length &&
        <Row gutter={16}>
            {releases.map(release => {
              return (
                <Col span={8}>
                  <Card
                    hoverable
                    cover={<img alt="example" src={release.thumb} />}
                    style={{ width: "100%", margin: "10px" }}
                  >
                    <p className="title">{release.title}</p>
                  </Card>
                </Col>
              )
            })}
        </Row>
      }
    </>
  )
}

export default Artists;
