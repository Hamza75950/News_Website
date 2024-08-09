import "./App.css";
import React, { Component } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";



const NewsWrapper = () => {
  const { category } = useParams();
  return <News key={category} pageSize={6} country="us" category={category} />;
  
};

export default class App extends Component {
  c = "hamza";
  
  render() {

    const router = createBrowserRouter([
      {
        path: "/",
        element: <><Navbar /> <News key = "general" pageSize={6} country="us" category="general"/> </>,
      },
      {
        path: "/:category",
        element: <><Navbar /> <NewsWrapper/> </>,
      },
    ])
   

   
    return (
      <div>
         <RouterProvider router={router} />
      </div>
    );
  }
}
