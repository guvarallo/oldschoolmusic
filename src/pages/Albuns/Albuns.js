import React from 'react';
import { Row, Col, Card } from 'antd';

import './Albuns.css';

function Albuns({ albuns }) {
  return (
    <>
      {albuns.length &&
        <Row gutter={16}>
            {albuns.map(album => {
              return (
                <Col span={8}>
                  <Card
                    hoverable
                    cover={<img alt="example" src={album.thumb} />}
                    style={{ width: "100%", margin: "10px" }}
                  >
                    <p className="title">{album.title}</p>
                  </Card>
                </Col>
              )
            })}
        </Row>
      }
    </>
  )
}

export default Albuns;