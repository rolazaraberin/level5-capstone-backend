import React from "react";
import Navbar from "components/bootstrap/Navbar";
import Layout from "components/Layout";
import Stylesheet from "components/Stylesheet";
import NavigationHooks from "components/NavigationHooks";
import ViewSkill7 from "skills/skill7/View";
import Skills from "skills/Skills";
import Skill7 from "skills/skill7/Skill7";

const stylesheet1 = "css/styles.css";
const stylesheet2 = "css/styles2.css";

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
          <Navbar.Link href="/" element={<Skills />}>
            Skills
          </Navbar.Link>
          <Navbar.Link href="/skill7" element={<Skill7 />}>
            Skill 7
          </Navbar.Link>
          <Navbar.Link href="/skill7-buy" element={<ViewSkill7 />} />
        </Navbar>
      </Navbar.Router>
    </Layout.Navigation>
  );
}

export default MainNavbar;
