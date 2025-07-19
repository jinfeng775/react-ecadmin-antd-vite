import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "./components/Layout.jsx";
import { RouterConfig } from "./routes.jsx";


function App() {

  return (
    <MainLayout>
      <RouterConfig />
    </MainLayout>
  );
}

export default App;
