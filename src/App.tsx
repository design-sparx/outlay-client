import React, {ReactNode} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {HomePage, LoginPage, RegisterPage, TestPage} from "./pages";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoutes><HomePage/></ProtectedRoutes>}/>
          <Route path="/test" element={<ProtectedRoutes><TestPage/></ProtectedRoutes>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export const ProtectedRoutes = ({children}: { children: ReactNode }): JSX.Element => {
  if (localStorage.getItem('outlay-user')) {
    return children as JSX.Element;
  } else {
    return <Navigate to="/login"/>
  }
}

export default App;
