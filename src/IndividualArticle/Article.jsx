import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../_helpers";
import { userActions } from "../_actions";
import * as _ from "underscore";

function Article() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(userActions.getArticleBySlug(id));
    dispatch(userActions.getComments(id));
  }, []);

  const article = useSelector((state) => state.article.article);
  const comments = useSelector((state) => state.comments.comments);

  const user = useSelector((state) => state.authentication.user.user);

  function showButtons() {
    if (!_.isEmpty(article) && !_.isEmpty(user)) {
      if (user.username === article.author.username) {
        return true;
      }
      return false;
    }
  }

  function editArticle(slug) {
    history.push("/editArticle/" + slug);
  }

  function deleteArticle(slug) {
    dispatch(userActions.deleteArticle(slug));
  }

  function showCommentButtons(author, e) {
    if (!_.isEmpty(comments) && !_.isEmpty(user)) {
      if (user.username === author) {
        return true;
      }
      return false;
    }
  }

  function editComment(c, e) {
    document.getElementById("" + c.id).disabled = false;
    const el = document.getElementById("update" + c.id);
    el.style.cursor = "pointer";
  }

  function updateComment(id) {
    document.getElementById("" + id).disabled = true;
    document.getElementById("update" + id).style.cursor = "no-drop";
  }

  function addNewComment(slug) {
    dispatch(
      userActions.addComment(slug, document.getElementById("newComment").value)
    );
  }

  function deleteComment(id, slug) {
    dispatch(userActions.deleteComment(id, slug));
  }

  function makeFavourite(flag, slug) {
    dispatch(userActions.markUnmarkFavourite(flag, slug));
  }

  return (
    <div className="col-lg-8 offset-lg-2">
      <h1>Article</h1>
      <div>
        {!_.isEmpty(article) && (
          <div className="mt-4 h-100 border border-white">
            <div className=" row ml-2">
              <span className="badge badge-info mt-2">
                {" " + article.author.username}
              </span>
            </div>
            <div className="ml-2">
              <h5>{new Date(article.createdAt).toLocaleDateString()}</h5>
            </div>
            <div className="ml-2">
              <h2>{article.title}</h2>
            </div>
            <div className="ml-2 h-100">
              <h4
                className="text-justify pt-4"
                style={{ wordWrap: "break-word", borderTop: "1px solid gray" }}
              >
                {article.body}
              </h4>
            </div>
            {showButtons() && (
              <div className="row justify-content-center mb-4 mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => editArticle(article.slug)}
                >
                  Edit Article
                </button>
                <button
                  className="btn btn-danger ml-4"
                  onClick={() => deleteArticle(article.slug)}
                >
                  Delete Article
                </button>
              </div>
            )}

            {!article.favorited && (
              <button
                className="btn btn-sm btn-success"
                onClick={() => makeFavourite(true, article.slug)}
              >
                Mark Favourite
              </button>
            )}
            {article.favorited && (
              <button
                className="btn btn-sm btn-danger"
                onClick={() => makeFavourite(false, article.slug)}
              >
                Unfavourite
              </button>
            )}
          </div>
        )}
      </div>
      <div>
        <h3>Add Comment</h3>
        <textarea
          id={"newComment"}
          className="form-group form-control"
          name="comment"
        />
        <button
          className="btn btn-info"
          onClick={() => {
            addNewComment(article.slug);
          }}
        >
          Add Comment
        </button>
        {!_.isEmpty(comments) && (
          <div>
            <div>
              <h2 className="mt-4">Comments</h2>
              {comments.map((comment) => (
                <div
                  className=" ml-2 mt-4 h-100 border border-top border-primary"
                  key={comment.id}
                >
                  <div>
                    <span className="badge badge-info">
                      {comment.author.username}
                    </span>
                    <span className="ml-4">
                      <p className="">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </span>
                  </div>

                  <div>
                    <textarea
                      id={comment.id}
                      className="form-group form-control"
                      name="comment"
                      defaultValue={comment.body}
                      disabled={true}
                    />
                    {showCommentButtons(comment.author.username) && (
                      <div className="row justify-content-center mb-4 mt-4">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={(e) => editComment(comment, e)}
                        >
                          Edit
                        </button>
                        <button
                          id={"update" + comment.id}
                          className="btn btn-sm btn-primary ml-2"
                          style={{ cursor: "no-drop" }}
                          onClick={() => updateComment(comment.id)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-sm btn-danger ml-4"
                          onClick={() =>
                            deleteComment(comment.id, article.slug)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { Article };
