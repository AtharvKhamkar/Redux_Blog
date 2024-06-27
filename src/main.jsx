import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { store } from './app/store.js';
import Layout from './components/Layout.jsx';
import './index.css';
import PostEditForm from './store/features/posts/PostEditForm.jsx';
import PostForm from './store/features/posts/PostForm.jsx';
import SinglePost from './store/features/posts/SinglePost.jsx';
import { fetchUsers } from './store/features/users/Userslice.js';

store.dispatch(fetchUsers());

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: 'post',
        element: <PostForm />,
      },
      {
        path: 'post/:postId',
        element: <SinglePost />,
      },
      {
        path: 'post/edit/:postId',
        element: <PostEditForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
