import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../_actions";
import { history } from "../_helpers";
import _ from "underscore";

function Articles() {
  const user = useSelector((state) => state.authentication.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAllArticles("all"));
    dispatch(userActions.getTags());
  }, []);

  const allArticles = useSelector((state) => state.articles.articles);
  const tags = useSelector((state) => state.tags.tags);

  function onTitleClick(slug) {
    history.push("/articles/" + slug);
  }

  function onNavigation(type) {
    const el = document.getElementById(type);
    if (type === "myArticles") {
      if (!el.classList.contains("active")) {
        document.getElementById("allArticles").classList.remove("active");
        document.getElementById("favArticles").classList.remove("active");
        el.classList.add("active");

        dispatch(userActions.getAllArticles("my"));
      }
    } else if (type === "allArticles") {
      if (!el.classList.contains("active")) {
        document.getElementById("myArticles").classList.remove("active");
        document.getElementById("favArticles").classList.remove("active");
        el.classList.add("active");

        dispatch(userActions.getAllArticles("all"));
      }
    } else {
      if (!el.classList.contains("active")) {
        document.getElementById("myArticles").classList.remove("active");
        document.getElementById("allArticles").classList.remove("active");
        el.classList.add("active");
        dispatch(userActions.getAllArticles("fav"));
      }
    }
  }

  function addArticle() {
    history.push("/newArticle");
  }

  function onTagSelected(e) {
    const tag = e.target.innerText;
    if (tag && !_.isUndefined(tag)) {
      dispatch(userActions.getArticlesByTag(tag));
    }
  }

  function onTagSearch() {
    const el = document.getElementById("tagSearch").value.trim();
    if (el && !_.isUndefined(el) && el !== "") {
      dispatch(userActions.getArticlesByTag(el));
    }
  }

  return (
    <div className="col-lg-12">
      <div className="row">
        <div className="col-8">
          <h1>Hi {user.username}!</h1>
          <p className="ml-4">
            <Link to="/login">Logout</Link>
          </p>
        </div>
        <div className="col-4">
          <button className="btn btn-info mt-2" onClick={() => addArticle()}>
            Add New Article
          </button>
        </div>
      </div>

      <nav className="navbar navbar-dark bg-dark justify-content-center">
        <ul className="navbar-nav ">
          <li className="nav-item active" id="allArticles">
            <a
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={() => onNavigation("allArticles")}
            >
              All Articles
            </a>
          </li>
          <li className="nav-item" id="myArticles">
            <a
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={() => onNavigation("myArticles")}
            >
              My Articles
            </a>
          </li>
          <li className="nav-item" id="favArticles">
            <a
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={() => onNavigation("favArticles")}
            >
              Favourite Articles
            </a>
          </li>
        </ul>
      </nav>
      <span>
        <h4 className="bg-warning text-dark">Popular Tags</h4>
      </span>
      <div>
        {tags && tags.length > 0 && (
          <div>
            {tags.map((tag) => (
              <span
                key={tag}
                className="badge badge-success ml-2"
                style={{ cursor: "pointer" }}
                onClick={(e) => onTagSelected(e)}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="row mt-2">
        <div className="col-8">
          {" "}
          <input
            type="text"
            className="form-control"
            placeholder="Enter tag to search related articles..."
            id="tagSearch"
          />
        </div>
        <div className="col-4">
          {" "}
          <button
            className="btn btn-sm btn-primary"
            onClick={() => onTagSearch()}
          >
            Search
          </button>
        </div>
      </div>

      {allArticles && allArticles.length > 0 && (
        <div>
          {allArticles.map((article) => (
            <div className="mt-4 h-100 border border-white" key={article.slug}>
              <div className=" row ml-2">
                <span className="badge badge-info mt-2">
                  {" " + article.author.username}
                </span>
              </div>
              <div className="ml-2">
                <h5>{new Date(article.createdAt).toLocaleDateString()}</h5>
              </div>
              <div className="ml-2">
                <h2
                  style={{ cursor: "pointer" }}
                  onClick={() => onTitleClick(article.slug)}
                >
                  {article.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { Articles };
