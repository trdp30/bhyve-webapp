import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import FormBase from "../../components/form-helpers/base";
import Input from "../../components/form-helpers/input";
import SpinLoading from "../../components/spin-loader";
import { toastError, toastSuccess } from "../../components/toast-helpers";
import { userFetchDetails, userUpdateData } from "../../store/actions/user.action";
import { requiredCheck } from "../../utils/validations";

const fields = [
  {
    type: "text",
    initialValue: { firstName: "" },
    valuePath: "firstName",
    label: "First Name",
    isRequired: true,
    placeholder: "Enter your First Name",
    Component: Input,
    validate: (values) => requiredCheck(values, "firstName")
  },
  {
    type: "text",
    initialValue: { lastName: "" },
    valuePath: "lastName",
    label: "Last Name",
    isRequired: true,
    placeholder: "Enter your Last Name",
    Component: Input,
    validate: (values) => requiredCheck(values, "lastName")
  }
];

function UpdateProfile(props) {
  const { user, fetchUser, updateUserData, history } = props;
  const [loadView, toggleLoadView] = useState(false);

  const initialValues = useMemo(
    () => ({
      firstName: "",
      lastName: ""
    }),
    []
  );

  const save = (values, actions) => {
    const onSuccess = () => {
      actions.setSubmitting(false);
      toastSuccess({
        title: "Success",
        message: "Successfully updated"
      });
    };

    const onFailed = (error) => {
      actions.setSubmitting(false);
      toastError(error);
    };
    updateUserData(values, {
      onFailed,
      onSuccess
    });
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user && user.firstName && user.lastName) {
      history.replace("add-skill");
    } else if (user && user.id) {
      toggleLoadView(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loadView) {
    return (
      <div className="centered ten wide column">
        <div className="ui segment user-details-edit">
          <div className="ui centered stackable grid margin-no height-full">
            <div className="row">
              <div className="ten wide middle aligned text-left column">
                <div className="header">Hello there,</div>
                <div className="description">Please provide your details</div>
              </div>
            </div>
            <div className="row">
              <div className="ten wide column">
                <FormBase
                  fields={fields}
                  initialValues={initialValues}
                  postRequest={save}
                  submitButtonLabel="Save"
                  submitButtonClassNames="ui primary button button-login"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="centered ten wide column text-center">
        <SpinLoading />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.data
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (actions = {}) => dispatch(userFetchDetails({ actions })),
  updateUserData: (payload, actions = {}) => dispatch(userUpdateData({ payload, actions }))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
