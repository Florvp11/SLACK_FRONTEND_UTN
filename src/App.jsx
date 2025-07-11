import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginScreen from './Screens/LoginScreen/LoginScreen';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
import AuthProtectRoute from './components/AuthProtectRoute/AuthProtectRoute';
import WorkspaceDetailScreen from './Screens/WorkspaceDetailScreen/WorkspaceDetailScreen';
import NewWorkspaceScreen from './Screens/NewWorkspaceScreen/NewWorkspaceScreen';
import "./style.css"



function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
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
