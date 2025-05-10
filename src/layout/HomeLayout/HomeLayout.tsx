"use client";

import React from "react";
import styles from "./HomeLayout.module.scss";
import { HomeData, HomeFeature, HomeLink } from "./HomeLayout.types";
import homeData from "@/data/pages/home.json";
import * as Icons from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Title from "@/components/ui/Title/Title";

const HomeLayout = () => {
  const data = homeData as HomeData;
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <Title level={1} className="title">
          {data.title}
        </Title>
        <Title level={2} className="subtitle">
          {data.subtitle}
        </Title>
        <p className={styles.description}>{data.description}</p>
        <div className={styles.image}>
          <Image
            src={data.image.src}
            alt={data.image.alt}
            width={338}
            height={225}
            priority
          />
        </div>
      </header>

      <section className={styles.features}>
        {data.features.map((feature: HomeFeature, index: number) => {
          const LucideIcon = (Icons as any)[feature.lucidIcon] as
            | React.FC<any>
            | undefined;
          return (
            <div key={index} className={styles.feature}>
              {LucideIcon ? (
                <LucideIcon className={styles.icon} size={32} />
              ) : (
                <span className={styles.icon} />
              )}
              <h3 className={styles["feature-title"]}>{feature.title}</h3>
              <p className={styles["feature-description"]}>
                {feature.description}
              </p>
            </div>
          );
        })}
      </section>

      <div className={styles.links}>
        {data.links.map((link: HomeLink, idx: number) => (
          <Link href={link.href} key={idx} className={styles.link}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeLayout;
