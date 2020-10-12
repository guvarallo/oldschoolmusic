import React from 'react';
import { Col, Card, Button } from 'antd';

import './Collection.css'

function Collection({ collection, onRemove }) {
  return (
    <div id="collectionId">
      <h4>My Collection:</h4>
      {collection.map(el => {
        return (
          <Col span={8}>
            <Card
              cover={<img alt="example" src={el.img} />}
              style={{ width: "80%", marginBottom: "10px" }}
            >
              <p className="title">{el.title}</p>
              <Button size="small" onClick={() => onRemove(el)}>Remove</Button>
            </Card>
          </Col>
        )
      })}
    </div>
  ) 
}

export default Collection;
