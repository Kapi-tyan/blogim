import React, { useState } from 'react';
import { Spin, Alert, Button, Input } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { usePostSignInMutation } from '../../store/slices/signInSlice';
import { signIn } from '../../store/slices/authSlice';

import style from './signIn.module.scss';

const SignIn = () => {
  const [postSignIn, { error, isLoading }] = usePostSignInMutation();
  const [hasError, setHasError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const errorAlert = (
    <div className={style.wrapperAlert}>
      <Alert message="Access error" description="Check the data you entered" type="error" showIcon />
    </div>
  );

  const onSubmit = async (data) => {
    try {
      const response = await postSignIn(data).unwrap();
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
      setRedirect(true);
    } catch (err) {
      setHasError(true);
    }
  };
  if (redirect) {
    return <Navigate to="/" />;
  }

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
    <div className={style.wrapperForm}>
      {hasError && errorAlert}
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div className={style.headerSignIn}>Sign In</div>
        <div className={style.wrapperInput}>
          <div className={style.formItem}>
            <label>Email</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Please input your email!',
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
            <label>Password</label>
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Please input your password!' }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Password"
                  className={`${style.input} ${errors.password ? style.errorInput : ''}`}
                />
              )}
            />
            {errors.password && <p className={`${style.error} ${style.errorText}`}>{errors.password.message}</p>}
          </div>
          <Button type="primary" htmlType="submit" className={style.submit}>
            Submit
          </Button>
        </div>
        <div className={style.footerSignIn}>
          Don’t have an account? <Link to={'/sign-up'}>Sign Up</Link>.
        </div>
      </form>
    </div>
  );
};

export default SignIn;
