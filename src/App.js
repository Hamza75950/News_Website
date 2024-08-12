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
  return (
    <News
      key={category}
      pageSize={this.pageSize}
      country="us"
      category={category}
    />
  );
};

export default class App extends Component {
  pageSize = 9;
  render() {
    const router = createBrowserRouter([
      {
        path: "/",
        element: (
          <>
            <Navbar />{" "}
            <News
              key="general"
              pageSize={this.pageSize}
              country="us"
              category="general"
            />{" "}
          </>
        ),
      },
      {
        path: "/:category",
        element: (
          <>
            <Navbar /> <NewsWrapper />{" "}
          </>
        ),
      },
    ]);

    return (
      <div>
        <RouterProvider router={router} />
      </div>
    );
  }
}
