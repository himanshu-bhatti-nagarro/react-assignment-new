import {
  userConstants,
  articlesConstants,
  commentsConstants,
} from "../_constants";
import { userService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";

export const userActions = {
  login,
  logout,
  register,
  getAllArticles,
  getArticleBySlug,
  addArticle,
  updateArticle,
  deleteArticle,
  getComments,
  addComment,
  deleteComment,
  getTags,
  getArticlesByTag,
  markUnmarkFavourite,
};

function login(email, password) {
  return (dispatch) => {
    dispatch(request({ email }));

    userService.login(email, password).then(
      (user) => {
        dispatch(success(user));
        history.push("/");
      },
      (error) => {
        console.log(error);
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function addArticle(title, description, body, tagList) {
  return (dispatch) => {
    dispatch(request(title, description, body, tagList));

    userService.addArticle(title, description, body, tagList).then(
      (article) => {
        dispatch(success(article));
        history.push("/articles");
      },
      (error) => {
        console.log(error);
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(title, description, body, tagList) {
    return { type: articlesConstants.ADD, title, description, body, tagList };
  }
  function success(article) {
    return { type: articlesConstants.ADD_SUCCCESS, article };
  }
  function failure(error) {
    return { type: articlesConstants.ADD_FAILURE, error };
  }
}

function updateArticle(title, description, body, tagList, slug) {
  return (dispatch) => {
    dispatch(request(title, description, body, tagList, slug));

    userService.updateArticle(title, description, body, tagList, slug).then(
      (article) => {
        dispatch(success(article));
        history.push("/articles");
      },
      (error) => {
        console.log(error);
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(title, description, body, tagList) {
    return {
      type: articlesConstants.UPDATE,
      title,
      description,
      body,
      tagList,
    };
  }
  function success(article) {
    return { type: articlesConstants.UPDATE_SUCCCESS, article };
  }
  function failure(error) {
    return { type: articlesConstants.UPDATE_FAILURE, error };
  }
}

function deleteArticle(slug) {
  return (dispatch) => {
    dispatch(request(slug));

    userService.deleteArticle(slug).then(
      (article) => {
        dispatch(success(article));
        history.push("/articles");
      },
      (error) => {
        console.log(error);
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(slug) {
    return {
      type: articlesConstants.DELETE,
      slug,
    };
  }
  function success(article) {
    return { type: articlesConstants.DELETE_SUCCCESS, article };
  }
  function failure(error) {
    return { type: articlesConstants.DELETE_FAILURE, error };
  }
}

function getComments(slug) {
  return (dispatch) => {
    dispatch(request(slug));

    userService.getComments(slug).then(
      (comments) => {
        dispatch(success(comments));
      },
      (error) => {
        console.log(error);
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(slug) {
    return {
      type: commentsConstants.GET_ALL,
      slug,
    };
  }
  function success(comments) {
    return { type: commentsConstants.GET_ALL_SUCCESS, comments };
  }
  function failure(error) {
    return { type: commentsConstants.GET_ALL_FAILURE, error };
  }
}

function getArticleBySlug(slug) {
  return (dispatch) => {
    dispatch(request(slug));

    userService.getArticleBySlug(slug).then(
      (article) => {
        dispatch(success(article));
      },
      (error) => {
        console.log(error);
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(slug) {
    return { type: articlesConstants.GET_BY_SLUG, slug };
  }
  function success(article) {
    return { type: articlesConstants.GET_BY_SLUG_SUCCESS, article };
  }
  function failure(error) {
    return { type: articlesConstants.GET_BY_SLUG_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getAllArticles(type) {
  return (dispatch) => {
    dispatch(request());

    userService.getAllArticles(type).then(
      (articles) => dispatch(success(articles)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: articlesConstants.GET_ALL };
  }
  function success(articles) {
    return { type: articlesConstants.GET_ALL_SUCCESS, articles };
  }
  function failure(error) {
    return { type: articlesConstants.GET_ALL_FAILURE, error };
  }
}

function addComment(slug, comment) {
  return (dispatch) => {
    dispatch(request(slug, comment));

    userService.addComment(slug, comment).then(
      (comment) => {
        dispatch(success(comment));
        window.location.reload();
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(slug, comment) {
    return { type: commentsConstants.ADD, slug, comment };
  }
  function success(comment) {
    return { type: commentsConstants.ADD_SUCCCESS, comment };
  }
  function failure(error) {
    return { type: commentsConstants.ADD_FAILURE, error };
  }
}

function deleteComment(id, slug) {
  return (dispatch) => {
    dispatch(request(id, slug));

    userService.deleteComment(id, slug).then(
      (comment) => {
        dispatch(success(comment));
        window.location.reload();
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id, slug) {
    return { type: commentsConstants.DELETE, id, slug };
  }
  function success(comment) {
    return { type: commentsConstants.DELETE_SUCCCESS, comment };
  }
  function failure(error) {
    return { type: commentsConstants.DELETE_FAILURE, error };
  }
}

function getTags() {
  return (dispatch) => {
    dispatch(request(true));

    userService.getTags().then(
      (tags) => {
        dispatch(success(tags));
        // window.location.reload();
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(req) {
    return { type: articlesConstants.GET_TAGS, req };
  }
  function success(tags) {
    return { type: articlesConstants.GET_TAGS_SUCCESS, tags };
  }
  function failure(error) {
    return { type: articlesConstants.GET_TAGS_FAILURE, error };
  }
}

function getArticlesByTag(tag) {
  return (dispatch) => {
    dispatch(request(tag));

    userService.getArticlesByTag(tag).then(
      (articles) => {
        dispatch(success(articles));
        // window.location.reload();
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(tag) {
    return { type: articlesConstants.GET_ALL_BY_TAG, tag };
  }
  function success(articles) {
    return { type: articlesConstants.GET_ALL_BY_TAG_SUCCESS, articles };
  }
  function failure(error) {
    return { type: articlesConstants.GET_ALL_BY_TAG_FAILURE, error };
  }
}

function markUnmarkFavourite(flag, slug) {
  return (dispatch) => {
    dispatch(request(flag, slug));

    userService.markUnmarkFavourite(flag, slug).then(
      (article) => {
        dispatch(success(article));
        history.push("/article/" + slug);
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(flag, slug) {
    return { type: articlesConstants.MARK_UNMARK_FAVOURITE, flag, slug };
  }
  function success(article) {
    return { type: articlesConstants.MARK_UNMARK_FAVOURITE_SUCCESS, article };
  }
  function failure(error) {
    return { type: articlesConstants.MARK_UNMARK_FAVOURITE_FAILURE, error };
  }
}
