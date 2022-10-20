import React from "react";
import Title from "../components/Title";
import "./Home.scss";
import Links from "../components/Links";
import Layout from "../components/Layout";

function Home() {
  const id = "home";

  return (
    <>
      <Layout.Banner>
        <Title>Home</Title>
      </Layout.Banner>
      <Layout.Content id={id}>
        <div className="info">
          Combine the knowledge from previous badges and deploy a functional
          browser application to Firebase. Web application must properly
          implement/utilize skills required in the badges contained in the same
          level.
        </div>
      </Layout.Content>
      <Layout.Footer>
        <Links>
          <a href="https://github.com/rolazaraberin/level3-capstone">Github</a>
          <a href="https://codex-level-3-capstone.web.app/">Firebase hosting</a>
          <a href="https://console.firebase.google.com/project/codex-level-3-capstone/firestore">
            Firebase db
          </a>
        </Links>
      </Layout.Footer>
    </>
  );
}

export default Home;
