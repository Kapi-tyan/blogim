import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import store from './store/store.js';
import BlogPade from './pages/blogPage/blogPage.jsx';
import ArticleOne from './pages/articleOne/articleOne.jsx';
import SignIn from './pages/signIn/signIn.jsx';
import SignUp from './pages/signUp/signUp.jsx';
import Profile from './pages/profile/profile.jsx';
import PrivateRoute from './components/privateRoute/privateRoute.jsx';
import NewArticle from './pages/newArticle/newArticle.jsx';
import EditArticle from './pages/editArticle/editArticle.jsx';

const root = document.getElementById('root');
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <BlogPade />,
      },
      {
        path: 'articles/:slug',
        element: <ArticleOne />,
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'new-article',
        element: (
          <PrivateRoute>
            <NewArticle />
          </PrivateRoute>
        ),
      },
      {
        path: 'articles/:slug/edit',
        element: (
          <PrivateRoute>
            <EditArticle />
          </PrivateRoute>
        ),
      },
    ],
    errorElement: <div>Страница не найдена</div>,
  },
]);

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
