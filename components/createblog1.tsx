import React, { useEffect, useState } from "react";

import { QuillFormats, QuillModules } from "../helpers/quill";
import dynamic from "next/dynamic";
import { getCookie } from "../actions/user";
import { fetchAllCategories } from "../actions/category";
import { fetchAllTags } from "../actions/tag";
import { createblog } from "../actions/blog";

require("react-quill/dist/quill.snow.css");

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateBlog1 = () => {
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [category, setCategory] = useState([]);
  const [tag, setTag] = useState([]);
  const [categoryChecked, setCategoryChecked] = useState([]);
  const [tagChecked, setTagChecked] = useState([]);
  const [body, setBody]: any = useState(blogFromLS());

  const token = getCookie("token");

  const [values, setValues]: any = useState({
    body: "",
    title: "",
    loading: false,
    error: "",
    success: false,
    formdata: "",
    photo: "",
    message: "",
  });

  const { title, loading, error, success, formdata, photo, message } = values;

  useEffect(() => {
    setValues({ ...values, formdata: new FormData() });
    initCategory();
    initTag();
    // console.log({ categoryChecked, tagChecked });
  }, []);

  const initCategory = () => {
    fetchAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setCategory(data);
      }
    });
  };

  const initTag = () => {
    fetchAllTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setTag(data);
      }
    });
  };

  //   const showCategories = () => {
  //     return (
  //       category &&
  //       category.map((c, i) => (
  //         <li key={i} className="list-unstyled">
  //           <input
  //             onChange={() => handleCategoryToggle(c._id)}
  //             type="checkbox"
  //             className="mr-2"
  //           ></input>
  //           <label className="form-check-label">{c.name}</label>
  //         </li>
  //       ))
  //     );
  //   };

  //   const showTags = () => {
  //     return (
  //       tag &&
  //       tag.map((t, i) => (
  //         <li key={i} className="list-unstyled">
  //           <input
  //             onChange={() => handleTagToggle(t._id)}
  //             type="checkbox"
  //             className="mr-2"
  //           ></input>
  //           <label className="form-check-label">{t.name}</label>
  //         </li>
  //       ))
  //     );
  //   };

  const ShowAllCategories = () => {
    return category.map((c, i) => {
      return (
        <div key={i} style={{ display: "inline", marginLeft: "6px" }}>
          <button
            onClick={() => handleCategoryToggle(c._id)}
            className={`btn btn${
              isToggleCategory(c._id) ? "-primary" : "-primary-outline"
            } mb-2`}
          >
            {c.name}
          </button>
        </div>
      );
    });
  };

  const ShowAllTags = () => {
    return tag.map((t, i) => {
      return (
        <div key={i} style={{ display: "inline", marginLeft: "6px" }}>
          <button
            onClick={() => handleTagToggle(t._id)}
            className={`btn btn${
              isToggleTag(t._id) ? "-primary" : "-primary-outline"
            } mb-2`}
          >
            {t.name}
          </button>
        </div>
      );
    });
  };

  const isToggleTag = (tagId) => {
    if (tagChecked.includes(tagId)) {
      return true;
    } else {
      return false;
    }
  };
  const isToggleCategory = (catId) => {
    if (categoryChecked.includes(catId)) {
      return true;
    } else {
      return false;
    }
  };

  const handleCategoryToggle = (catId) => {
    const all = [...categoryChecked];
    const checkedCateg = categoryChecked.indexOf(catId);

    if (checkedCateg === -1) {
      all.push(catId);
    } else {
      all.splice(checkedCateg, 1);
    }
    setCategoryChecked(all);
    formdata.set("categories", all);
  };

  const handlechange = (name) => (e) => {
    const values = name === "photo" ? e.target.files[0] : e.target.value;
    // setValues({ ...values, [name]: values });
    formdata.set(name, values);
  };

  const handleTagToggle = (tagId) => {
    const all = [...tagChecked];
    const checkedtag = tagChecked.indexOf(tagId);

    if (checkedtag === -1) {
      all.push(tagId);
    } else {
      all.splice(checkedtag, 1);
    }
    setTagChecked(all);
    formdata.set("tags", all);
  };

  const handleBody = (e) => {
    setBody(e);
    formdata.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true });
    // console.log(formdata.get("title"));
    createblog(formdata, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
        console.log(data.error);
      } else {
        setValues({
          ...values,
          body: "",
          title: "",
          error: "",
          loading: false,
          message: data.message,
        });
        // setCategory([]);
        // setTag([]);
        setBody("");
        setCategoryChecked([]);
        setCategoryChecked([]);
        console.log(data);
      }
    });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const createBlogForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handlechange("title")}
          />
        </div>
        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            onChange={handleBody}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-4">
          <div>
            <h5>Categories</h5>
            <hr />

            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {/* {showCategories()} */}
              {ShowAllCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {/* {showTags()} */}
              {ShowAllTags()}
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group pb-2">
            <h5>Featured image</h5>
            <hr />

            <small className="text-muted">Max size: 1mb</small>
            <br />
            <label className="btn btn-outline-info">
              Upload featured image
              <input
                onChange={handlechange("photo")}
                type="file"
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div>{createBlogForm()}</div>
        </div>
        <div>
          {showLoading()}
          {showMessage()}
          {showError()}
        </div>
      </div>
    </div>
  );
};

export default CreateBlog1;
