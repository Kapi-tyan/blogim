import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Layout, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import noPhotos from '../../assets/img/avatar-male-president-svgrepo-com.svg';
import { signOut } from '../../store/slices/authSlice';
import { fetchUserOnLoad } from '../../store/slices/editProfileSlice';

import style from './header.module.scss';

const Header = () => {
  const { Header } = Layout;
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [userImage, setUserImage] = useState(noPhotos);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      dispatch(fetchUserOnLoad());
    }
  }, [dispatch]);
  useEffect(() => {
    if (user?.image) {
      setUserImage(user.image);
    } else {
      setUserImage(noPhotos);
    }
  }, [user]);
  const onOut = () => {
    dispatch(signOut());
  };
  const handleError = () => {
    setUserImage(noPhotos);
  };

  return (
    <Flex gap="middle" wrap>
      <Layout className={style.layout}>
        <Header className={style.header}>
          <Link to={'/'} className={style.header}>
            BloG
          </Link>
          {isAuthenticated ? (
            <div className={style.wrapperLogHeader}>
              <Button className={style.headerButtonCreateArticle}>
                <Link to={'/new-article'}>Create Article</Link>
              </Button>
              <div className={style.userName}>
                <Link to={'/profile'} className={style.userName}>
                  {user?.username}
                </Link>
              </div>
              <div className={style.avatar}>
                <Link to={'/profile'}>
                  <img onError={handleError} src={userImage} alt={`image ${user?.image}`} className={style.avatarImg} />
                </Link>
              </div>
              <Button onClick={onOut} className={style.headerButtonLogOut}>
                <Link to={'/'}>Log Out</Link>
              </Button>
            </div>
          ) : (
            <>
              <Button type="text" className={style.headerButtonSignIn}>
                <Link to={'/sign-in'}>Sign in</Link>
              </Button>
              <Button className={style.headerButtonSignUp}>
                <Link to={'/sign-up'}>Sign up</Link>
              </Button>
            </>
          )}
        </Header>
      </Layout>
    </Flex>
  );
};

export default Header;
