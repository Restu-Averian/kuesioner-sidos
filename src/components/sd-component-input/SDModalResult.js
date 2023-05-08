import { Button, Modal, Result } from "antd";
import React from "react";

const SDModalResult = ({ title, subTitle, status, onOkHandler }) => {
  const modal = Modal[status]();

  modal?.update({
    type: status,
    open: true,
    content: (
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={[
          <Button
            type="primary"
            key="ok"
            onClick={() => {
              Modal.destroyAll();
              if (onOkHandler) {
                onOkHandler();
              }
            }}
          >
            Ok
          </Button>,
        ]}
      />
    ),
    okButtonProps: {
      style: {
        display: "none",
      },
    },
  });
};

export default SDModalResult;
