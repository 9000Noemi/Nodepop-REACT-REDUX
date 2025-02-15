import { useState } from 'react';
import AdvertsPage from './pages/adverts/AdvertsPage';
import LoginPage from './pages/auth/LoginPage';
import NewAdvertPage from './pages/adverts/NewAdvertPage';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdvertPage from './pages/adverts/AdvertPage';
import RequireAuth from './pages/auth/RequireAuth';
import NotFoundPage from './components/shared/NotFoundPage';

function App() {
  return (
    <Routes>
      {/*PUBLIC ROUTES*/}

      <Route path="/login" element={<LoginPage />} />

      {/*PRIVATE ROUTES*/}

      {/*Ruta con la parte comun de todas las que comienzan por /advert: index, advertId y new*/}
      <Route
        path="/adverts"
        element={
          <RequireAuth>
            <Layout>
              <Outlet />
            </Layout>
          </RequireAuth>
        }
      >
        <Route index element={<AdvertsPage />} />
        <Route path=":advertId" element={<AdvertPage />} />
        <Route path="new" element={<NewAdvertPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/404" element={<NotFoundPage/>} />
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
  );
}

export default App;
