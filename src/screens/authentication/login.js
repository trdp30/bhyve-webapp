import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { toastError } from "../../components/toast-helpers";
import { authenticateInitiate } from "../../store/actions/session.action";
import {
  getString,
  requiredCheck,
  validatedEmail,
  validatedPassword
} from "../../utils/validations";
import AppContainer from "../../components/app-container";
import Input from "../../components/form-helpers/input";
import FormBase from "../../components/form-helpers/base";

const fields = [
  {
    type: "email",
    initialValue: { username: "" },
    valuePath: "username",
    label: "Username",
    placeholder: "abc@abc.com",
    Component: Input,
    validate: (values) => requiredCheck(values, "username")
  },
  {
    type: "password",
    initialValue: { password: "" },
    valuePath: "password",
    label: "Password",
    placeholder: "password",
    hasIcon: true,
    shouldTrim: true,
    Component: Input,
    validate: (values) => requiredCheck(values, "password")
  }
];

const Login = (props) => {
  const { triggerLogin, history, session } = props;
  const state = useMemo(() => ({ username: "", password: "" }), []);

  const [isLoading, toggleLoading] = useState(false);
  const [credentialError, setCredentialError] = useState(null);

  const handleLogin = (values, actions) => {
    setCredentialError("");

    const onSuccess = () => {
      toggleLoading(false);
      actions.setSubmitting(false);
    };

    const onFailed = (error) => {
      if (error.response && (error.response.status === 400 || error.response.status === 401)) {
        setCredentialError(() => "Either username or password is incorrect");
      } else {
        setCredentialError(() => error.message);
        toastError(error);
      }
      actions.setSubmitting(false);
      toggleLoading(false);
    };

    const { username, password } = values;
    const payload = {
      username: getString(username),
      password: getString(password)
    };

    if (!validatedEmail(payload.username) || !validatedPassword(payload.password)) {
      return onFailed(new Error("Either username or password is incorrect"));
    } else {
      toggleLoading(true);
      triggerLogin(payload, { onSuccess, onFailed });
    }
  };

  const redirect = (path) => {
    history.push(path);
  };

  useEffect(() => {
    if (session.isAuthenticated) {
      if (session.user.profileCompleted) {
        history.push("/profile");
      } else {
        history.push("/update-profile");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.isAuthenticated]);

  return (
    <AppContainer>
      <div className="centered seven wide column">
        <div className="ui segment login-wrapper">
          <div className="ui centered stackable grid margin-no height-full">
            <div className="row">
              <div className="twelve wide column">
                <div className="header text-center">Welcome to BHyve</div>
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column">
                <div className="description">Sign In</div>
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column">
                <span className="text-size-small text-color-red">{credentialError}</span>
                <FormBase
                  fields={fields}
                  postRequest={handleLogin}
                  initialValues={state}
                  submitButtonLabel={"Sign In"}
                  submitButtonClassNames={"ui primary button text-weight-normal button-login"}
                />
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column text-center">
                Don't have an account?{" "}
                <span
                  className="text-color-primary text-weight-bold cursor-pointer"
                  onClick={() => !isLoading && redirect("/signup")}>
                  Sign up
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerLogin: (payload, actions = {}) => {
      dispatch(authenticateInitiate({ payload, actions }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
