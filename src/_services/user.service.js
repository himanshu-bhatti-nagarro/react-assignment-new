import * as config from "../config.json";
import { authHeader } from "../_helpers";

export const userService = {
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

const loginObj = {
  user: {
    email: "",
    password: "",
  },
};

const registrationObj = {
  user: {
    username: "",
    email: "",
    password: "",
  },
};

const addArticleObj = {
  article: {
    title: "",
    description: "",
    body: "",
    tagList: [],
  },
};

const commentObj = {
  comment: {
    body: "",
  },
};

function login(email, password) {
  loginObj.user.email = email;
  loginObj.user.password = password;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
    body: JSON.stringify(loginObj),
  };

  return fetch(`${config.apiUrl}/users/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function addArticle(title, description, body, tagList) {
  addArticleObj.article.title = title;
  addArticleObj.article.description = description;
  addArticleObj.article.body = body;
  addArticleObj.article.tagList = tagList;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify(addArticleObj),
  };

  return fetch(`${config.apiUrl}/articles`, requestOptions).then(
    handleResponse
  );
}

function updateArticle(title, description, body, tagList, slug) {
  addArticleObj.article.title = title;
  addArticleObj.article.description = description;
  addArticleObj.article.body = body;
  addArticleObj.article.tagList = tagList;
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify(addArticleObj),
  };

  return fetch(`${config.apiUrl}/articles/${slug}`, requestOptions).then(
    handleResponse
  );
}

function deleteArticle(slug) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify(addArticleObj),
  };

  return fetch(`${config.apiUrl}/articles/${slug}`, requestOptions).then(
    handleResponse
  );
}

function getComments(slug) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: authHeader().Authorization,
    },
  };

  return fetch(
    `${config.apiUrl}/articles/${slug}/comments`,
    requestOptions
  ).then(handleResponse);
}

function addComment(slug, comment) {
  commentObj.comment.body = comment;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify(commentObj),
  };

  return fetch(
    `${config.apiUrl}/articles/${slug}/comments`,
    requestOptions
  ).then(handleResponse);
}

function deleteComment(id, slug) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      Authorization: authHeader().Authorization,
    },
    body: JSON.stringify(addArticleObj),
  };

  return fetch(
    `${config.apiUrl}//articles/${slug}/comments/${id}`,
    requestOptions
  ).then(handleResponse);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getArticleBySlug(slug) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/articles/${slug}`, requestOptions).then(
    handleResponse
  );
}

function register(user) {
  registrationObj.user.email = user.email;
  registrationObj.user.password = user.password;
  registrationObj.user.username = user.username;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(registrationObj),
  };

  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getAllArticles(type) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  if (type === "all") {
    return fetch(`${config.apiUrl}/articles`, requestOptions).then(
      handleResponse
    );
  }

  let user = JSON.parse(localStorage.getItem("user"));
  if (type == "my") {
    return fetch(
      `${config.apiUrl}/articles?author=${user.user.username}`,
      requestOptions
    ).then(handleResponse);
  }

  return fetch(
    `${config.apiUrl}/articles?favorited=${user.user.username}`,
    requestOptions
  ).then(handleResponse);
}

function getTags() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/tags`, requestOptions).then(handleResponse);
}

function getArticlesByTag(tag) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/articles/?tag=${tag}`, requestOptions).then(
    handleResponse
  );
}

function markUnmarkFavourite(flag, slug) {
  if (flag) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        Authorization: authHeader().Authorization,
      },
    };

    return fetch(
      `${config.apiUrl}/articles/${slug}/favorite`,
      requestOptions
    ).then(handleResponse);
  }

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      Authorization: authHeader().Authorization,
    },
  };

  return fetch(
    `${config.apiUrl}/articles/${slug}/favorite`,
    requestOptions
  ).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (data.errors) {
      const keys = Object.keys(data.errors);
      const error = keys[0] + " " + data["errors"][keys[0]];
      return Promise.reject(error);
    }

    return data;
  });
}
