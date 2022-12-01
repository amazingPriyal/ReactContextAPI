import React, { useEffect, useContext } from "react";

import TechContext from "../../context/techs/techContext";

const TechSelectOption = () => {
  const techContext = useContext(TechContext);
  const { getTechs, techs, loading } = techContext;

  useEffect(() => {
    getTechs();

    //eslint-disable-next-line
  }, []);

  return (
    !loading &&
    techs !== null &&
    techs.map((tech) => (
      <option key={tech.id} value={`${tech.firstName} ${tech.lastName}`}>
        {tech.firstName} {tech.lastName}{" "}
      </option>
    ))
  );
};

export default TechSelectOption;