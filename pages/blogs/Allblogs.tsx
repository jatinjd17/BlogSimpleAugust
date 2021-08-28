import React from "react";
import { getallblogs } from "../../actions/blog";
import GetAllTagsAndCategories from "../../components/allTagsandCategories";

import Card from "../../components/cards";
import Header from "../../components/header";

const AllBlogs = ({ blogs }) => {
  console.log(blogs);

  const getAllBlogsHome = (blogs) => {
    return blogs.map((b, i) => {
      return (
        <div key={i}>
          <Card card={b} />
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <div>
        <div>
          <Header />
        </div>
        <div style={{ marginTop: "10px" }}>
          <div>
            <GetAllTagsAndCategories />
          </div>
          <div>{getAllBlogsHome(blogs)}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

AllBlogs.getInitialProps = () => {
  return getallblogs().then((data) => {
    if (!data) {
      return false;
    } else {
      return { blogs: data };
    }
  });
};

export default AllBlogs;
