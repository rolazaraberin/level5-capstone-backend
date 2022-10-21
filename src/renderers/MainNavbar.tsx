import React from "react";
import Navbar from "components/bootstrap/Navbar";
import Layout from "components/Layout";
import Stylesheet from "components/Stylesheet";
import NavigationHooks from "components/NavigationHooks";
import View from "project/onlineStore/View";
import Project from "project/Project";
import OnlineStore from "project/onlineStore/OnlineStore";
export default MainNavbar;
export const URL = {
  // const URL = {
  home: "/",
  onlineStore: "/online-store",
  onlineStoreBuy: "/online-store-buy",
};
const stylesheet1 = "css/styles.css";
const stylesheet2 = "css/styles2.css";

// export { URL, url };

function MainNavbar() {
  return (
    <Layout.Navigation>
      <Navbar.Router>
        <Navbar id="main-navbar">
          <Stylesheet.Switch>
            <Stylesheet href={stylesheet1} />
            <Stylesheet href={stylesheet2} />
          </Stylesheet.Switch>
          <NavigationHooks />
          <Navbar.Link href={URL.home} element={<Project />}>
            Project
          </Navbar.Link>
          <Navbar.Link href={URL.onlineStore} element={<OnlineStore />}>
            Online Store
          </Navbar.Link>
          <Navbar.Link href={URL.onlineStoreBuy} element={<View />} />
        </Navbar>
      </Navbar.Router>
    </Layout.Navigation>
  );
}
