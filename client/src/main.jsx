import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./page/Home/Home.jsx";
import ProfileComp from "./components/Profile/ProfileComp.jsx";
import DashBoard from "./page/DashBoardPage/DashBoard.jsx";
import CreatePage from "./page/Post/CreatePage.jsx";
import ChatPage from "./page/chat/ChatPage.jsx";
import LoginPage from "./page/Auth/LoginPage.jsx";
import RegisterPage from "./page/Auth/RegisterPage.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import PrivateRoute from "./components/PrivateRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* Protected Route */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileComp />} />
        <Route path="/new" element={<CreatePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
