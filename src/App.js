import "./App.css";
import React, { Component } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";

const NewsWrapper = (props) => {
  const { category } = useParams();
  
  return (
    <News
      key={category}
      pageSize={props.pageSize}
      country="us"
      category={category}
    />
  );
};

export default class App extends Component {
  pageSize = 6;
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
              source = " "
            />{" "}
          </>
        ),
      },
      {
        path: "/techcrunch",
        element: (
          <>
            <Navbar /> <News
              category="techcrunch"
              key = "techcrunch"
              source = "techcrunch"
            />{" "}
          </>
        ),
      },
      {
        path: "/apple",
        element: (
          <>
            <Navbar /> <News
              category="apple"
              key = "apple"
              source = "apple"
            />{" "}
          </>
        ),
      },
      {
        path: "/:category",
        element: (
          <>
            <Navbar /> <NewsWrapper pageSize= {this.pageSize} />{" "}
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
