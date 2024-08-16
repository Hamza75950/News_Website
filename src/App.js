import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'

const NewsWrapper = (props) => {
  const { category } = useParams();

  return (
    <News
      setProgress = {props.setProgress}
      apiKey = {props.apiKey}
      key={category}
      source= {category}
      pageSize={props.pageSize}
      country="us"
      category={category}
    />
  );
};

export default class App extends Component {
  pageSize = 6;
  apiKey = process.env.REACT_APP_API_KEY
  state = {
    progress : 0
  }
  setProgress = (progress)=>{
    this.setState({
      progress: progress
    })
  }
  render() {
    // const router = createBrowserRouter([
      //   {
        //     path: "/",
    //     element: (

    //         <News
    //           key="general"
    //           pageSize={this.pageSize}
    //           country="us"
    //           category="general"
    //           source = " "
    //         />
    //     ),
    //   },
    //   {
    //     path: "/techcrunch",
    //     element: (
    //         <News
    //           category="techcrunch"
    //           key = "techcrunch"
    //           source = "techcrunch"
    //         />
    //     ),
    //   },
    //   {
    //     path: "/apple",
    //     element: (
    //         <News
    //           category="apple"
    //           key = "apple"
    //           source = "apple"
    //         />
    //     ),
    //   },
    //   {
    //     path: "/:category",
    //     element: (
    //         <NewsWrapper pageSize= {this.pageSize} />
    //     ),
    //   },
    // ]);

    return (
      <div>
        {/* <RouterProvider router={router} > */}
        {/* <Navbar /> */}
        <BrowserRouter>
          <Navbar/>

          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            
          />

          <Routes>
            <Route
              path="/"
              element={
                <News
                  apiKey = {this.apiKey}
                  setProgress = {this.setProgress}
                  key="general"
                  pageSize={this.pageSize}
                  country="us"
                  category="general"
                  source=" "
                />
              }
            />
            
            <Route
              path="/:category"
              element={<NewsWrapper pageSize={this.pageSize} apiKey = {this.apiKey} setProgress = {this.setProgress} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
