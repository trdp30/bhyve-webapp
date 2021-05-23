import React, { Fragment, useMemo, useState } from "react";
import SkillCard from "./skill-card";
import { chunk } from "../../utils/array";
import { Pagination } from "semantic-ui-react";

function SkillListView(props) {
  const { skills, updateSelectedSkills, selectedSkills, request } = props;
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

  if (request.isLoading) {
    return (
      <div className="row skill-wrapper">
        <div className="middle aligned column">Loading...</div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="row skill-wrapper">
        {skills && skills.length ? (
          <>
            {collections[pageIndex].map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                updateSelectedSkills={updateSelectedSkills}
                selectedSkills={selectedSkills}
              />
            ))}
          </>
        ) : (
          <div className="middle aligned column">
            <div>No skills found</div>
          </div>
        )}
      </div>
      <div className="row">
        <div className="sixteen middle aligned wide column">
          <Pagination
            boundaryRange={0}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            totalPages={collections.length}
            activePage={pageIndex + 1}
            onPageChange={handlePaginationChange}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default SkillListView;
