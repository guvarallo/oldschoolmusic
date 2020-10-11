import React, { useState } from 'react';
import { Row, Col, Card, Pagination } from 'antd';

import './Albuns.css';

function Albuns({ albuns }) {
  const [page, setPage] = useState(1);

  function showTotal(total, range) {
    return `${range[0]}-${range[1]} of ${total} items`
  }

  function handlePage(page) {
    setPage(page);
  }

  return (
    <>
      {albuns &&
        <div>
          <Row gutter={16}>
              {albuns.map(album => {
                return (
                  <Col span={8}>
                    <Card
                      cover={<img alt="example" src={album.img} />}
                      style={{ width: "100%", margin: "10px" }}
                    >
                      <p className="title">{album.title}</p>
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
        </div>
      }
    </>
  )
}

export default Albuns;