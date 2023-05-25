import styles from "../styles/Home.module.css";
import Switch from "@mui/material/Switch";
import { withAuthSSR } from "@components/__hocs/with-auth-ssr";

const label = { inputProps: { "aria-label": "Switch demo" } };

/**
 * 描述
 * @date 2022-09-11
 * @return {React.Component}
 */
export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <span>With default Theme:</span>
      </div>
      <Switch {...label} defaultChecked />
      <Switch {...label} />
      <Switch {...label} disabled defaultChecked />
    </div>
  );
}

export const getServerSideProps = withAuthSSR(
  async (context: any, user: any) => {
    return null;
  }
);
