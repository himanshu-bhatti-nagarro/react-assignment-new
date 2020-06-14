import { commentsConstants } from "../_constants";

export function comments(state = {}, action) {
  switch (action.type) {
    case commentsConstants.GET_ALL:
      return {
        ...state,
        comments: action.comments?.comments ? action.comments.comments : [],
      };
    case commentsConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        comments: action.comments.comments,
      };
    case commentsConstants.GET_ALL_FAILURE:
      return {};
    default:
      return state;
  }
}
