import React from "react";
import IsAuth from "../../components/auth/isAuth";
import BlogCreate from "../../components/createBlog";
import CreateBlog1 from "../../components/createblog1";
import Header from "../../components/header";

const CreateBlog = () => {
  return (
    <React.Fragment>
      <IsAuth>
        <Header />
        {/* <BlogCreate /> */}
        <CreateBlog1 />
      </IsAuth>
    </React.Fragment>
  );
};

export default CreateBlog;
