import React from 'react';

import AuthArticle from '../../components/authArticle/authArticle';

import style from './editArticle.module.scss';

const editArticle = () => {
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.headerEditArticle}>Edit article</div>
        <AuthArticle />
      </div>
    </>
  );
};

export default editArticle;
