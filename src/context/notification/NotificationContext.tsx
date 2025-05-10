"use client";
import { createContext } from "react";
import { NotificationContextType } from "./types";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export default NotificationContext;
