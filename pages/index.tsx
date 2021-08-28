import Head from "next/head";
import Link from "next/link";
import React from "react";
import { allblogs } from "../actions/blog";
import Card from "../components/cards";
import Header from "../components/header";
// import styles from '../styles/Home.module.css'
// import styles from '../styles/style.module.scss'
import styles from "../dist/css/style.module.css";

const Home = ({ user }) => {
  console.log(user);
  const getAllBlogsByUser = (user) => {
    return user.map((b, i) => {
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
        {/* <div>{getAllBlogsByUser(user)}</div> */}
        sssssss
      </div>
    </React.Fragment>
  );
};

// Home.getInitialProps = () => {
//   // return allblogs().then((data) => {
//   //   console.log(data);
//   //   return {user: data}
//   // })

// }

Home.getInitialProps = () => {
  return allblogs().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { user: data.data };
    }
  });
};

export default Home;
