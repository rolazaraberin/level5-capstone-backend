import React from "react";
import Layout from "../components/Layout";
import Section from "../components/Section";
import "./PageLayout.scss";

export default PageLayout;

function PageLayout() {
  return (
    <>
      <Layout>
        <Layout.Section id="Stylesheet" />
        <Layout.Section id="Banner" />
        <Layout.Section id="Navigation" />
        <Layout.Section id="Content" />
        <Layout.Section id="Footer" />
      </Layout>
    </>
  );
}
