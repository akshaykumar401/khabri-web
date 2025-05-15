import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './Pages/Home.jsx';
import UploadPost from "./Pages/UploadPost.jsx";
import User from "./Pages/User.jsx";
import EditProfileDetail from "./Pages/EditProfileDetail.jsx";
import EditProfilePhoto from "./Pages/EditProfilePhoto.jsx";
import Followed from "./Pages/Followed.jsx";
import PostDisplay from "./Pages/PostDisplay.jsx";
import OtherUserProfile from "./Pages/OtherUserProfile.jsx";

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
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App className={App} />
    </RouterProvider>
  </StrictMode>,
)
