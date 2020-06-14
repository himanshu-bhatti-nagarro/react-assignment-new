import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import { articles } from "./articles.reducer";
import { article } from "./article.reducer";
import { comments } from "./comments.reducer";
import { tags } from "./tags.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  articles,
  article,
  comments,
  tags,
});

export default rootReducer;
