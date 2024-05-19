import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import App from './App';
import SignUp from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';

const router = createBrowserRouter([
  {
     path:"/home",
     element:<App/>
  },
  {
    path:"/",
    element:<SignUp/>
  },
  {
    path:"/signin",
    element:<SignIn/>
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router = {router} />
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

