import { useState } from 'react';
import AdvertsPage from './pages/adverts/AdvertsPage';
import LoginPage from './pages/auth/LoginPage';
import NewAdvertPageForm from './pages/adverts/NewAdvertPage';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdvertPage from './pages/adverts/AdvertPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/*Ruta con la parte comun de todas las que comienzan por /advert*/}
      <Route
        path="/adverts"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<AdvertsPage />} />
        <Route path= ":advertId" element= { < AdvertPage />} /> 
        {/*<Route path= "new" element= { < NewAdvertPage />} />*/}
      </Route>

      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/404" element={<div>404 | Not Found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
