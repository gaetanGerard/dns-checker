"use client";
import React, { useState, useCallback } from "react";
import NotificationContext from "./NotificationContext";
import { NotificationContextType, NotificationType } from "./types";

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState<null | {
    message: string;
    type: NotificationType;
  }>(null);

  const notify = useCallback(
    (message: string, type: NotificationType = "info") => {
      setNotification({ message, type });
    },
    []
  );

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notification, notify, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
