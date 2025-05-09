"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import navigationData from "@/data/navigation.json";
import styles from "./Navigation.module.scss";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className={styles.navigation}>
        {navigationData.map((link, index) => {
          const isActive = pathname === link.href;

          return (
            <li
              key={index}
              className={`${styles["nav-link"]} ${isActive ? styles.active : ""}`}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
