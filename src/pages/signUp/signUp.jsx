import React, { useEffect, useState } from 'react';
import { Spin, Button, Input, Checkbox, Form, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { usePostSignUpMutation } from '../../store/slices/signUpSlice';

import style from './signUp.module.scss';

const SignUp = () => {
  const [postSignUp, { isLoading }] = usePostSignUpMutation();
  const [hasError, setHasError] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Successfully registered',
    });
  };
  useEffect(() => {
    if (hasError) {
      messageApi.open({
        type: 'error',
        content: 'Registration error, try again',
      });
      setHasError(false);
    }
  }, [hasError, messageApi]);
  const onSubmit = async (data) => {
    try {
      await postSignUp(data).unwrap();
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
  const password = watch('password');

  return (
    <>
      {contextHolder}
      <div className={style.wrapperForm}>
        <Form onFinish={handleSubmit(onSubmit)}>
          <div className={style.headerSignUp}>Create new account</div>
          <div className={style.wrapperInput}>
            <div className={style.formItem}>
              <Form.Item
                validateStatus={errors.username ? 'error' : ''}
                help={errors.username ? errors.username.message : null}
              >
                <label>Username</label>
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: 'Username is required',
                    minLength: { value: 3, message: 'Username must be at least 3 characters' },
                    maxLength: { value: 20, message: 'Username cannot exceed 20 characters' },
                  }}
                  render={({ field }) => <Input {...field} className={style.input} />}
                />
              </Form.Item>
            </div>
            <div className={style.formItem}>
              <Form.Item validateStatus={errors.email ? 'error' : ''} help={errors.email ? errors.email.message : null}>
                <label>Email</label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Enter a valid email address',
                    },
                  }}
                  render={({ field }) => <Input {...field} className={style.input} />}
                />
              </Form.Item>
            </div>
            <div className={style.formItem}>
              <Form.Item
                validateStatus={errors.password ? 'error' : ''}
                help={errors.password ? errors.password.message : null}
              >
                <label>Password</label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                    maxLength: { value: 40, message: 'Password cannot exceed 40 characters' },
                  }}
                  render={({ field }) => <Input.Password {...field} className={style.input} />}
                />
              </Form.Item>
            </div>
            <div className={style.formItem}>
              <Form.Item
                validateStatus={errors.repeatPassword ? 'error' : ''}
                help={errors.repeatPassword ? errors.repeatPassword.message : null}
              >
                <label>Repeat Password</label>
                <Controller
                  name="repeatPassword"
                  control={control}
                  rules={{
                    required: 'Please repeat your password',
                    validate: (value) => value === password || 'Passwords do not match',
                  }}
                  render={({ field }) => <Input.Password {...field} className={style.input} />}
                />
              </Form.Item>
            </div>
            <div className={style.formItem}>
              <Form.Item
                validateStatus={errors.agreement ? 'error' : ''}
                help={errors.agreement ? errors.agreement.message : null}
                className={style.agreement}
              >
                <Controller
                  name="agreement"
                  control={control}
                  rules={{ required: 'You must agree to the processing of your personal information' }}
                  render={({ field }) => (
                    <Checkbox {...field}>I agree to the processing of my personal information</Checkbox>
                  )}
                />
              </Form.Item>
            </div>
            <div className={style.formItem}>
              <Form.Item>
                <Button type="primary" htmlType="submit" className={style.submit}>
                  Submit
                </Button>
              </Form.Item>
            </div>
          </div>
          <div className={style.footerSignUp}>
            Already have an account? <Link to={'/sign-in'}>Sign In</Link>.
          </div>
        </Form>
      </div>
    </>
  );
};

export default SignUp;
