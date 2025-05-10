import styles from "./Title.module.scss";

import { JSX } from "react";
import type { TitleProps } from "./Title.types";

const Title = ({ level = 1, children, className = "" }: TitleProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`${styles[`h${level}`]} ${styles[`${className}`]}`}>
      {children}
    </Tag>
  );
};

export default Title;
