import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./App/Store.js";
import { Loading1 } from "./Components/Components.js";

const Home = lazy(() => import('./Pages/Home.jsx'));
const UploadPost = lazy(() => import('./Pages/UploadPost.jsx'));
const User = lazy(() => import('./Pages/User.jsx'));
const EditProfileDetail = lazy(() => import('./Pages/EditProfileDetail.jsx'));
const EditProfilePhoto = lazy(() => import('./Pages/EditProfilePhoto.jsx'));
const Followed = lazy(() => import('./Pages/Followed.jsx'));
const PostDisplay = lazy(() => import('./Pages/PostDisplay.jsx'));
const OtherUserProfile = lazy(() => import('./Pages/OtherUserProfile.jsx'));
const EditPost = lazy(() => import('./Pages/EditPost.jsx'));

const renderWithSuspense = (node) => (
  <Suspense fallback={<Loading1 />}>{node}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: renderWithSuspense(<Home />),
      },
      {
        path: "/upload-post",
        element: renderWithSuspense(<UploadPost />),
      },
      {
        path: "/user",
        element: renderWithSuspense(<User />),
      },
      {
        path: "/edit-profile-detail",
        element: renderWithSuspense(<EditProfileDetail />),
      },
      {
        path: "/edit-profile-photo",
        element: renderWithSuspense(<EditProfilePhoto />),
      },
      {
        path: "/followed",
        element: renderWithSuspense(<Followed />),
      },
      {
        path: "/post-display/:id",
        element: renderWithSuspense(<PostDisplay />),
      },
      {
        path: "/profile/:username",
        element: renderWithSuspense(<OtherUserProfile />),
      },
      {
        path: "/edit-post/:postId",
        element: renderWithSuspense(<EditPost />),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
