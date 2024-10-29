import React, { useState } from 'react';
import { Spin, Alert } from 'antd';

import { useGetArticlesQuery } from '../../store/slices/articlesSlice';
import PaginationItem from '../pagination/Pagination';
import Article from '../article/article';
import './articleList.scss';

const ArticleList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const { data, isLoading, error } = useGetArticlesQuery({ limit, offset: (currentPage - 1) * limit });
  if (isLoading) {
    return (
      <div className="wrapper-spin">
        <Spin size="large" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="wrapper-alert">
        <Alert message="Error" description="Error. Reload the page." type="error" showIcon />
      </div>
    );
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Article articles={data.articles} />
      <PaginationItem
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalArticles={data.articlesCount}
        limit={limit}
      />
    </>
  );
};

export default ArticleList;
