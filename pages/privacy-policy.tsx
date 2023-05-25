/* eslint-disable require-jsdoc */
import React from "react";
import withLayouts from "@components/__hocs/withLayouts";
import { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";

const PrivacyPolicy = dynamic(() => import("@components/templates/privacy-policy"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
}) ;

/**
 * 描述
 * @date 2022-09-11
 * @return {React.Component}
 */
function App() {
  return (
    <PrivacyPolicy/>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {},
  };
}

App.getLayout = (page: any) => withLayouts(page, {
  mode: "regular"
});

export default App
