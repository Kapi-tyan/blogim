import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { Link } from 'react-router-dom';
import { message } from 'antd';

import { useLikeArticleMutation, useDislikeArticleMutation } from '../../store/slices/authArticleSlice';
import noPhotos from '../../assets/img/avatar-male-president-svgrepo-com.svg';

import style from './article.module.scss';

const Article = ({ articles }) => {
  const [likedArticles, setLikedArticles] = useState({});
  const [likeArticle] = useLikeArticleMutation();
  const [dislikeArticle] = useDislikeArticleMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Sign in to like',
    });
  };

  useEffect(() => {
    const initialLikes = {};
    articles.forEach((article) => {
      initialLikes[article.slug] = article.favorited;
    });
    setLikedArticles(initialLikes);
  }, [articles]);

  const handleLikeToggle = (slug) => {
    const token = localStorage.getItem('token');
    if (!token) {
      error();
      return;
    }
    const isLiked = likedArticles[slug];

    setLikedArticles((prevLikedArticles) => ({
      ...prevLikedArticles,
      [slug]: !isLiked,
    }));

    if (isLiked) {
      dislikeArticle(slug)
        .unwrap()
        .then((res) => {
          return res;
        });
    } else {
      likeArticle(slug)
        .unwrap()
        .then((res) => {
          return res;
        });
    }
  };
  let idMin = 33;
  return (
    <>
      {contextHolder}
      {articles.map((article) => {
        const favoritesCount = likedArticles[article.slug] ? article.favoritesCount + 1 : article.favoritesCount;
        return (
          <div className={style.container} key={article.slug}>
            <div className={style.tag}>
              {article.tagList.map((tag) => (
                <div key={article.slug + tag + (idMin += 1)} className={style.tagItem}>
                  #{tag}
                </div>
              ))}
            </div>
            <div
              className={`${style.like} ${likedArticles[article.slug] ? style.liked : ''}`}
              onClick={() => handleLikeToggle(article.slug)}
            >
              {favoritesCount}
            </div>
            <div className={style.userName}>{article.author.username}</div>
            <div className={style.date}>{format(new Date(article.createdAt), 'MMMM d, yyyy', { locale: enUS })}</div>
            <div className={style.avatar}>
              <img
                src={article.author.image || noPhotos}
                alt={`image ${article.author.username}`}
                className={style.avatarImg}
              />
            </div>
            <div className={style.description}>{article.description}</div>
            <div className={style.title}>
              <Link to={`/articles/${article.slug}`} className={style.title}>
                {article.title}
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Article;
