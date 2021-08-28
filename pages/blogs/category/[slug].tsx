import React from "react";
import { getallblogsBySpecificCATID } from "../../../actions/blog";
import GetAllTagsAndCategories from "../../../components/allTagsandCategories";

import Card from "../../../components/cards";
import Header from "../../../components/header";
import GetOnlySelectedLightTagsAndCategories from "../../../components/onlyselectedtagcatLight";

const AllBlogsBySpecificCat = ({ blogs, query }) => {
  //   console.log(blogs);
  console.log(query);

  const getAllBlogsByCatId = (blogs) => {
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
        <div>{getAllBlogsByCatId(blogs)}</div>
      </div>
    </React.Fragment>
  );
};

AllBlogsBySpecificCat.getInitialProps = ({ query }) => {
  return getallblogsBySpecificCATID(query.slug).then((data) => {
    if (!data) {
      return false;
    } else {
      return { blogs: data, query: query.slug };
    }
  });
};

export default AllBlogsBySpecificCat;
