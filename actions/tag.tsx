export const fetchAllTags = () => {
    return fetch(`http://localhost:5000/api/tag`, {
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