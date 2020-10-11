import React from 'react';
import { Row, Col, Card, Pagination } from 'antd';

import './Releases.css';

function Releases({ releases }) {

  function showTotal(total) {
    return `Total ${total} items`
  }

  return (
    <div>
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
