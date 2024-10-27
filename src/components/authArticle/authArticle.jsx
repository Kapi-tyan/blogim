import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Form, Space, message } from 'antd';
import { useParams, useLocation } from 'react-router-dom';

import { usePostAuthArticleMutation, useEditArticleMutation } from '../../store/slices/authArticleSlice';
import { useGetArticleBySlugQuery } from '../../store/slices/articlesSlice';

import style from './authArticle.module.scss';

const AuthArticle = () => {
  const { slug } = useParams();
  const [postAuthArticle] = usePostAuthArticleMutation();
  const [editArticle] = useEditArticleMutation();
  const location = useLocation();
  const { data, isSuccess } = useGetArticleBySlugQuery(slug, { skip: !slug });
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tags: [],
    },
  });
  const [messageApi, contextHolder] = message.useMessage();
  const successPublished = () => {
    messageApi.open({
      type: 'success',
      content: 'Successfully published',
    });
  };
  const successEdit = () => {
    messageApi.open({
      type: 'success',
      content: 'Successfully changed',
    });
  };
  useEffect(() => {
    if (data && isSuccess) {
      setValue('title', data.article.title);
      setValue('description', data.article.description);
      setValue('body', data.article.body);
      setValue('tags', data.article.tagList || []);
    }
  }, [data, isSuccess, setValue]);
  const onSubmit = async (data) => {
    const currentPath = location.pathname;
    if (currentPath === '/new-article') {
      try {
        await postAuthArticle({
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: data.tags,
        }).unwrap();
        successPublished();
      } catch (error) {
        console.error(error);
      }
    } else if (currentPath === `/articles/${slug}/edit`) {
      try {
        await editArticle({
          slug,
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: data.tags,
        }).unwrap();
        successEdit();
      } catch (error) {
        console.error('Failed to article:', error);
      }
    }
  };
  return (
    <>
      {contextHolder}
      <div className={style.wrapperForm}>
        <Form onFinish={handleSubmit(onSubmit)}>
          <Form.Item>
            <label>Title</label>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Title"
                  className={`${style.input} ${errors.title ? style.errorInput : ''}`}
                />
              )}
            />
            {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
          </Form.Item>
          <Form.Item>
            <label>Short description</label>
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Short description is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Short description"
                  className={`${style.input} ${errors.description ? style.errorInput : ''}`}
                />
              )}
            />
            {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}
          </Form.Item>

          <Form.Item>
            <label>Text</label>
            <Controller
              name="body"
              control={control}
              rules={{ required: 'Text is required' }}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  placeholder="Text"
                  rows={4}
                  className={`${style.input} ${errors.body ? style.errorInput : ''}`}
                />
              )}
            />
            {errors.body && <p style={{ color: 'red' }}>{errors.body.message}</p>}
          </Form.Item>
          <Form.Item>
            <label>Tags</label>
            <Form.List name="tag">
              {(fields, { add, remove }) => (
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                  {fields.map(({ key, name }) => (
                    <Space key={key} align="start">
                      <Form.Item name={[name]} noStyle>
                        <Input value={getValues(`tags.${name}`)} placeholder="Tag" className={style.inputTag} />
                      </Form.Item>
                      <Button onClick={() => remove(name)} className={style.buttonDelete}>
                        Delete
                      </Button>
                    </Space>
                  ))}
                  <Space key="new-tag" align="start">
                    <Form.Item noStyle>
                      <Controller
                        name="newTag"
                        control={control}
                        render={({ field }) => <Input {...field} placeholder="Tag" className={style.inputTag} />}
                      />
                    </Form.Item>
                    <Button onClick={() => remove('new-tag')} className={style.buttonDelete}>
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        const newTag = getValues('newTag');
                        if (newTag) {
                          add(newTag);
                          setValue('tags', [...getValues('tags'), newTag]);
                          setValue('newTag', '');
                        }
                      }}
                      className={style.buttonAddTage}
                    >
                      Add Tag
                    </Button>
                  </Space>
                </div>
              )}
            </Form.List>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AuthArticle;
