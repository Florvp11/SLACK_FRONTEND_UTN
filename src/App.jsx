import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginScreen from './Screens/LoginScreen/LoginScreen';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';



const App = () => {


  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginScreen />} />

        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </div>
  );
};

export default App;
