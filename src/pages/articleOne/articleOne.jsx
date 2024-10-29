import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { Spin, Button, Popconfirm, message } from 'antd';
import ReactMarkdown from 'react-markdown';

import { useGetArticleBySlugQuery, useDeleteArticleMutation } from '../../store/slices/articlesSlice';
import noPhotos from '../../assets/img/avatar-male-president-svgrepo-com.svg';

import style from './articleOne.module.scss';

const ArticleOne = () => {
  const { slug } = useParams();
  const { data, isLoading, refetch } = useGetArticleBySlugQuery(slug);
  const user = useSelector((state) => state.auth.user);
  const [deleteArticle] = useDeleteArticleMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const handleConfirm = () => {
    deleteArticle(slug)
      .unwrap()
      .then(() => {
        success();
      });
  };
  useEffect(() => {
    refetch();
  }, [refetch]);
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Successfully removed',
    });
  };
  if (isLoading) {
    return (
      <div className="wrapper-spin">
        <Spin size="large" />
      </div>
    );
  }

  if (!data) {
    return <div>Статья не найдена</div>;
  }
  const isAuthor = user?.username === data.article.author.username;
  const isFavorited = data.article.favorited ? true : false;
  return (
    <>
      {contextHolder}
      <div className={style.container} key={data.article.slug}>
        <div className={style.articleText}>
          <ReactMarkdown>{data.article.body}</ReactMarkdown>
        </div>
        <div className={style.tag}>
          {data.article.tagList.map((tag) => (
            <div key={tag} className={style.tagItem}>
              #{tag}
            </div>
          ))}
        </div>
        <div className={style.description}>{data.article.description}</div>
        <div className={`${style.like} ${isFavorited ? style.liked : ''}`}>{data.article.favoritesCount}</div>
        <div className={style.userName}>{data.article.author.username}</div>
        <div className={style.date}>{format(new Date(data.article.createdAt), 'MMMM d, yyyy', { locale: enUS })}</div>
        <div className={style.avatar}>
          <img
            src={data.article.author.image || noPhotos}
            alt={`image ${data.article.author.username}`}
            className={style.avatarImg}
          />
        </div>
        <div className={style.title}>{data.article.title}</div>
        {isAuthor && (
          <div className={style.wrapperButton}>
            <Popconfirm
              placement="rightTop"
              onConfirm={handleConfirm}
              description="Are you sure to delete this article?"
              okText="Yes"
              cancelText="No"
            >
              <Button danger className={style.buttonDelete}>
                Delete
              </Button>
            </Popconfirm>
            <Link to={`/article/${data.article.slug}/edit`}>
              <Button className={style.buttonEdit}> Edit </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ArticleOne;
