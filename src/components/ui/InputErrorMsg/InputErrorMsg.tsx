import styles from "./InputErrorMsg.module.scss";

export default function InputErrorMsg({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className={styles.error}>{children}</p>;
}
