import React from "react";
import useFetchData from "./useFetchData";
import ButchersLanding from "./ButchersContent/ButchersLanding";

const ButcherMenu = () => {
  const { status, butchers } = useFetchData();
  if (status==='fetched')
  return (
<>
<ButchersLanding />
</>
    );
};

export default ButcherMenu;
