import React, { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import MainNavbar from "./MainNavbar";
// import NormalNavbar from "../skills/skill5/NormalNavbar";
// import HigherOrderNavbar from "../skills/skill5/HigherOrderNavbar";
import PageLayout from "./PageLayout";

function ReactApp() {
  const [didMount, setDidMount] = useState(false);
  useEffect(componentDidMount, []);
  return (
    <>
      <LoadingScreen>
        <PageLayout />
        {/* {didMount && <HigherOrderNavbar />} */}
        {/* {didMount && <NormalNavbar />} */}
        {didMount && <MainNavbar />}
      </LoadingScreen>
    </>
  );

  /*************************************/

  function componentDidMount() {
    setDidMount(true);
  }
}

export default ReactApp;
