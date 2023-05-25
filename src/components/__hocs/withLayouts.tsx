/* eslint-disable react/display-name */
import Layouts from "@components/templates/layouts";
import { Fragment } from "react";

type NextLayouts = {
  mode: "mobile" | "regular",
  withHeader?: boolean,
  withFooter?: boolean,
}

// export type NextPageWithLayout
export type NextPageWithLayout = {
  (d?: any): JSX.Element;
}

// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout,
// }

// eslint-disable-next-line require-jsdoc
export default function withLayouts(page: any, layouts: NextLayouts) {
  const { mode, withFooter, withHeader } = layouts;

  return (
    <Fragment>
      {mode === "mobile" &&
        <Layouts.Mobile withHeader={withHeader} withFooter={withFooter} >{page}</Layouts.Mobile>
      }
      {mode === "regular" &&
        <Layouts.Regular withHeader={withHeader || true} withFooter={withFooter || true} >{page}</Layouts.Regular>
      }
    </Fragment>
  )
};
