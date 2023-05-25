import * as React from "react";
import withLayouts from "@components/__hocs/withLayouts";
import { API } from "@configs";
import { useRouter } from "next/router";
import { EditProfileView } from "@components/templates/edit-profile";
import { useSession } from "next-auth/react";
import { withAuthSSR } from "@components/__hocs/with-auth-ssr";

/**
 * 描述
 * @date 2022-09-11
 * @return {React.Component}
 */
const EditProfile = ({ showAlert, user }: any) => {
  const router = useRouter();
  const session = useSession();
  console.log(user)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = new FormData(event.currentTarget);
    console.log({
      name: payload.get("nik"),
      email: payload.get("name"),
      password: payload.get("phone"),
      token: session.data?.accessToken,
    });

    const res = await new API(null, "/api/")
      .post("fetcher")
      .payload({
        url: "v1-mobile/my-profile",
        method: user?.profile !== null ? "put": "post",
        payload: {
          nik: payload.get("nik"),
          name: payload.get("name"),
          phone: payload.get("phone"),
        },  
        token: session.data?.accessToken,
      })
      .fetch();

    const { data, error } = res.data;

    if (data && !error) {
      router.replace("/profile");
      showAlert({
        open: true,
        message: "Data Berhasil; di Update,",
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

  return (
    <EditProfileView
      profile={user.profile}
      error={undefined}
      csrfToken={"csrfToken"}
      onEditProfile={(e: any) => {
        handleSubmit(e);
      }}
    />
  );
};

export const getServerSideProps = withAuthSSR(
  async (context: any, user: any) => {
    return user;
  }
);

EditProfile.getLayout = (page: any) =>
  withLayouts(page, { mode: "mobile", withFooter: false, withHeader: false });

export default EditProfile;
