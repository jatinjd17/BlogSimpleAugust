import React from "react";
import { getallblogs } from "../actions/blog";
import GetAllTagsAndCategories from "../components/allTagsandCategories";
import Card from "../components/cards";
import Header from "../components/header";
import renderHTML from "react-render-html";

//<GetAllTagsAndCategories />
//{getAllBlogsHome(blogs)}
const SamplePage = ({ blogs }) => {
  //   console.log(blogs);

  const getAllBlogsHome = (blogs) => {
    return blogs.map((b, i) => {
      return (
        <div key={i}>
          {Card123(b)}
          {/* <Card card={b} /> */}
        </div>
      );
    });
  };

  const categories = (b) => {
    return b.categories.map((c, i) => {
      return (
        <div key={i} className="cardcategory">
          <button className="catbutton">{c.name}</button>
        </div>
      );
    });
  };

  const tags = (b) => {
    return b.tags.map((t, i) => {
      return (
        <div key={i} className="cardtitle">
          {"#"}
          {t.name}
        </div>
      );
    });
  };

  const Card123 = (b) => {
    // console.log(b.title);
    return (
      <React.Fragment>
        <div className="cards">
          <div className="card">
            <img
              className="card__image"
              src={`http://localhost:5000/api/blog/photo/${b.slug}`}
              alt=""
            />
            <div className="carddiv">{categories(b)}</div>
            <div className="carddiv">{tags(b)}</div>
            <div className="card__content">
              <div>
                <h3>{b.title}</h3>
              </div>
              <div style={{ maxHeight: "200px" }}>
                <p>{renderHTML(b.excerpt)}</p>
              </div>
            </div>

            <div className="card__info">
              <div>
                <i className="material-icons">thumb_up</i>310
              </div>
              <div>
                <a href="./" className="card__link">
                  View Article
                </a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div>
        <Header />
      </div>
      <div className="wrapper1">
        {/* <div className="nav2">NAVVV</div> */}
        <div className="sidebar1">SIddebar1</div>
        <div className="main1">
          <div
            style={{
              background: "#eee",
              textAlign: "start",
              paddingLeft: "8px",
            }}
          >
            Posts
          </div>
          {/* {Card123()} */}
          {getAllBlogsHome(blogs)}
        </div>
        <div className="sidebar2">
          <GetAllTagsAndCategories />
        </div>
      </div>
    </React.Fragment>
  );
};

SamplePage.getInitialProps = () => {
  return getallblogs().then((data) => {
    if (!data) {
      return false;
    } else {
      return { blogs: data };
    }
  });
};

export default SamplePage;
