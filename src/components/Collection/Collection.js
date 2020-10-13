import React from 'react';
import { Col, Card, Button } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';

import './Collection.css'

function Collection({ collection, onRemove }) {
  const url = 'https://www.discogs.com';

  return (
    <div id="collectionId">
      <h4>My Collection:</h4>
      {collection.map(el => {
        return (
          <Col key={el.id} span={4} className="elements collections">
            <Card
              cover={
                <>
                <a href={`${url}/${el.type}/${el.id}`} target="blank">
                  <div className="container">
                    <img alt={el.title} src={el.img} className="image collectionImg" />
                    <div className="middle">
                      <PlusCircleTwoTone />
                      <div style={{ 
                        color: "#1890ff", 
                        fontWeight: "bold" 
                      }}>
                        Click for more info at DiscoGS
                      </div>
                    </div>
                  </div>
                </a>
                </>
              }
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
