import React, { Component } from "react";
import "../App.css"

export default class NewsItem extends Component {
  render() {
    let {title,disc,imageUrl,newsUrl} = this.props
    return (
      <div>
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="text-truncate ">{title}</h5>
            <p className="text-truncate">
              {disc}
            </p>
            <a href={newsUrl} className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
