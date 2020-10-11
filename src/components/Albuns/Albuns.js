import React from 'react';
import { Row, Col, Card, Pagination } from 'antd';

import './Albuns.css';

function Albuns({ albuns }) {

  function showTotal(total) {
    return `Total ${total} items`
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
          />
        </div>
      }
    </>
  )
}

export default Albuns;