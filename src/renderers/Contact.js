import React from "react";
import Layout from "../components/Layout";
import Title from "../components/Title";

function Contact() {
  const id = "contact";

  return (
    <>
      <Layout.Banner>
        <Title>Contact</Title>
      </Layout.Banner>
      <Layout.Content id={id}>
        <div className="info" style={{ maxWidth: "25rem" }}>
          <p>Email: rolazaraberin@gmail.com</p>
          <p>
            Rolazar Aberin is currently studying at CodeX Academy for Full Stack
            Developer certifications.
          </p>
        </div>
      </Layout.Content>
    </>
  );
}

export default Contact;
