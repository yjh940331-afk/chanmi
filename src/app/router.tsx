import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';

const HomePage = lazy(() => import('../pages/HomePage'));
const MediaPage = lazy(() => import('../pages/MediaPage'));
const VideosPage = lazy(() => import('../pages/VideosPage'));
const FanPage = lazy(() => import('../pages/FanPage'));
const AdsPage = lazy(() => import('../pages/AdsPage'));
const AdminPage = lazy(() => import('../pages/AdminPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'media', element: <MediaPage /> },
      { path: 'videos', element: <VideosPage /> },
      { path: 'fan', element: <FanPage /> },
      { path: 'ads', element: <AdsPage /> },
      { path: 'admin', element: <AdminPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
