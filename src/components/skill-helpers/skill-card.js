import clsx from "clsx";
import React, { useMemo } from "react";

function SkillCard(props) {
  const { skill, updateSelectedSkills, selectedSkills } = props;
  const isSelected = useMemo(() => {
    const index = selectedSkills.findIndex((s) => s.id === skill.id);
    if (index !== -1) {
      return true;
    }
    return false;
  }, [selectedSkills, skill]);
  return (
    <div
      className={clsx("ui segment text-center skill-card cursor-pointer clear-both", {
        selected: isSelected
      })}
      onClick={() => updateSelectedSkills(skill)}>
      {skill.skillName}
    </div>
  );
}

export default SkillCard;
