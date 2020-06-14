import { articlesConstants } from "../_constants";

export function articles(state = {}, action) {
  switch (action.type) {
    case articlesConstants.GET_ALL:
      return {
        ...state,
        articles: action.articles?.articles ? action.articles.articles : [],
      };
    case articlesConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        articles: action.articles.articles,
      };
    case articlesConstants.GET_ALL_FAILURE:
      return {};
    case articlesConstants.GET_ALL_BY_TAG:
      return {
        ...state,
      };
    case articlesConstants.GET_ALL_BY_TAG_SUCCESS:
      return {
        ...state,
        articles: action.articles.articles,
      };
    case articlesConstants.GET_ALL_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
