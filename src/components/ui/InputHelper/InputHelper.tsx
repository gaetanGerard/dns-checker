import styles from "./InputHelper.module.scss";

export default function InputHelper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className={styles.helper}>{children}</p>;
}
