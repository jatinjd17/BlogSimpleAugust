export const createblog = (formdata, token) => {
  return fetch("http://localhost:5000/api/blog", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  })
    .then((data) => {
      return data.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

export const allblogs = () => {
  return fetch(`http://167.99.138.67:1111/getallposts`, {
    method: "GET",
    headers: {
      Accept: "applicaion/json",
    },
  })
    .then((data) => {
      // console.log(data);
      return data.json();
    })
    .catch((err) => console.log(err));
};

export const getallblogs = () => {
  return fetch(`http://localhost:5000/api/blogs`, {
    method: "GET",
    headers: {
      Accept: "applicaion/json",
    },
  })
    .then((data) => {
      // console.log(data);
      return data.json();
    })
    .catch((err) => console.log(err));
};

export const getallblogsBySpecificCATID = (catId) => {
  return fetch(`http://localhost:5000/api/blog/category/${catId}`, {
    method: "GET",
    headers: {
      Accept: "applicaion/json",
    },
  })
    .then((data) => {
      // console.log(data);
      return data.json();
    })
    .catch((err) => console.log(err));
};

export const getallblogsBySpecificTagID = (tagId) => {
  return fetch(`http://localhost:5000/api/blog/tag/${tagId}`, {
    method: "GET",
    headers: {
      Accept: "applicaion/json",
    },
  })
    .then((data) => {
      // console.log(data);
      return data.json();
    })
    .catch((err) => console.log(err));
};

export const fetchSpecificPost = (slug) => {
  return fetch(`http://localhost:5000/api/blog/${slug}`, {
    method: "GET",
    headers: {
      Accept: "applicaion/json",
    },
  })
    .then((data) => {
      // console.log(data);
      return data.json();
    })
    .catch((err) => console.log(err));
};
