import React from "react";
import "../styles/css/App.css";
import { auth, isAuthenticated } from "../base";
import PageNotFound from "./PageNotFound";
import MemberListWrapper from "./MemberListWrapper";
import Login from "./Login";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

class App extends React.Component {
  state = {
    uid: null
  };
  static childContextTypes = {
    uid: PropTypes.string
  };

  getChildContext() {
    return { uid: this.state.uid };
  }

  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (user && user.uid) {
        this.setState({ uid: user.uid });
      } else this.setState({ uid: null });
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <ProtectedRoute
            path="/project/:id"
            component={MemberListWrapper}
          />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={renderProps =>
      isAuthenticated() ? (
        <Component {...renderProps} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: renderProps.location }
          }}
        />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.any
};
