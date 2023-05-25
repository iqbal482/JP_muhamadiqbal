import * as React from "react";
import { SignInView } from "@templates";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import withLayouts from "@components/__hocs/withLayouts";

/**
 * 描述
 * @date 2022-09-11
 * @return {React.Component}
 */
export const SignIn = ({csrfToken}: any) => {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('username'), data.get('password'));
    await signIn(
      "credentials",
      {
        redirect: true,
        callbackUrl: "/",
        username: data.get('username'),
        password: data.get('password'),
      }
    );
  };

  return (
    <SignInView
      error={router.query.error as string || undefined}
      csrfToken={csrfToken}
      onSignIn={handleSubmit}
      onForgotPassword={() => {}}
      onSignUp={() => {}}
    />
  );
}

export const getServerSideProps = async (context: any) => {
  const csrfToken = await getCsrfToken(context) || null;
  return {
    props: {
      csrfToken,
    },
  };
};

SignIn.getLayout = (page: any) => withLayouts(page, { mode: "mobile", withFooter: false, withHeader: false });

export default SignIn;