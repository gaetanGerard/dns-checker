import Logo from "@/components/Logo/Logo";
import Navigation from "@/components/Navigation/Navigation";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
    </header>
  );
};

export default Header;
