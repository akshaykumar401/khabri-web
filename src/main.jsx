import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./App/Store.js";

import Home from './Pages/Home.jsx';
import UploadPost from "./Pages/UploadPost.jsx";
import User from "./Pages/User.jsx";
import EditProfileDetail from "./Pages/EditProfileDetail.jsx";
import EditProfilePhoto from "./Pages/EditProfilePhoto.jsx";
import Followed from "./Pages/Followed.jsx";
import PostDisplay from "./Pages/PostDisplay.jsx";
import OtherUserProfile from "./Pages/OtherUserProfile.jsx";
import EditPost from "./Pages/EditPost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/upload-post",
        element: <UploadPost />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/edit-profile-detail",
        element: <EditProfileDetail />,
      },
      {
        path: "/edit-profile-photo",
        element: <EditProfilePhoto/>,
      },
      {
        path: "/followed",
        element: <Followed />,
      },
      {
        path: "/post-display/:id",
        element: <PostDisplay />,
      },
      {
        path: "/profile/:username",
        element: <OtherUserProfile />,
      },
      {
        path: "/edit-post/:postId",
        element: <EditPost />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App className={App} />
      </RouterProvider>
    </Provider>
  // </StrictMode>
)
