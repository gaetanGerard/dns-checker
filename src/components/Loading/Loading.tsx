import React from "react";

import styles from "./Loading.module.scss";

type Props = { loadingText?: string };

const Loading = ({ loadingText }: Props) => {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles.loader}></div>
      {loadingText && <p className={styles["loading-text"]}>{loadingText}</p>}
    </div>
  );
};

export default Loading;
