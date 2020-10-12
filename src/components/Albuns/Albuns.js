import React, { useState } from 'react';
import { Row, Col, Card, Pagination, Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import './Albuns.css';

function Albuns({ albuns, onAdd, isLoading }) {
  const [page, setPage] = useState(1);

  function showTotal(total, range) {
    return `${range[0]}-${range[1]} of ${total} items`
  }

  function handlePage(page) {
    setPage(page);
  }

  return (
    <div className="albuns">
      {isLoading && <SyncOutlined spin />}
      {albuns.length !== 0 && 
      <>
        <h4>Check out the albuns we found for you:</h4>
        <Row gutter={16}>
        {albuns.map(album => {
          return (
            <Col span={8}>
              <Card
                cover={<img alt={album.title} src={album.img} />}
                style={{ width: "100%", margin: "10px" }}
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
          total={albuns.length}
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

export default Albuns;
