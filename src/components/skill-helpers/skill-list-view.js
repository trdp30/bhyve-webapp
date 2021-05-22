import React, { Fragment } from "react";
import SkillCard from "./skill-card";

function SkillListView(props) {
  const { skills, updateSelectedSkills, selectedSkills } = props;

  return (
    <Fragment>
      {skills.map((skill) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          updateSelectedSkills={updateSelectedSkills}
          selectedSkills={selectedSkills}
        />
      ))}
    </Fragment>
  );
}

export default SkillListView;
