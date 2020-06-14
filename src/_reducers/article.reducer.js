import { articlesConstants } from "../_constants";

export function article(state = {}, action) {
  switch (action.type) {
    case articlesConstants.GET_BY_SLUG:
      return {
        ...state,
        article: action.article?.articles ? action.article.article : {},
      };
    case articlesConstants.GET_BY_SLUG_SUCCESS:
      return {
        ...state,
        article: action.article.article,
      };
    case articlesConstants.GET_BY_SLUG_FAILURE:
      return {};
    default:
      return state;
  }
}
