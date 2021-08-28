import Link from "next/link";
import Router from "next/router";
import React, { useEffect } from "react";
import { isAuth, SignOut } from "../actions/user";
import NProgress from "nprogress";

if (typeof window !== "undefined") {
  NProgress.configure({ showSpinner: true });

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
}

const Header = () => {
  useEffect(() => {
    const toggleButton = document.getElementsByClassName("toggle-button")[0];
    const navbarLinks = document.getElementsByClassName("navbar-links")[0];

    toggleButton.addEventListener("click", () => {
      navbarLinks.classList.toggle("active");
    });
  });

  return (
    <body>
      <nav className="navbar">
        <div className="brand-title">CodeXJD</div>
        <a href="#" className="toggle-button">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className="navbar-links">
          <ul>
            {isAuth() && (
              <React.Fragment>
                <li>
                  <Link href="/createblog">
                    <a>Create Blog</a>
                  </Link>
                </li>
              </React.Fragment>
            )}
            <li>
              <Link href="/blogs/Allblogs">
                <a>Blogs</a>
              </Link>
            </li>
            {!isAuth() && (
              <React.Fragment>
                <li>
                  <Link href="/user/signin">
                    <a>SignIn</a>
                  </Link>
                </li>

                <li>
                  <Link href="/user/signup">
                    <a>SignUp</a>
                  </Link>
                </li>
              </React.Fragment>
            )}
            {isAuth() && (
              <li>
                <div
                  onClick={() => SignOut(() => Router.replace("/user/signin"))}
                >
                  <a>SignOut</a>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </body>
  );
};

export default Header;
