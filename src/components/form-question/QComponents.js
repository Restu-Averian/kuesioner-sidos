import { Col, Grid, Input, InputNumber, Radio, Row, Typography } from "antd";
import React, { Fragment } from "react";
import { benefitCost } from "../../constants/benefitCost";
import { sortedData } from "../../helpers";
import { DeleteOutlined } from "@ant-design/icons";
import IconDragNDrop from "../IconDragNDrop";

const QComponents = ({ item, idItem, state, setState, Qn }) => {
  const { xs } = Grid.useBreakpoint();
  const { Text } = Typography;
  let timeout;

  const onChangeHandler = ({ field, value }) => {
    const newArrDatas = state?.map((data) => {
      if (data?.id === idItem) {
        return {
          ...data,
          [field]: value,
        };
      }
      return data;
    });
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      setState(newArrDatas);
    }, 120);
  };

  const onChangeSkala = (value) => {
    const newValueSkala = state?.map((data) => {
      if (data?.id === idItem) {
        return {
          ...data,
          skala: value,
        };
      }
      return data;
    });

    sortedData(newValueSkala, "skala");
    setState(newValueSkala);
  };

  const onChangeKriteria = ({ target: { value } }) => {
    onChangeHandler({ field: "name", value });
  };

  const onChangeKeterangan = ({ target: { value } }) => {
    onChangeHandler({ field: "keterangan", value });
  };

  const onChangeBenCost = ({ target: { value } }) => {
    onChangeHandler({ field: "benefitCost", value });
  };

  const deleteHandler = () => {
    setState(state?.filter((data) => data?.id !== idItem));
  };

  return (
    <Row
      align="middle"
      justify={Qn === "Q2" ? "center" : "space-between"}
      gutter={32}
      {...(xs && { gutter: [16, 16] })}
    >
      <Col span="auto">
        <IconDragNDrop />
      </Col>
      <Col span={xs ? 24 : Qn === "Q3" ? 20 : 7}>
        {Qn === "Q2" && <Text type="secondary">Nama Kriteria</Text>}

        <Input defaultValue={item?.name} onChange={onChangeKriteria} />
      </Col>
      {Qn === "Q2" && (
        <Fragment>
          {xs ? (
            <Col span={24}>
              <Row justify="space-between" style={{ marginBottom: 10 }}>
                <Col span={10}>
                  <Text type="secondary">Skala prioritas</Text>
                  <InputNumber
                    min={1}
                    controls={false}
                    defaultValue={item?.skala}
                    onChange={onChangeSkala}
                  />
                </Col>
                <Col span={14}>
                  <Text type="secondary">Benefit/Cost</Text>
                  <Radio.Group
                    optionType="button"
                    options={benefitCost}
                    value={item?.benefitCost}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Text type="secondary">Keterangan</Text>

                  <Input.TextArea
                    defaultValue={item?.keterangan}
                    autoSize
                    onChange={onChangeKeterangan}
                  />
                </Col>
              </Row>
            </Col>
          ) : (
            <Fragment>
              <Col span={3}>
                <Text type="secondary">Skala prioritas</Text>
                <InputNumber
                  min={1}
                  controls={false}
                  defaultValue={item?.skala}
                  onChange={onChangeSkala}
                />
              </Col>
              <Col span={4}>
                <Text type="secondary">Benefit/Cost</Text>
                <Radio.Group
                  optionType="button"
                  options={benefitCost}
                  value={item?.benefitCost}
                  onChange={onChangeBenCost}
                />
              </Col>
              <Col span={6}>
                <Text type="secondary">Keterangan</Text>

                <Input.TextArea
                  defaultValue={item?.keterangan}
                  autoSize
                  onChange={onChangeKeterangan}
                />
              </Col>
            </Fragment>
          )}
        </Fragment>
      )}

      <Col span="auto">
        <DeleteOutlined
          style={{ color: "red", padding: 20, fontSize: 18 }}
          onClick={deleteHandler}
        />
      </Col>
    </Row>
  );
};

export default QComponents;
