import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  articles = [
    {
      "source": { "id": "cnn", "name": "CNN" },
      "author": "Joan Biskupic",
      "title": "Exclusive: Inside the Supreme Court’s negotiations and compromise on Idaho’s abortion ban - CNN",
      "description": "The Supreme Court began the year poised to build on its 2022 decision overturning Roe v. Wade and to deliver a new blow to abortion access.",
      "url": "https://www.cnn.com/2024/07/29/politics/supreme-court-idaho-abortion-emtala-biskupic/index.html",
      "urlToImage": "",
      "publishedAt": "2024-07-29T12:32:00Z",
      "content": "The Supreme Court began the year poised to build on its 2022 decision overturning Roe v. Wade and to deliver a new blow to abortion access.\r\nIn January, the court took the extraordinary step of letti… [+11077 chars]"
    },
    {
      "source": { "id": null, "name": "CNBC" },
      "author": "Jesse Pound",
      "title": "Stock futures rise ahead of major tech earnings reports set for later this week: Live updates - CNBC",
      "description": "Earnings from Apple and Microsoft and a Federal Reserve meeting are key events in the week ahead.",
      "url": "https://www.cnbc.com/2024/07/28/stock-futures-are-little-changed-ahead-of-loaded-week-for-tech-earnings.html",
      "urlToImage": "https://image.cnbcfm.com/api/v1/image/108011433-1721856730435-gettyimages-2163516206-migrant461209_fzgmkcol.jpeg?v=1721856896&w=1920&h=1080",
      "publishedAt": "2024-07-29T11:10:00Z",
      "content": "Stock futures rose Monday as Wall Street gears up for a busy week of corporate earnings.\r\nFutures tied to the Dow Jones Industrial Average climbed 153 points, or 0.4%. S&amp;P 500 futures gained 0.4%… [+1382 chars]"
    },

    {
      "source": { "id": "ars-technica", "name": "Ars Technica" },
      "author": "Kevin Purdy",
      "title": "Synology BeeStation review: A great way to start getting real about backups - Ars Technica",
      "description": "If you're not ready for full-on NAS gear, consider this clever little drive.",
      "url": "https://arstechnica.com/gadgets/2024/07/synology-beestation-review-a-great-way-to-start-getting-real-about-backups/",
      "urlToImage": "https://cdn.arstechnica.net/wp-content/uploads/2024/07/beestation_handout-760x380.jpg",
      "publishedAt": "2024-07-29T11:00:54Z",
      "content": "Enlarge/ In this handout image from Synology, a thoughtful worker uses BeeFiles on their MacBook and BeePhotos on their iPhone, always keeping their BeeStation close at hand. They might have importan… [+4508 chars]"
    },

    {
      "source": { "id": "cbs-news", "name": "CBS News" },
      "author": null,
      "title": "French police arrest ultra-left activist over pre-Olympics railway sabotage as new incident hits phone lines - CBS News",
      "description": "Police have arrested a far-left activist in connection with arson attacks that hit France's high-speed rail network hours before the Olympic opening ceremony.",
      "url": "https://www.cbsnews.com/news/paris-olympics-trains-sabotage-arrest-far-left-activist-phone-lines-telecommunications/",
      "urlToImage": "https://assets1.cbsnewsstatic.com/hub/i/r/2024/07/29/9ac08a65-e56f-4816-b024-ecb4f7400409/thumbnail/1200x630g8/e1a819c10244028524f507920c7823a5/france-rail-sabotage-2162884981.jpg?v=5501038cbc281520ff9fdc308faab7dc",
      "publishedAt": "2024-07-29T10:03:09Z",
      "content": "Your Privacy\r\nWe process your data to deliver content or advertisements and measure the delivery of such content or advertisements to extract insights about our website. We share this information wit… [+1677 chars]"
    }
  ]



  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      nextDisable: false,
    };
    // console.log(this.state.page)
  }



  
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=56e1d34c21a145649f563b048290ee6d&page=${this.state.page}&pageSize=20`
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({articles:parseData.articles , totalResults :parseData.totalResults})
  }
  
  handlePrev = async()=>{
    console.log("prev")
    console.log(this.state.page)
    let url =  `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=56e1d34c21a145649f563b048290ee6d&page=${this.state.page - 1}&pageSize=20`
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState(
      {
        page : this.state.page - 1,
        articles:parseData.articles,
        nextDisable:false
      })
  }

  handleNext = async ()=>{
    console.log("next")
    if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){
      this.setState({
        nextDisable:true,
      })
    }
    else{  
    console.log(this.state.page)
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=56e1d34c21a145649f563b048290ee6d&page=${this.state.page+1}&pageSize=20`
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState(
      {
        page :this.state.page + 1 ,
        articles:parseData.articles,

      })
    }
  }

  render() {

    return (
      <div>
        <div className="container my-3">
          <h2>News Top Headline</h2>
          <div  className="row mb-3 ">

            {this.state.articles.map((elements) => {
              
              return (
                <div key={elements.url} className="col-md-4 mb-3">
                  <NewsItem
                    title={elements.title}
                    disc={elements.description}
                    imageUrl={elements.urlToImage?elements.urlToImage:`https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg`}
                    newsUrl={elements.url}
                  />
                </div>
              );
            })}
          </div>
          </div>
          <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page<=1} className="btn btn-primary " onClick={this.handlePrev}> &lt; Previous</button>
          <button type="button" disabled={this.state.nextDisable} className="btn btn-primary" onClick={this.handleNext}>Next &gt;</button>
          </div>

        </div>
     


    );
  }
}
