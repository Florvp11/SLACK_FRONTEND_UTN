import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginScreen from './Screens/LoginScreen/LoginScreen';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
import AuthProtectRoute from './components/AuthProtectRoute/AuthProtectRoute';
import WorkspaceDetailScreen from './Screens/WorkspaceDetailScreen/WorkspaceDetailScreen';
import NewWorkspaceScreen from './Screens/NewWorkspaceScreen/NewWorkspaceScreen';
import "./style.css"
import EmailVerificationScreen from './Screens/EmailVerificationScreen/EmailVerificationScreen';
import MainScreen from './Screens/MainScreen/MainScreen';
import EmailVerificationSent from './Screens/EmailSent/EmailSent';



function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/emailSent" element={<EmailVerificationSent />} />
        <Route path='/verify-email' element={<EmailVerificationScreen />} />
        <Route element={<AuthProtectRoute />} >
          <Route path='/home' element={<HomeScreen />} />
          <Route
            path='/new'
            element={<NewWorkspaceScreen />}
          />
          <Route path='/workspaces/:workspace_id' element={<WorkspaceDetailScreen />} />
          <Route path='/workspaces/:workspace_id/channels/:channel_id' element={<WorkspaceDetailScreen />} />
        </Route>
      </Routes>
    </div>
  );
}



export default App;
