import React from "react";

interface ErrorPanelProps {
  message: string;
  isError: boolean;
}
const NotificationPanel: React.FC<ErrorPanelProps> = ({ message, isError }) => {
  return (
    <div
      className={
        isError
          ? "p-3 mb-2 bg-danger text-white rounded-5"
          : "p-3 mb-2 bg-success text-white rounded-5"
      }
    >
      {message}
    </div>
  );
};

export default NotificationPanel;
