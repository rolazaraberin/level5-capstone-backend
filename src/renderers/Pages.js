import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Firebase, { useFirebase } from "../scripts/Firebase";
import Root from "../components/Root";
import { objectReducer } from "../scripts/utilityFunctionsReact";
import MainNavbar from "./MainNavbar";
import AuthNavbar from "./AuthNavbar";
import PageRouter from "./PageRouter";
import AuthModals from "./AuthModals";
import NavigationHooks from "../components/NavigationHooks";
import Navigation from "../components/Navigation";

export default Pages;

//INFO - REACT ROUTER - https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
//INFO - REDIRECT WITH NAVIGATE - https://stackoverflow.com/a/70515490/18124211
//INFO - INDEX - https://coderecharge.com/reactjs/react-route/react-js-error-no-routes-matched-location-solution

function Pages() {
  //let [firebase, setFirebase] = useReducer(objectReducer, null);
  let [isMounted, setIsMounted] = useState(false);
  let firebase = useFirebase();
  useEffect(componentDidUpdate);

  return (
    <>
      <Navigation>
        <BrowserRouter>
          <NavigationHooks />
          <MainNavbar />
          {firebase && <AuthNavbar />}
          <PageRouter />
        </BrowserRouter>
        {/* <Root>{firebase && <AuthModals />}</Root> */}
        {firebase && <AuthModals />}
      </Navigation>
    </>
  );

  /*************************************/

  function componentDidUpdate() {
    if (!isMounted) {
      setIsMounted(true);
    }
  }
}
