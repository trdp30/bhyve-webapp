import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import FormBase from "../../components/form-helpers/base";
import Input from "../../components/form-helpers/input";
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
    placeholder: "Enter Here",
    Component: Input,
    validate: (values) => requiredCheck(values, "firstName")
  },
  {
    type: "text",
    initialValue: { lastName: "" },
    valuePath: "lastName",
    label: "Last Name",
    isRequired: true,
    placeholder: "Enter Here",
    Component: Input,
    validate: (values) => requiredCheck(values, "lastName")
  }
];

function UpdateProfile(props) {
  const { user, fetchUser, updateUserData, history } = props;

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="ui container">
      <div className="ui middle aligned stackable grid login-container">
        <div className="row">
          <div className="centered ten wide column">
            {user && user.id ? (
              <FormBase
                fields={fields}
                initialValues={initialValues}
                postRequest={save}
                submitButtonLabel="Save"
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.data
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (actions = {}) => dispatch(userFetchDetails({ actions })),
  updateUserData: (payload, actions = {}) => dispatch(userUpdateData({ payload, actions }))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
