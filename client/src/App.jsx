import React from "react";
import Layout from "./components/Layout/Layout";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
};

export default App;
