import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { history } from "./_helpers";
import { alertActions } from "./_actions";
import { PrivateRoute } from "./_components";
import { Articles } from "./Articles";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { Article } from "./IndividualArticle";
import { NewArticle } from "./NewArticle";

function App() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <div className="jumbotron">
      <div className="container">
        <div className="col-md-8 offset-md-2">
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
          <Router history={history}>
            <Switch>
              <PrivateRoute exact path="/articles" component={Articles} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/articles/:id" component={Article} />
              <Route path="/newArticle" component={NewArticle} />
              <Route path="/editArticle/:id" component={NewArticle} />
              <Redirect from="*" to="/articles" />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
