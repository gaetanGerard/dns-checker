"use client";
import { usePathname } from "next/navigation";
import Preferences from "./Preferences/Preferences";

type Props = {};

const SettingsLayout = (props: Props) => {
  const pathname = usePathname();

  const slug = pathname?.split("/").pop();

  switch (slug) {
    case "preferences":
      return <Preferences />;
    default:
      return <div>Nothing to see for the moment - {slug}</div>;
  }
};

export default SettingsLayout;
