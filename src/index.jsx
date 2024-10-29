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
import { ROUTES } from './constants/routes.js';

const root = document.getElementById('root');
const router = createBrowserRouter([
  {
    path: ROUTES.BLOG_PAGE,
    element: <App />,
    children: [
      {
        index: true,
        element: <BlogPade />,
      },
      {
        path: ROUTES.ARTICLE_ONE,
        element: <ArticleOne />,
      },
      {
        path: ROUTES.SIGN_IN,
        element: <SignIn />,
      },
      {
        path: ROUTES.SIGN_UP,
        element: <SignUp />,
      },
      {
        path: ROUTES.PROFILE,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.NEW_ARTICLE,
        element: (
          <PrivateRoute>
            <NewArticle />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.EDIT_ARTICLE,
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
