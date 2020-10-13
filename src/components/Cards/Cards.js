import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';

import './Cards.css';

function Cards({ elements, onAdd }) {
  const url = 'https://www.discogs.com';

  return (
    <div>
      <Row gutter={16}>
          {elements.map(element => {
            return (
              <Col key={element.id} span={4} className="elements">
                <Card
                  cover={
                    <>
                    <a href={`${url}/${element.type}/${element.id}`} target="blank">
                      <div className="container">
                        <img alt={element.title} src={element.img} className="image" />
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
                  <p className="title">{element.title}</p>
                  <p className="title">Year: {element.year}</p>
                  <Button type="primary" onClick={() => onAdd(element)}>
                    + Add to Collection
                  </Button>
                </Card>
              </Col>
            )
          })}
      </Row>
    </div>
  )
}

export default Cards;