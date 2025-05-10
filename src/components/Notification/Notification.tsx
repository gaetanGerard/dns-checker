"use client";

import React, { useEffect } from "react";
import styles from "./Notification.module.scss";
import { NotificationProps } from "./Notification.types";
import clsx from "clsx";

export default function Notification({
  message,
  type = "info",
  onClose,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={clsx(styles.notification, styles[type])}
      onClick={onClose}
      role="alert"
    >
      {message}
    </div>
  );
}
