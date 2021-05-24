import LoginScreen from "../screens/authentication/login";
import SignupScreen from "../screens/authentication/signup";
import { connect } from "react-redux";
import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ErrorBoundary from "./error-boundary";
import Profile from "../screens/profile";
import UpdateProfile from "../screens/user/update-profile";
import AddSkills from "../screens/user/add-skills";
import AppContainer from "../components/app-container";
import NotFound from "../screens/not-found";
import NavBar from "../components/nav-bar";

export const publicRoutes = [
  {
    key: "login",
    path: "/login",
    component: LoginScreen
  },
  {
    key: "signup",
    path: "/signup",
    component: SignupScreen
  }
];

export const privateRoutes = [
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/update-profile",
    component: UpdateProfile
  },
  {
    path: "/add-skill",
    component: AddSkills
  },
  {
    path: "/",
    component: Profile
  }
];

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === false ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        ) : (
          <Fragment>
            <NavBar />
            <AppContainer>
              <Component {...props} />
            </AppContainer>
          </Fragment>
        )
      }
    />
  );
};

const Navigation = (props) => {
  let isAuthenticated = props.isAuthenticated;
  const allOtherRoutes = privateRoutes.map((route, index) => {
    return (
      <PrivateRoute
        key={index}
        path={route.path}
        exact={true}
        component={route.component}
        isAuthenticated={isAuthenticated}
      />
    );
  });

  const PublicRoutes = publicRoutes.map(({ route, key, ...rest }) => (
    <Route {...rest} key={key} component={rest.component} exact={true} />
  ));

  return (
    <ErrorBoundary>
      <Switch>
        {PublicRoutes}
        {allOtherRoutes}
        <Route path="*" component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.session.isAuthenticated
});

export default connect(mapStateToProps)(Navigation);
