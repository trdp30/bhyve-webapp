import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SkillListView from "../../components/skill-helpers/skill-list-view";
import SpinLoading from "../../components/spin-loader";
import { toastInfo } from "../../components/toast-helpers";
import { skillQueryRequest } from "../../store/actions/skill.action";
import { userAddSkills, userFetchDetails } from "../../store/actions/user.action";

function AddSkills(props) {
  const { user, skills, fetchUser, fetchSkill, updateUserSkill, history, request } = props;
  const [selectedSkills, addSkills] = useState([]);
  const [isLoading, toggleLoading] = useState(false);
  const [loadView, toggleLoadView] = useState(false);

  const updateSelectedSkills = (skill) => {
    if (!isLoading) {
      const index = selectedSkills.findIndex((s) => s.id === skill.id);
      if (index === -1) {
        if (selectedSkills.length < 8) {
          addSkills((prev) => prev.concat(skill));
        } else {
          toastInfo({ title: "Oops!", message: "You can select upto 8 skills only" });
        }
      } else {
        addSkills((prev) => {
          const copyPrev = [...prev];
          copyPrev.splice(index, 1);
          return copyPrev;
        });
      }
    }
  };

  const onSuccess = () => {
    toggleLoading(false);
    history.replace("/profile");
  };

  const onFailed = () => {
    toggleLoading(false);
  };

  const save = () => {
    if (selectedSkills.length > 2) {
      toggleLoading(true);
      updateUserSkill(
        {
          skills: selectedSkills.map((skill) => skill.skillName)
        },
        {
          onSuccess,
          onFailed
        }
      );
    } else {
      toastInfo({
        title: "Please add at least 3 skills"
      });
    }
  };

  useEffect(() => {
    if (!(user && user.id && skills && skills.length)) {
      fetchUser();
      fetchSkill();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // if (user && user.skills && user.skills.length) {
    //   history.replace("/profile");
    // } else if (user.id && user.id) {
    toggleLoadView(true);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.skills]);

  if (loadView) {
    return (
      <div className="twelve wide column text-center">
        <div className="ui segments margin-no skill-container">
          <div className="ui segment border-none padding-top-big">
            <div className="header">Add Skills</div>
          </div>
          <div className="ui segment border-none">
            <div className="description padding-top-twelve">You can select upto 8 skills</div>
            <div className="info padding-top-twelve">(Select at least 3 skills)</div>
          </div>
          <div className="ui segment skill-container border-none">
            <div className="ui centered stackable grid margin-no">
              <SkillListView
                skills={skills}
                request={request}
                updateSelectedSkills={updateSelectedSkills}
                selectedSkills={selectedSkills}
              />
            </div>
          </div>
          <div className="ui segment text-center margin-no">
            <div
              className={clsx(
                "ui primary button button-login",
                { disabled: isLoading },
                { loading: isLoading }
              )}
              onClick={save}>
              Add Skills
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="twelve wide column text-center">
        <SpinLoading />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.data,
  skills: state.skill.data,
  request: state.skill.request
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (actions = {}) => dispatch(userFetchDetails({ actions })),
  updateUserSkill: (payload, actions = {}) => dispatch(userAddSkills({ payload, actions })),
  fetchSkill: (query = {}, actions = {}) => dispatch(skillQueryRequest({ query, actions }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSkills);
