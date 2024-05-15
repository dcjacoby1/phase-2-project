import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import Home from "./components/Home";
import History from "./components/History.jsx";
import Rules from "./components/Rules.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/rules",
        element: <Rules />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
