import { Form, Select, Typography } from "antd";
import React from "react";

const SDSelect = ({
  label,
  name,
  required = false,
  rules = [],
  onChange,
  listOptions = [],
  formItemObj = {},
  placeholder,
  props,
}) => {
  const { Text } = Typography;

  const modifiedRules = () => {
    let rulesCustom;
    if (required) {
      rulesCustom = [
        {
          required: true,
          message: `Tolong untuk mengisi field ${name} ya, Pak/Buk 🙏🏻 !`,
        },
      ];
    } else {
      rulesCustom = rules;
    }
    return rulesCustom;
  };

  return (
    <Form.Item
      label={
        <Text strong style={{ fontSize: 16 }}>
          {label}
        </Text>
      }
      name={name}
      rules={modifiedRules()}
      required={required}
      {...formItemObj}
    >
      <Select
        showSearch
        placeholder={placeholder !== undefined ? placeholder : "Select One"}
        onChange={onChange}
        options={listOptions}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input?.toLowerCase())
        }
        {...props}
      />
    </Form.Item>
  );
};

export default SDSelect;
