import Link from "next/link";
import Router from "next/router";
import React from "react";
import renderHTML from "react-render-html";
// import "../styles/style.module.scss";
// import './style.css';
// import '../dist/css/style.module.css';
// import styles from '../styles/style.module.scss';

export {};

const Card = (card) => {
  console.log(card);

  const singleCard = (card) => {
    const categories = () => {
      return card.card.categories.map((c, i) => {
        return (
          <div key={i} className="cardcategory">
            <button className="catbutton">{c.name}</button>
          </div>
        );
      });
    };

    const tags = () => {
      return card.card.tags.map((t, i) => {
        return (
          <div key={i} className="cardtitle">
            {"#"}
            {t.name}
          </div>
        );
      });
    };

    return (
      <body>
        <div
          className="wrapper"
          // onClick={Router.push(`/blogs/${card.card.slug}`)}
        >
          <Link href={`/blogs/${card.card.slug}`}>
            <div className="card">
              <div className="card-banner">
                <p className="category-tag popular">Popular</p>
                <img
                  className="banner-img"
                  src={`http://localhost:5000/api/blog/photo/${card.card.slug}`}
                  alt=""
                />
              </div>
              <div className="card-body">
                <p style={{ overflow: "hidden" }}>{categories()}</p>
                <p className="blog-hashtag">{tags()}</p>
                <h2 className="blog-title">{card.card.title}</h2>
                <p className="blog-description">
                  {renderHTML(card.card.excerpt)}
                </p>

                {/* <div className="card-profile">
                  <img
                    className="profile-img"
                    src="https://images.unsplash.com/photo-1554780336-390462301acf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                    alt=""
                  />
                  <div className="card-profile-info" />
                  <h3 className="profile-name">{card.card.postedBy.name}</h3>
                  <p className="profile-followers">1.2k followers</p>
                </div> */}
              </div>
            </div>
          </Link>
        </div>
      </body>
    );
  };

  return <React.Fragment>{singleCard(card)}</React.Fragment>;
};

export default Card;
