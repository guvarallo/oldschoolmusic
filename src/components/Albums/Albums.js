import React, { useState } from 'react';
import { Row, Col, Card, Pagination, Button } from 'antd';
import { SyncOutlined, PlusCircleOutlined } from '@ant-design/icons';

import './Albums.css';

function Albums({ albums, onAdd, isLoading, term }) {
  const [page, setPage] = useState(1);
  const url = 'https://www.discogs.com';

  function showTotal(total, range) {
    return `${range[0]}-${range[1]} of ${total} items`
  }

  function handlePage(page) {
    setPage(page);
  }

  return (
    <div className="albums">
      {isLoading && <SyncOutlined spin />}
      {albums.length !== 0 && 
      <>
        <h4>{`These are the master albums we found for the term "${term}":`}</h4>
        <Row gutter={16}>
        {albums.map(album => {
          return (
            <Col key={album.id} span={8}>
              <Card
                cover={
                  <>
                  <a href={url + album.uri} target="blank" >
                    <div className="container">
                      <img alt={album.title} src={album.img} className="image" />
                      <div className="middle">
                        <PlusCircleOutlined />
                        <div>Click for more info at DiscoGS</div>
                      </div>
                    </div>
                  </a>
                  </>
                }
              >
                <p className="title">{album.title}</p>
                <Button type="primary" onClick={() => onAdd(album)}>
                  + Add to Collection
                </Button>
              </Card>
            </Col>
          )
        })}
        </Row>
        <Pagination 
          size="small" 
          total={albums.length}
          showTotal={showTotal}
          defaultPageSize={50}
          current={page}
          onChange={handlePage}
        />
      </>
      }
    </div>
  )
}

export default Albums;
