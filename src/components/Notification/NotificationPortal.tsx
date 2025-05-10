"use client";
import { useEffect } from "react";
import Notification from "./Notification";
import useNotification from "@/hooks/notification/useNotification";

const NotificationPortal = () => {
  const { notification, clearNotification } = useNotification();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  if (!notification) return null;

  return (
    <Notification
      message={notification.message}
      type={notification.type}
      onClose={clearNotification}
    />
  );
};

export default NotificationPortal;
