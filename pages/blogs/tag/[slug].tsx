import React from "react";
import {
  getallblogsBySpecificCATID,
  getallblogsBySpecificTagID,
} from "../../../actions/blog";
import GetAllTagsAndCategories from "../../../components/allTagsandCategories";

import Card from "../../../components/cards";
import Header from "../../../components/header";
import GetOnlySelectedLightTagsAndCategories from "../../../components/onlyselectedtagcatLight";

const AllBlogsBySpecificTag = ({ blogs, query }) => {
  console.log(blogs);

  const getAllBlogsByTagId = (blogs) => {
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
        <div>
          <GetOnlySelectedLightTagsAndCategories onlyselectedId={query} />
        </div>
        <div>{getAllBlogsByTagId(blogs)}</div>
      </div>
    </React.Fragment>
  );
};

AllBlogsBySpecificTag.getInitialProps = ({ query }) => {
  return getallblogsBySpecificTagID(query.slug).then((data) => {
    if (!data) {
      return false;
    } else {
      return { blogs: data, query: query.slug };
    }
  });
};

export default AllBlogsBySpecificTag;
