import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Pagination } from 'antd';

import './Artists.css';

function Artists() {
  const apiKey = 'xHkvirUsAkQKmuPtVhkNgQFyjUkQbbWFAhKwREnq';
  let { id } = useParams();
  let artistUrl = `https://api.discogs.com/artists/${id}`;
  let releasesUrl = artistUrl + '/releases?sort=year&sort_order=asc&page=2';
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
      .then(data => {
        console.log(data)
        setArtist({
          id: data.id,
          img: data.images[0].resource_url,
          name: data.name,
          members: data.members
        })
      });
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
      .then(data => {
        data.releases.map(release => {
          return setReleases(el => [...el, {
            id: release.id,
            img: release.thumb,
            title: release.title,
            year: release.year
          }])
        })
      });
    } catch (err) {
      console.log(err);
    }
  }, [artistUrl, releasesUrl]);

  function showTotal(total) {
    return `Total ${total} items`
  }

  return (
    <>
      {artist.name &&
        <div className="artist">
          <h1>{artist.name}</h1>
          {artist.members && 
            artist.members.map(member => {
            return <h2>{member.name}</h2>
          })}
        </div>
      }
      {/* {console.log(artist)} */}
      {releases.length &&
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
