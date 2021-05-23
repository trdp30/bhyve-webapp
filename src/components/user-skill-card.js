import React from "react";
import clsx from "clsx";

const colors = [
  "#FFADAD",
  "#FFD6A5",
  "#FDFFB6",
  "#CAFFBF",
  "#9BF6FF",
  "#A0C4FF",
  "#BDB2FF",
  "#FFC6FF"
];

function UserSkillCard(props) {
  const { skill, index } = props;
  return (
    <div
      className={clsx("ui segment text-center user-skill-card")}
      style={{ backgroundColor: colors[index] }}>
      {skill}
    </div>
  );
}

export default UserSkillCard;
