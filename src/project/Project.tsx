import * as React from "react";
import Layout from "components/Layout";
import Title from "components/Title";
import Subtitle from "components/Subtitle";
import Links from "components/Links";

function Project() {
  return (
    <>
      <Layout.Banner>
        <Title>Full-Stack Developer Level 4 Capstone Project</Title>
        <Subtitle>
          Create a data-driven web application and deploy it to a public url.
        </Subtitle>
      </Layout.Banner>
      <Layout.Content>
        <ol>
          <li>
            Combine the knowledge from previous badges and deploy a functional
            browser application. Web application must properly implement/utilize
            skills required in the badges contained in the same level.
          </li>
          <li>
            Application code should include at least 10 unique unit tests in
            each language used (ex: JavaScript, TypeScript, C#, Python, etc).
          </li>
        </ol>
      </Layout.Content>
      <Layout.Footer>
        <Links>
          <a href="https://egghead.io/courses/getting-started-with-redux">
            Getting Started with Redux
          </a>
          <a href="https://learnredux.com/">Learn Redux</a>
          <a href="https://react-redux.js.org/">Redux Docs</a>
          <a href="https://facebook.github.io/flux/docs/in-depth-overview">
            Flux In-Depth Overview
          </a>
          <a href="https://soshace.com/how-to-use-the-redux-dev-tools-to-speed-up-development-and-debugging/">
            Redux DevTools
          </a>
        </Links>
      </Layout.Footer>
    </>
  );
}

export default Project;
