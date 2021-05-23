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
    <div className="five wide column text-center cursor-pointer">
      <div
        className={clsx("ui segment skill-card", {
          selected: isSelected
        })}
        onClick={() => updateSelectedSkills(skill)}>
        {skill.skillName}
      </div>
    </div>
  );
}

export default SkillCard;
