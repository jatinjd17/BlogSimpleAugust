import React from "react";
import { fetchSpecificUser } from "../../actions/user";
import Header from "../../components/header";

const Name = ({ user }) => {
  console.log(user);
  return (
    <React.Fragment>
      <Header />
      {user.email}
    </React.Fragment>
  );
};

Name.getInitialProps = ({ query }) => {
  return fetchSpecificUser(query.name).then((data) => {
    if (!data) {
      return false;
    } else {
      return { user: data };
    }
  });
};

export default Name;
