import React from 'react';

import AuthArticle from '../../components/authArticle/authArticle';

import style from './newArticle.module.scss';

const NewArticle = () => {
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.headerNewArticle}>Create new article</div>
        <AuthArticle />
      </div>
    </>
  );
};

export default NewArticle;
