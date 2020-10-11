import React from 'react';
import { Row, Col, Card, Pagination } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import './Artists.css';

function Artists({ artist, releases, isLoading }) {

  function showTotal(total) {
    return `Total ${total} items`
  }

  return (
    <div className="artist">
      <h1>{artist.name}</h1>
      {artist.members && 
        artist.members.map(member => {
        return <h2>{member.name}</h2>
      })}
    {releases 
    ? <>
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
    : <>
      {isLoading &&
        <SyncOutlined spin />
      }
      </>
    }
  </div>
  )
}

export default Artists;
