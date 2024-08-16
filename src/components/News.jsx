import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "us",
    category: "general",
    pageSize: 6,
  };
  static propType = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      nextDisable: false,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}  News App`;
    // console.log(this.state.page)
  }

  async updateNews() {
    let url = "";
    this.props.setProgress(10);
    if (this.props.source === "techcrunch") {
      url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.props.apiKey}`;
    } else if (this.props.source === "apple") {
      url = `https://newsapi.org/v2/everything?q=apple&from=2024-08-13&to=2024-08-13&sortBy=popularity&apiKey=${this.props.apiKey}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    }
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=56e1d34c21a145649f563b048290ee6d&page=${this.state.page}&pageSize=${this.props.pageSize}`
    // this.setState({loading : true})
    // let data = await fetch(url)
    // let parseData = await data.json()
    // this.setState({articles:parseData.articles ,
    //   totalResults :parseData.totalResults,
    //   loading: false
    // })
    this.updateNews();
  }

  // handlePrev = async () => {
  //   // let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=56e1d34c21a145649f563b048290ee6d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
  //   // this.setState({loading : true})
  //   // let data = await fetch(url)
  //   // let parseData = await data.json()
  //   // this.setState(
  //   //   {
  //   //     page : this.state.page - 1,
  //   //     articles:parseData.articles,
  //   //     nextDisable:false,
  //   //     loading:false,
  //   //   })
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updateNews();
  // };

  // handleNext = async () => {
  //   if (
  //     !(
  //       this.state.page + 1 >
  //       Math.ceil(this.state.totalResults / this.props.pageSize)
  //     )
  //   ) {
  //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=56e1d34c21a145649f563b048290ee6d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
  //     // this.setState({loading : true})
  //     // let data = await fetch(url)
  //     // let parseData = await data.json()
  //     // this.setState(
  //     //   {
  //     //     page :this.state.page + 1 ,
  //     //     articles:parseData.articles,
  //     //     loading:false,

  //     //   })
  //     this.setState({
  //       page: this.state.page + 1,
  //     });
  //     this.updateNews();
  //   }
  // };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = "";
    if (this.props.source === "techcrunch") {
      url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.props.apiKey}`;
    } else if (this.props.source === "apple") {
      url = `https://newsapi.org/v2/everything?q=apple&from=2024-08-13&to=2024-08-13&sortBy=popularity&apiKey=${this.props.apiKey}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    }
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
    });
  };

  render() {
    return (
      <div>
        <div className=" my-3">
          <h1 className="text-center" style={{ margin: "35px 0px" }}>
            Top {this.capitalizeFirstLetter(this.props.category)} Headline
          </h1>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row m-3 ">
                {this.state.articles.map((elements, index) => {
                  return (
                    <div
                      key={`${elements.url}-${index}`}
                      className="col-md-4 mb-3"
                    >
                      <NewsItem
                        title={elements.title}
                        disc={elements.description}
                        imageUrl={
                          elements.urlToImage
                            ? elements.urlToImage
                            : `https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg`
                        }
                        author={elements.author}
                        publishedAt={elements.publishedAt}
                        source={elements.source.name}
                        newsUrl={elements.url}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark "
            onClick={this.handlePrev}
          >
            {" "}
            &lt; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNext}
          >
            Next &gt;
          </button>
        </div> */}
      </div>
    );
  }
}
