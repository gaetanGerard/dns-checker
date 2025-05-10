export type NotificationType = "success" | "error" | "info";

export interface NotificationProps {
  message: string;
  type?: NotificationType;
  onClose: () => void;
}