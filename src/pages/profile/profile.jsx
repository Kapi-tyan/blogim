import React, { useState, useEffect } from 'react';
import { Spin, Alert, Button, Input, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { signIn } from '../../store/slices/authSlice';
import { usePostEditProfileMutation, fetchUserOnLoad } from '../../store/slices/editProfileSlice';

import style from './profile.module.scss';

const Profile = () => {
  const [postEditProfile, { error, isLoading }] = usePostEditProfileMutation();
  const [hasError, setHasError] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Saved successfully',
    });
  };
  const errorAlert = (
    <div className={style.wrapperAlert}>
      <Alert message="Access error" description="Check the data you entered" type="error" showIcon />
    </div>
  );
  useEffect(() => {
    dispatch(fetchUserOnLoad());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setValue('username', user.username);
      setValue('email', user.email);
      setValue('image', user.image);
    }
  }, [user, setValue]);
  const onSubmit = async (data) => {
    try {
      const response = await postEditProfile(data).unwrap();
      setHasError(false);
      localStorage.setItem('token', response.user.token);
      localStorage.setItem('username', response.user.username);
      dispatch(
        signIn({
          username: response.user.username,
          email: response.user.email,
          password: response.user.password,
          image: response.user.image,
        })
      );
      success();
    } catch (err) {
      setHasError(true);
    }
  };
  if (isLoading) {
    return (
      <div className="wrapper-spin">
        <Spin size="large" />
      </div>
    );
  }
  if (error) {
    return errorAlert;
  }
  return (
    <>
      {contextHolder}
      <div className={style.wrapperProfile}>
        {hasError && errorAlert}
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.headerEditProfile}>Edit Profile</div>
          <div className={style.wrapperInput}>
            <div className={style.formItem}>
              <label>Username</label>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: 'Username is required!',
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Username"
                    className={`${style.input} ${errors.username ? style.errorInput : ''}`}
                  />
                )}
              />
              {errors.username && <p className={`${style.error} ${style.errorText}`}>{errors.username.message}</p>}
            </div>

            <div className={style.formItem}>
              <label>Email</label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required!',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Invalid email address!',
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Email"
                    className={`${style.input} ${errors.email ? style.errorInput : ''}`}
                  />
                )}
              />
              {errors.email && <p className={`${style.error} ${style.errorText}`}>{errors.email.message}</p>}
            </div>

            <div className={style.formItem}>
              <label>New Password</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Password must not exceed 40 characters',
                  },
                }}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="New password"
                    className={`${style.input} ${errors.password ? style.errorInput : ''}`}
                  />
                )}
              />
              {errors.password && <p className={`${style.error} ${style.errorText}`}>{errors.password.message}</p>}
            </div>

            <div className={style.formItem}>
              <label>Avatar Image (URL)</label>
              <Controller
                name="image"
                control={control}
                rules={{
                  pattern: {
                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                    message: 'Invalid URL!',
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Avatar image"
                    className={`${style.input} ${errors.image ? style.errorInput : ''}`}
                  />
                )}
              />
              {errors.image && <p className={`${style.error} ${style.errorText}`}>{errors.image.message}</p>}
            </div>

            <Button type="primary" htmlType="submit" className={style.submit}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
