import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../_actions";
import _ from "underscore";

function NewArticle() {
  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined) {
      dispatch(userActions.getArticleBySlug(id));
    }
  }, []);

  const article = useSelector((state) => state.article.article);

  useEffect(() => {
    if (id !== undefined && !_.isUndefined(article) && !_.isEmpty(article)) {
      setInputs(() => ({
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      }));
    }
  }, []);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const { title, description, body, tagList } = inputs;
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (title && description && body) {
      let finalList = makeTagList(tagList);

      if (_.isUndefined(id)) {
        dispatch(userActions.addArticle(title, description, body, finalList));
      } else {
        dispatch(
          userActions.updateArticle(title, description, body, finalList, id)
        );
      }
    }
  }

  function makeTagList(str) {
    if (!_.isEmpty(str)) {
      let arr = str.trim();
      arr = arr.split(",");
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim();
      }
      arr = _.without(arr, "");
      arr = _.uniq(arr);
      return arr;
    }
    return [];
  }

  return (
    <div className="col-lg-8 offset-lg-2">
      <h2>Add new article</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !title ? " is-invalid" : "")
            }
          />
          {submitted && !title && (
            <div className="invalid-feedback">title is required</div>
          )}
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !description ? " is-invalid" : "")
            }
          />
          {submitted && !description && (
            <div className="invalid-feedback">desription is required</div>
          )}
        </div>
        <div className="form-group">
          <label>Body</label>
          <textarea
            type="text"
            name="body"
            value={body}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !body ? " is-invalid" : "")
            }
          />
          {submitted && !body && (
            <div className="invalid-feedback">body is required</div>
          )}
        </div>
        <div className="form-group">
          <label>Tags(Enter comma separated values)</label>
          <input
            type="text"
            name="tagList"
            value={tagList}
            onChange={handleChange}
            className={"form-control"}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-info">
            {id ? "Update Article" : "Add Article"}
          </button>
        </div>
      </form>
    </div>
  );
}

export { NewArticle };
