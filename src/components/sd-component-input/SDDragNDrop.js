/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Grid, Typography } from "antd";
import React, { useEffect } from "react";
import { ReactSortable } from "react-sortablejs";

const SDDragNDrop = ({
  name,
  label,
  required = false,
  rules = [],
  children,
  state,
  setState,
  formItemObj = {},
  props,
}) => {
  const form = Form.useFormInstance();

  const { Text } = Typography;
  const { xs } = Grid.useBreakpoint();

  const modifiedRules = () => {
    let rulesCustom;
    if (required) {
      rulesCustom = [
        {
          required: true,
          message: `Please fill ${name} !`,
        },
      ];
    } else {
      rulesCustom = rules;
    }
    return rulesCustom;
  };

  useEffect(() => {
    form?.setFieldsValue({
      [name]: state,
    });
  }, [JSON.stringify(state)]);

  return (
    <Form.Item
      label={
        <Text strong style={{ fontSize: 16 }}>
          {label}
        </Text>
      }
      {...(xs && {
        style: { padding: 18 },
      })}
      name={name}
      required={required}
      rules={modifiedRules()}
      {...formItemObj}
    >
      <ReactSortable
        style={{ cursor: "grabbing" }}
        list={state}
        setList={setState}
        animation={200}
        {...props}
      >
        {children}
      </ReactSortable>
    </Form.Item>
  );
};

export default SDDragNDrop;
