import Link from "next/link";
import Image from "next/image";

import logoData from "@/data/images.json";
import styles from "./Logo.module.scss";

const Logo = () => {
  const { src, alt, width, height, href } = logoData.logo;
  return (
    <div className={styles.logo}>
      <Link href={href}>
        <Image src={src} alt={alt} width={width} height={height} />
      </Link>
    </div>
  );
};

export default Logo;
