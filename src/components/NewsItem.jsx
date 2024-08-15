import React, { Component } from "react";
import "../App.css";

export default class NewsItem extends Component {
  render() {
    let { title, disc, imageUrl, newsUrl, author, publishedAt, source } =
      this.props;
    return (
      <div>
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span
              className="badge rounded-pill bg-danger"
              style={{ left: "90%", zIndex: "1" }}
            >
              {source}
            </span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="text-truncate ">{title}</h5>
            <p className="text-truncate">{disc}</p>
            <p className="text-muted mt-2">
              By: {!author ? "Unknown" : author}
            </p>
            <p className="text-muted mt-2">
              Published At:{new Date(publishedAt).toGMTString()}{" "}
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
