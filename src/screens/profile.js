import React, { useEffect } from "react";
import { connect } from "react-redux";
import UserSkillCard from "../components/user-skill-card";
import { userFetchDetails } from "../store/actions/user.action";

function Profile(props) {
  const { fetchUser, user } = props;

  useEffect(() => {
    if (!(user && user.id)) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user && user.id) {
    return (
      <div className="ui container">
        <div className="ui middle aligned stackable grid user-details-container">
          <div className="row">
            <div className="centered twelve wide column">
              <div className="ui segment user-details-wrapper padding-no-vertical">
                <div className="ui stackable grid margin-no">
                  <div className="six wide column profile-picture-container">
                    <img
                      class="ui medium circular image"
                      src="/assets/images/profile-pic.jpeg"
                      alt="profile-pic"
                    />
                  </div>
                  <div className="ten wide column">
                    <div className="ui stackable grid margin-no">
                      <div className="row">
                        <div className="sixteen wide column">
                          <p className="label">Name</p>
                          <div className="data">
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="sixteen wide column">
                          <p className="label">Email Address</p>
                          <div className="data">{user.username}</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="sixteen wide column">
                          <p className="label">Total Skill</p>
                          <div className="data">
                            <span className="skill-count">{user.skills && user.skills.length}</span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="sixteen wide column">
                          <p className="label">Skills</p>
                          {user.skills &&
                            user.skills.length &&
                            user.skills.map((skill, index) => (
                              <UserSkillCard key={skill} skill={skill} index={index} />
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
}

const mapStateToProps = (state) => ({
  user: state.user.data
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (actions = {}) => dispatch(userFetchDetails((actions = {})))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
