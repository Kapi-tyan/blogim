import React from 'react';
import { Pagination } from 'antd';

import './PaginationItem.scss';

const PaginationItem = ({ currentPage, onPageChange, totalArticles, limit }) => {
  return (
    <div className="page-container">
      <Pagination current={currentPage} onChange={onPageChange} pageSize={limit} total={totalArticles} />
    </div>
  );
};

export default PaginationItem;
