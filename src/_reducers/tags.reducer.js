import { articlesConstants } from "../_constants";

export function tags(state = {}, action) {
  switch (action.type) {
    case articlesConstants.GET_TAGS:
      return {
        ...state,
      };
    case articlesConstants.GET_TAGS_SUCCESS:
      return {
        ...state,
        tags: action.tags.tags,
      };
    case articlesConstants.GET_TAGS_FAILURE:
      return {};
    default:
      return state;
  }
}
