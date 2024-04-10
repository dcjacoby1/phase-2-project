import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './components/Home'
// import About from './components/About'
// import Contact from './components/Contact'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom"

const routes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/contact",
    element: <Contact />
  }
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider/>
    <App />
  <RouterProvider/>
  </React.StrictMode>,
)
