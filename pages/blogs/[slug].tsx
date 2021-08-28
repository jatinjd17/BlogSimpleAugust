import Link from "next/link";
import React from "react";
import { fetchSpecificPost } from "../../actions/blog";
import renderHTML from "react-render-html";
import moment from "moment";
import Header from "../../components/header";

const SpecificBlog = ({ blog }) => {
  console.log(blog);

  return (
    <React.Fragment>
      <Header />
      <main>
        <article>
          <div className="container-fluid">
            <section>
              <div className="row" style={{ marginTop: "20px" }}>
                <img
                  src={`http://localhost:5000/api/blog/photo/${blog.slug}`}
                  alt={blog.title}
                  className="img img-fluid featured-image"
                />
              </div>
            </section>

            <section>
              <div className="container">
                <h1 className="display-2 pb-3 pt-3 text-center font-weight-bold">
                  {blog.title}
                </h1>
                <p className="lead mt-3 mark">
                  Written by{" "}
                  <Link href={`/profile/${blog.postedBy.name}`}>
                    <a>{blog.postedBy.name}</a>
                  </Link>{" "}
                  | Published {moment(blog.updatedAt).fromNow()}
                </p>

                <div className="pb-3">
                  {/* {showBlogCategories(blog)}
                                        {showBlogTags(blog)} */}
                  <br />
                  <br />
                </div>
              </div>
            </section>
          </div>

          <div className="container">
            <section>
              <div className="col-md-12 lead">
                {renderHTML(blog.body)}
                Cupidatat consequat veniam duis aliqua minim excepteur laboris
                magna ullamco commodo in. Cillum velit non elit velit duis. Qui
                proident Lorem commodo quis occaecat sint elit proident elit ex
                nisi. Adipisicing mollit nulla aute sit culpa. Mollit aliquip
                duis nisi in dolore irure id nulla adipisicing officia aute.
                Consectetur excepteur duis do eiusmod dolor laborum ea pariatur.
                Reprehenderit esse eu eiusmod tempor incididunt dolor sunt sint
                laborum fugiat occaecat id mollit ex. Culpa et in ut occaecat.
                Nostrud pariatur reprehenderit pariatur dolor mollit qui fugiat
                ex do pariatur fugiat officia. Tempor esse excepteur nisi
                excepteur est. Consectetur aliqua sit consequat sint elit
                laborum magna occaecat Lorem voluptate velit ut consectetur.
                Duis irure eiusmod sunt laborum Lorem dolor sunt Lorem ad.
                Veniam officia et officia quis fugiat quis sint eu tempor mollit
                esse aliqua Lorem. Eiusmod ullamco fugiat non ut eiusmod dolore
                deserunt fugiat adipisicing mollit. Sint aliqua elit duis veniam
                deserunt est. Anim aute exercitation nisi veniam magna laboris
                consequat elit non ut voluptate et. Tempor sint pariatur minim
                nostrud non deserunt consequat eiusmod. Non minim labore commodo
                voluptate. Consectetur amet nostrud dolore labore eiusmod
                voluptate veniam ipsum ad nostrud fugiat quis aliquip. Amet
                officia elit quis ad anim veniam ut magna veniam. Elit in
                deserunt laborum incididunt officia laborum mollit laborum. Quis
                amet ipsum voluptate id eu eiusmod ipsum proident dolor occaecat
                cupidatat minim laborum laboris. Veniam sit duis officia commodo
                pariatur voluptate cupidatat aliquip ad nulla fugiat velit ad
                id. Eiusmod reprehenderit anim dolore pariatur magna
                reprehenderit aliquip magna sit officia amet. Enim occaecat
                mollit deserunt occaecat ea sint non sunt. Ex anim enim tempor
                occaecat ut. Culpa culpa reprehenderit proident velit elit
                laborum qui minim ipsum officia do aliqua magna ea. Qui esse
                proident do esse fugiat incididunt ad labore anim irure et
                tempor minim. Ea cillum sint et laborum nulla do sint ex
                proident dolor voluptate. Sint dolore incididunt magna aute
                irure deserunt deserunt. Laboris non id aute velit incididunt
                amet qui ullamco minim. Aute commodo qui aliquip officia ea
                dolore consequat incididunt labore. Deserunt dolore do sit dolor
                esse sint nostrud. Eu velit excepteur consectetur adipisicing.
                Deserunt laboris incididunt non incididunt. Duis non velit irure
                sint irure tempor. Officia veniam non nisi id irure exercitation
                irure amet enim consequat cupidatat consectetur. Eiusmod aute
                fugiat quis labore culpa. Dolore veniam id nulla sint eu
                cupidatat sit cupidatat. Sint in deserunt id labore. Dolor
                exercitation do irure sit officia minim cillum sunt. Magna velit
                ipsum incididunt proident eu id adipisicing officia excepteur
                consectetur sint. Excepteur ad commodo mollit commodo. Anim
                magna deserunt velit ex reprehenderit pariatur ut anim mollit
                proident qui mollit. Ad quis anim ut anim excepteur Lorem id
                aliqua magna. Est occaecat occaecat qui do aute. Ut ea deserunt
                proident proident commodo sit ullamco deserunt. Magna sunt nulla
                ullamco exercitation laborum ex non. Labore mollit exercitation
                tempor amet proident id Lorem non aute veniam. Culpa proident
                amet aliquip consequat ad. Amet aliqua commodo dolor cupidatat
                sunt velit deserunt aliquip ullamco deserunt pariatur labore
                magna ex. Excepteur Lorem ea culpa proident elit elit voluptate
                deserunt. Sit id in do sint laboris.
              </div>
            </section>
          </div>

          <div className="container">
            <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
            <div className="row">{/* {showRelatedBlog()} */}</div>
          </div>

          <div className="container pt-5 pb-5">{/* {showComments()} */}</div>
        </article>
      </main>
    </React.Fragment>
  );
};

SpecificBlog.getInitialProps = ({ query }) => {
  return fetchSpecificPost(query.slug).then((data) => {
    if (!data) {
      return false;
    } else {
      return { blog: data };
    }
  });
};

export default SpecificBlog;
