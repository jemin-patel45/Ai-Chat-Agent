/* import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from '../screens/Login';
import Register from '../screens/register';
import Home from '../screens/home';
import Project from '../screens/project';
import UserAuth from '../auth/UserAuth';

const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>

                    <Route path="/" element={<UserAuth><Home /></UserAuth>} />
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/project" element={<UserAuth><Project /></UserAuth>}></Route>

                </Routes>



            </BrowserRouter>
        </div>
    );
}

export default AppRoutes; */

import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from '../screens/Login';
import Register from '../screens/register';
import Home from '../screens/home';
import Project from '../screens/project';
import UserAuth from '../auth/UserAuth';
import First from '../screens/first'; 
import About from '../screens/about'; 


const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/home" element={<UserAuth><Home /></UserAuth>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/project" element={<UserAuth><Project /></UserAuth>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;




