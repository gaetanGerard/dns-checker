export type NotificationType = "success" | "error" | "info";

export type NotificationContextType = {
  notification: { message: string; type: NotificationType } | null;
  notify: (message: string, type?: NotificationType) => void;
  clearNotification: () => void;
};
