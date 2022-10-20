import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import LandingPageEditor from "./LandingPageEditor";
import LandingPages from "./LandingPages";
import LandingPageViewer from "./LandingPageViewer";
import { Sandbox } from "../examples/Sandbox";

export const paths = {
  // home: "",
  // about: "about",
  // contact: "contact",
  // landingPages: "landing-pages",
  // landingPageEditor: "edit",
  home: "/",
  about: "/about",
  contact: "/contact",
  landingPages: "/landing-pages",
  landingPageEditor: "/landing-pages/edit",
  landingPageViewer: "/landing-pages/view",
};

//INFO - NESTED ROUTES - https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md

function PageRouter() {
  const to = paths;

  return (
    <Routes>
      <Route path={to.home} element={<Home />} />
      <Route path={to.about} element={<About />} />
      <Route path={to.contact} element={<Contact />} />
      <Route path={to.landingPages} element={<LandingPages />} />
      <Route path={to.landingPageEditor} element={<LandingPageEditor />}>
        <Route path=":docID" element={<LandingPageEditor />}></Route>
      </Route>
      <Route path={to.landingPageViewer} element={<LandingPageViewer />}>
        <Route path=":docID" element={<LandingPageViewer />}></Route>
      </Route>
      <Route path="/sandbox" element={<Sandbox />} />

      {/* <Route
        path={to.landingPageEditor + "/*"}
        element={<LandingPageEditor />}
      /> */}

      {/* <Route path="*" element={<Home />} /> */}
      {/* <Route path="/" element={<Navigate to="/skills" />} /> */}
      {/* <Route index element={<Home />} /> */}
      {/* <Route index element={<Navigate to="/skills" />} /> */}
      {/* <Route path="/index.html" element={<Navigate to="/skills" />} /> */}
      {/* <Route path="/index*" element={<Navigate to="/skills" />} /> */}
      {/* <Route path="/public/*" element={<Navigate to="/skills" />} /> */}

      {/* <Route path={to.landingPages} element={<UserPage />}> */}
      {/* <Route path={to.landingPageEditor} element={<LandingPageEditor />} /> */}
      {/* <Route path=":docID" element={<EditLandingPage />} /> */}
      {/* <Route index element={<>test</>} /> */}
      {/* <Route path=":docID" element={<LandingPageEditor />} /> */}
      {/* </Route> */}
    </Routes>
  );
}

export default PageRouter;
