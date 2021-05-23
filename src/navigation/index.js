import LoginScreen from "../screens/authentication/login";
import SignupScreen from "../screens/authentication/signup";
import { connect } from "react-redux";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ErrorBoundary from "./error-boundary";
import Profile from "../screens/profile";
import UpdateProfile from "../screens/user/update-profile";
import AddSkills from "../screens/user/add-skills";
import AppContainer from "../components/app-container";

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

const PrivateRoute = ({ component: Component, isAuthenticated, currentUserRole, ...rest }) => {
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
          <AppContainer>
            <Component {...props} />
          </AppContainer>
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
      </Switch>
    </ErrorBoundary>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.session.isAuthenticated,
    currentUserRole: state.session.authorization && state.session.authorization.role
  };
};

export default connect(mapStateToProps)(Navigation);
