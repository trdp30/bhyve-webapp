import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { toastError } from "../../components/toast-helpers";
import { authenticateInitiate } from "../../store/actions/session.action";
import { getString, validatedEmail, validatedPassword } from "../../utils/validations";
import AppContainer from "../../components/app-container";

const Login = (props) => {
  const { triggerLogin, history, session } = props;
  const [state, setState] = useState({ username: "", password: "" });
  const [error, setError] = useState({ username: null, password: null });
  const touched = useRef({ username: false, password: false });

  const [isLoading, toggleLoading] = useState(false);
  const [credentialError, setCredentialError] = useState(null);

  const updateState = (event) => {
    const { target } = event;
    const { name, value } = target;
    setState((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    });
  };

  const onFocus = (event) => {
    const { target } = event;
    const { name } = target;
    touched.current[name] = true;
  };

  const validate = () => {
    let hasError = false;
    if (!getString(state.username) && touched.current.username) {
      hasError = true;
      setError((prev) => ({
        ...prev,
        username: "Required"
      }));
    } else {
      hasError = false;

      setError((prev) => ({
        ...prev,
        username: null
      }));
    }
    if (!getString(state.password) && touched.current.password) {
      hasError = true;
      setError((prev) => ({
        ...prev,
        password: "Required"
      }));
    } else {
      hasError = false;
      setError((prev) => ({
        ...prev,
        password: null
      }));
    }
    return hasError;
  };

  const onSuccess = (response) => {
    toggleLoading(false);
  };

  const onFailed = (error) => {
    if (error.response && error.response.status === 400) {
      setCredentialError(() => "Either username or password is incorrect");
    } else {
      toastError(error);
    }
    toggleLoading(false);
  };

  const handleLogin = () => {
    setCredentialError("");

    const { username, password } = state;
    const payload = {
      username: getString(username),
      password: getString(password)
    };

    touched.current.username = true;
    touched.current.password = true;

    const hasError = validate();

    if (!hasError) {
      if (!validatedEmail(payload.username) || !validatedPassword(payload.password)) {
        return setCredentialError(() => "Either username or password is wrong");
      } else {
        toggleLoading(true);
        triggerLogin(payload, { onSuccess, onFailed });
      }
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

  const { username, password } = state;

  useEffect(() => {
    validate(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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
                <div className="ui form width-full">
                  <span className="text-size-small text-color-red">{credentialError}</span>
                  <div className={clsx("field", { error: error.username })}>
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      placeholder="abc@abc.com"
                      onFocus={onFocus}
                      onChange={updateState}
                      autoComplete={"off"}
                    />
                    <br />
                    <span className="text-size-small text-color-red">{error.username}</span>
                  </div>
                  <div className={clsx("field", { error: error.password })}>
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      placeholder="password"
                      onFocus={onFocus}
                      onChange={updateState}
                      autoComplete={"off"}
                    />
                    <span className="text-size-small text-color-red">{error.password}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column">
                <div className="ui form">
                  <div className="field text-center">
                    <div
                      className={clsx(
                        "ui primary button button-login",
                        { disabled: isLoading },
                        { loading: isLoading }
                      )}
                      onClick={handleLogin}>
                      Sign In
                    </div>
                  </div>
                  <div className="field text-center">
                    <div
                      className={clsx("ui basic primary button button-login", {
                        disabled: isLoading
                      })}
                      onClick={() => redirect("/signup")}>
                      Sign Up
                    </div>
                  </div>
                </div>
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
