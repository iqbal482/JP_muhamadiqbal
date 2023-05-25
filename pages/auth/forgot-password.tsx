import { ForgotPasswordView } from "@components/templates/forgot-password";
import withLayouts from "@components/__hocs/withLayouts";
import { API } from "@configs";
import { useRouter } from "next/router";
import * as React from "react";

/**
 * 描述
 * @date 2022-09-11
 * @return {React.Component}
 */
export const ForgotPassword = ({ showAlert }: any) => {
  const router = useRouter();
  const [reset, setReset] = React.useState(false);
  const validasi = async (email: string, otp: string) => {
    const res = await new API(null, "/api/")
      .post("fetcher")
      .payload({
        url: "v2/reset-password/otp-validate",
        method: "post",
        payload: {
          email: email,
          otp:otp,
        },
      })
      .fetch();

    const { data, error } = res.data;

    if (data && !error) {
      showAlert({
        open: true,
        message: "verifikasi berhasil, silakan masukan password baru",
        severity: "success",
      });
      setReset(true);
    } else {
      showAlert({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };
  const sendOtp = async (email: string) => {
    const res = await new API(null, "/api/")
      .post("fetcher")
      .payload({
        url: "v2/reset-password",
        method: "get",
        payload: {
          email:email,
        },
      })
      .fetch();

    const { data, error } = res.data;

    if (data && !error) {
      showAlert({
        open: true,
        message: "Kode Verifikasi Berhasil di Kirim, Silakan Cek Email Anda",
        severity: "success",
      });
    } else {
      showAlert({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };
  const resetPassword = async (
    email: string,
    otp: string,
    password: string,
    confirmPassword: string
  ) => {
    const res = await new API(null, "/api/")
      .post("fetcher")
      .payload({
        url: "v2/reset-password",
        method: "post",
        payload: {
          email: email,
          otp: otp,
          password: password,
          confirmPassword: confirmPassword,
        },
      })
      .fetch();

    const { data, error } = res.data;

    if (data && !error) {
      showAlert({
        open: true,
        message: "Password Berhasil di Ubah, Silahkan Login Kembali",
        severity: "success",
      });
      router.replace("/auth/sign-in");
    } else {
      showAlert({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    console.log({
      email: payload.get("email"),
    });

    
  };
  return (
    <>
      <ForgotPasswordView
        error={(router.query.error as string) || undefined}
        onSignIn={() => handleSubmit}
        onForgotPassword={(email: string, otp: string) => validasi(email, otp)}
        onSignUp={() => {}}
        cekPassword={() => alert("salah")}
        sendOtp={(email: string) => sendOtp(email)}
        resetPassword={(email: string, otp: string, password: string, confirmPassword: string) => resetPassword(email, otp, password, confirmPassword)}
        reset={reset}
      />
    </>
  );
};


ForgotPassword.getLayout = (page: any) =>
  withLayouts(page, { mode: "mobile", withFooter: false, withHeader: false });

export default ForgotPassword;
