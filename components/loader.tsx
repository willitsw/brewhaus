import { Spin } from "antd";
import React from "react";

interface LoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const Loading = ({ isLoading, children }: LoadingProps) => {
  if (isLoading) {
    return (
      <div
        style={{
          margin: "auto",
          width: 30,
          display: "flex",
          minHeight: 200,
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  return <>{children}</>;
};

export default Loading;
