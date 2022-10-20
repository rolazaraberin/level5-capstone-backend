import React from "react";
import Layout from "../components/Layout";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";
import "./About.scss";

function About() {
  return (
    <>
      <Layout.Banner>
        <Title>About</Title>
        <Subtitle>
          Create a data-driven web application and deploy it to a public url.
        </Subtitle>
      </Layout.Banner>

      <Layout.Content>
        <div className="info">
          Application should allow signup, require login, and perform all CRUD
          operations at least once. Data shown in the application should belong
          to the logged in user. Users should only see their own data.
          Application code should include at least 5 unique unit tests. jQuery
          should not be present in your application in any way.
        </div>
      </Layout.Content>
    </>
  );
}

export default About;
