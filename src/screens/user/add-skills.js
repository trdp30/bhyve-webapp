import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SkillListView from "../../components/skill-helpers/skill-list-view";
import { toastInfo } from "../../components/toast-helpers";
import { skillQueryRequest } from "../../store/actions/skill.action";
import { userAddSkills, userFetchDetails } from "../../store/actions/user.action";

function AddSkills(props) {
  const { user, skills, fetchUser, fetchSkill, updateUserSkill, history } = props;
  const [selectedSkills, addSkills] = useState([]);
  const [isLoading, toggleLoading] = useState(false);

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
    if (user && user.skills && user.skills.length) {
      history.replace("/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.skills]);

  if (user && user.id) {
    return (
      <div className="ui container">
        <div className="ui middle aligned centered stackable two column grid login-container margin-no">
          <div className="row">
            <div className="column text-center">
              <div className="ui segments skill-wrapper margin-no">
                <div className="skill-container">
                  {skills && skills.length ? (
                    <SkillListView
                      skills={skills}
                      updateSelectedSkills={updateSelectedSkills}
                      selectedSkills={selectedSkills}
                    />
                  ) : (
                    <div>Loading skills...</div>
                  )}
                </div>
              </div>
              <div className="ui segment text-center margin-no">
                <div className={clsx("ui primary button", { disabled: isLoading })} onClick={save}>
                  Add Skills
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user.data,
  skills: state.skill.data
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (actions = {}) => dispatch(userFetchDetails({ actions })),
  updateUserSkill: (payload, actions = {}) => dispatch(userAddSkills({ payload, actions })),
  fetchSkill: (query = {}, actions = {}) => dispatch(skillQueryRequest({ query, actions }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSkills);
