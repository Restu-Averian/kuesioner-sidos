import { Card } from "antd";
import React from "react";

const SDDnDWrapper = ({ children }) => {
  return (
    <Card bordered={false} style={{ margin: "10px 0" }}>
      {children}
    </Card>
  );
};

export default SDDnDWrapper;
