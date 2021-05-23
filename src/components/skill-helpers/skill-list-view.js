import React, { Fragment, useMemo, useState } from "react";
import SkillCard from "./skill-card";
import { chunk } from "../../utils/array";
import { Pagination } from "semantic-ui-react";

function SkillListView(props) {
  const { skills, updateSelectedSkills, selectedSkills } = props;
  const collections = useMemo(() => {
    if (skills.length) {
      return chunk(skills, 10);
    }
    return [];
  }, [skills]);
  const [pageIndex, updatePageIndex] = useState(0);

  const handlePaginationChange = (e, { activePage }) => {
    updatePageIndex(() => activePage - 1);
  };

  return (
    <Fragment>
      {collections[pageIndex].map((skill) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          updateSelectedSkills={updateSelectedSkills}
          selectedSkills={selectedSkills}
        />
      ))}
      <Pagination
        boundaryRange={0}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        totalPages={collections.length}
        activePage={pageIndex + 1}
        onPageChange={handlePaginationChange}
      />
    </Fragment>
  );
}

export default SkillListView;
