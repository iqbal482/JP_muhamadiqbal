import * as React from "react";
import { SignUpView } from "@components/templates/sign-up";
import withLayouts from "@components/__hocs/withLayouts";
import { API } from "@configs";
import { useRouter } from "next/router";

/**
 * 描述
 * @date 2022-09-11
 * @return {React.Component}
 */
const SignUp = ({showAlert}: any)  => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    console.log({
      name: payload.get("name"),
      email: payload.get("email"),
      password: payload.get("password"),
    });

    const res = await new API(null, "/api/")
      .post("fetcher")
      .payload({
        url: "v1-mobile/register",
        method: "post",
        payload:{
          name: payload.get("name"),
          email: payload.get("email"),
          password: payload.get("password"),
        }
      })
      .fetch();

    const { data, error } = res.data;

    if (data && !error) {
      router.replace("/auth/sign-in");
      showAlert({
        open: true,
        message: "Registrasi Berhasil, Silakan Login",
        severity: "success",
      });
    }else{
      showAlert({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  return (
    <SignUpView
      error={undefined}
      csrfToken={"csrfToken"}
      onForgotPassword={() => {}}
      onSignUp={(e: any) => {handleSubmit(e)}}
      cekPassword={() => alert("salah")}
    />
  );
}

SignUp.getLayout = (page: any) =>
  withLayouts(page, { mode: "mobile", withFooter: false, withHeader: false });

export default SignUp;
