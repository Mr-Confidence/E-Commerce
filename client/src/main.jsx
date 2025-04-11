import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Outlet, ScrollRestoration } from 'react-router'
import Layout from './ui/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Product from './pages/Product'
import Category from './pages/Category'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Favorite from './pages/Favorite'
import Profile from './pages/Profile'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import NotFound from './pages/NotFound'


const RouterLayout = () => {
  return (
    <Layout>
      <ScrollRestoration />
      <Outlet />
    </Layout>
  )
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <RouterLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/product',
        element: <Product />,
      },
      {
        path: '/product/:id',
        element: <Product />,
      },
      {
        path: '/category',
        element: <Category />,
      },
      {
        path: '/category/:id',
        element: <Category />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/favorite',
        element: <Favorite />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/success',
        element: <Success />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: '/cancel',
        element: <Cancel />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
 <RouterProvider router={router} />
)
 