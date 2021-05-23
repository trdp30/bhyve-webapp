import React, { useMemo, useState } from "react";
import FormBase from "../../components/form-helpers/base";
import { useHistory } from "react-router-dom";
import Input from "../../components/form-helpers/input";
import {
  getString,
  requiredCheck,
  validatedEmail,
  validatedPassword
} from "../../utils/validations";
import { createRecord } from "../../store/adapters";
import { toastError } from "../../components/toast-helpers";
import ModalView from "../../components/modules/modal-view";
import AppContainer from "../../components/app-container";

const fields = [
  {
    type: "email",
    initialValue: { username: "" },
    valuePath: "username",
    label: "Username",
    isRequired: true,
    placeholder: "abc@abc.com",
    Component: Input,
    validate: (values) => {
      let error = requiredCheck(values, "username");
      if (!error && !validatedEmail(values.username)) {
        error = "Please enter a valid email address";
      }
      return error;
    }
  },
  {
    type: "password",
    initialValue: { password: "" },
    valuePath: "password",
    label: "Enter password",
    isRequired: true,
    placeholder: "password",
    hasIcon: true,
    shouldTrim: true,
    Component: Input,
    validate: (values) => {
      let error = requiredCheck(values, "password");
      if (
        !error &&
        (getString(values.password).length > 20 || getString(values.password).length < 8)
      ) {
        error = "Password has to be minimum of 8 characters and maximum of 20 characters limit";
      } else if (!error && !validatedPassword(values.password)) {
        error = "Please enter a valid password as per mention below";
      }
      return error;
    }
  },
  {
    type: "password",
    initialValue: { confirm_password: "" },
    valuePath: "confirm_password",
    label: "Confirm password",
    isRequired: true,
    placeholder: "Re-Enter password",
    shouldTrim: true,
    hasIcon: true,
    Component: Input,
    validate: (values) => {
      let error = requiredCheck(values, "confirm_password");
      if (!error && values.confirm_password !== values.password) {
        error = "Passwords do not match";
      }
      return error;
    }
  }
];

const UserExistView = (props) => {
  const { username, redirect } = props;

  return (
    <div className="text-center">
      <p className="text-size-large">
        Account already exist having username <b>{username}</b>.
      </p>
      <p>Try giving something else or Sign in using the same username.</p>
      <p>
        Click here to{" "}
        <span className="text-color-positive cursor-pointer" onClick={redirect}>
          Sign in
        </span>
      </p>
    </div>
  );
};

function SignUp(props) {
  const history = useHistory();
  const [openModal, toggleModal] = useState(false);
  const [existingUserName, setExistingUserName] = useState(null);

  const initialValue = useMemo(
    () => ({
      username: "",
      password: "",
      confirm_password: ""
    }),
    []
  );

  const redirect = () => {
    toggleModal(false);
    history.replace({
      pathname: "/login"
    });
  };

  const update = async (values, actions) => {
    try {
      setExistingUserName(values.username);
      await createRecord("user/signup", {
        username: values.username,
        password: values.password
      });
      redirect();
    } catch (error) {
      actions.setSubmitting(false);
      if (error && error.response && error.response.data && error.response.data.message) {
        const errorData = error.response.data;
        if (error.response.status === 409) {
          toggleModal(true);
        } else if (Array.isArray(errorData.message)) {
          actions.setStatus(
            errorData.message.map((err) => (
              <div className="text-size-small text-color-red">{err}</div>
            ))
          );
        } else {
          actions.setStatus(
            <div className="text-size-small text-color-red">{errorData.message}</div>
          );
        }
      } else {
        toastError(error);
        actions.setStatus(error.message);
      }
    }
  };

  return (
    <AppContainer>
      <div className="centered ten wide column">
        <div className="ui segments">
          <div className="ui segment">
            <div className="ui centered stackable grid">
              <div className="row">
                <div className="ten wide column padding-top-big">
                  <h5 className="text-size-big text-center">Create account</h5>
                </div>
              </div>
              <div className="row">
                <div className="ten wide column padding-top-big">
                  <FormBase
                    fields={fields}
                    postRequest={update}
                    initialValues={initialValue}
                    submitButtonLabel={"Sign up"}
                    submitButtonClassNames={
                      "ui medium primary button text-weight-normal button-login"
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="ten wide column">
                  <b>Note:</b>
                  <ul>
                    <li>Username must be an email address</li>
                    <li>
                      A password has to be minimum of 8 characters and maximum of 20 characters
                      limit. A password must contain a mixture of both uppercase and lowercase
                      letters. At least 1 special character OR numeric value OR it can contain both.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalView
          openModal={openModal}
          toggleModal={toggleModal}
          content={<UserExistView redirect={redirect} username={existingUserName} />}
          size={"tiny"}
          showPositiveButton={true}
          positiveButtonLabel={"Try Again"}
          actionClassNames="text-center"
          headerContent="User Exist"
          headerClassNames="text-center"
          contentClassNames="padding-vertical-large"
        />
      </div>
    </AppContainer>
  );
}

export default SignUp;
