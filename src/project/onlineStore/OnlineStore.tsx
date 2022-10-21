import React, { MouseEventHandler } from "react";
import Layout from "components/Layout";
import Title from "components/Title";
import Links from "components/Links";
import Subtitle from "components/Subtitle";
import { useNavigate } from "react-router-dom";
import View from "./View";

export default OnlineStore;

function OnlineStore() {
  const navigateTo = useNavigate();
  return (
    <>
      <Layout.Banner>
        <Title>Online Store</Title>
        <Subtitle>The best deals in town</Subtitle>
      </Layout.Banner>
      <Layout.Content>
        <View />
      </Layout.Content>
      <Layout.Footer>
        <Links>
          <a href="https://reactjs.org/docs/higher-order-components.html">
            Higher-Order Components
          </a>
        </Links>
      </Layout.Footer>
    </>
  );
}
