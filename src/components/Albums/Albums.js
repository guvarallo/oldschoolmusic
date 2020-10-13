import React, { useState } from 'react';
import { Pagination } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import Cards from '../Cards/Cards';

import './Albums.css';

function Albums({ albums, onAdd, isLoading, term }) {
  const [page, setPage] = useState(1);

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
        <Cards elements={albums} onAdd={onAdd} />
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
