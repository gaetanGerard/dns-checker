import clsx from "clsx";
import React from "react";

import styles from "./Presentation.module.scss";
import type { PresentationProps } from "./Presentation.types";

const Presentation = ({
  text,
  className,
  align = "left",
}: PresentationProps) => {
  return (
    <p className={clsx(styles.presentation, styles[align], styles[className])}>
      {text}
    </p>
  );
};

export default Presentation;
