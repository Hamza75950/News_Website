import { Component } from "react";
import spinner from "../loading spinner.gif";

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img style={{ width: "300px", height: "200px" }} src={spinner} alt="" />
      </div>
    );
  }
}
