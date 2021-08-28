import Router from "next/router";
import React, { useEffect, useState } from "react";
import { fetchAllCategories } from "../actions/category";
import { fetchAllTags } from "../actions/tag";

const GetAllTagsAndCategories = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllCategories();
    getAllTags();
  }, []);

  const getAllCategories = () => {
    fetchAllCategories().then((data) => {
      if (data) {
        setCategories(data);
      } else {
        return false;
      }
    });
  };

  const ShowAllCategories = () => {
    return categories.map((c, i) => {
      return (
        <div
          key={i}
          className="categories"
          style={{ display: "inline", marginLeft: "6px" }}
        >
          <button
            onClick={() => {
              Router.push(`/blogs/category/${c._id}`);
            }}
            className={`btn btn-primary mb-2`}
          >
            {c.name}
          </button>
        </div>
      );
    });
  };

  const ShowAllTags = () => {
    return tags.map((t, i) => {
      return (
        <div
          className="tags"
          key={i}
          style={{ display: "inline", marginLeft: "6px" }}
        >
          <button
            onClick={() => {
              Router.push(`/blogs/tag/${t._id}`);
            }}
            className={`btn btn-primary mb-2`}
          >
            {t.name}
          </button>
        </div>
      );
    });
  };

  const getAllTags = () => {
    fetchAllTags().then((data) => {
      if (data) {
        setTags(data);
      } else {
        return false;
      }
    });
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-md-10">
            <div style={{ display: "inline" }}>{ShowAllCategories()}</div>
          </div>
        </div>

        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-md-10">
            <div style={{ display: "inline" }}>{ShowAllTags()}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GetAllTagsAndCategories;
