import { getSession } from "next-auth/react";
import { API } from "../../configs/api";

export const withAuthSSR = (getSsrProps?: Function) => {
  return async (context: any) => {
    const session = await getSession(context);
    console.log(session, 'sesi')
    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/sign-in",
        },
        props: {},
      };
    } else {
      const user = await new API((session.accessToken as string) || null)
        .get("v1-mobile/globals/initial")
        .fetch()
      const {data} = user  
      console.log(data)
      if (!data) {
        context.res.writeHead(302, {
          // or 301
          Location: "/auth/sign-in",
        });
        context.res.end();
      }

      if (getSsrProps) {
        return {
          props: {
            user: data.user,
            data: await getSsrProps(context, data.user),
          },
        };
      }
    }
    return { props: {} };
  };
};
