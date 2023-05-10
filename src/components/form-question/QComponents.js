import { Col, Grid, Input, Radio, Row, Typography } from "antd";
import React, { Fragment } from "react";
import { benefitCost } from "../../constants/benefitCost";
import { DeleteOutlined } from "@ant-design/icons";
import IconDragNDrop from "../IconDragNDrop";
import InputNumberAHP from "./InputNumberAHP";

const QComponents = ({ item, idxItem, state, setState, Qn }) => {
  const { xs } = Grid.useBreakpoint();
  const { Text } = Typography;
  let timeout;

  const onChangeHandler = ({ field, value }) => {
    const newArrDatas = state?.map((data, index) => {
      if (index + 1 === idxItem) {
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
    }, 250);
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
    const filteredState = state?.filter((data, index) => {
      return index + 1 !== idxItem;
    });
    if (Qn === "Q2") {
      filteredState?.forEach((data) => {
        delete data?.skala?.[`K${idxItem}`];
      });

      const fixValueArrState = filteredState?.map((data) => {
        const arrNewValueSkala = Object.values(data?.skala)?.map(
          (valSkala, index) => {
            return {
              [`K${index + 1}`]: valSkala,
            };
          }
        );

        const convertArrStateToObj = arrNewValueSkala.reduce((obj, item) => {
          const key = Object.keys(item)[0]; // Ambil kunci properti pertama dari objek saat ini
          obj[key] = item[key]; // Set properti pada objek akhir
          return obj;
        }, {});

        return {
          ...data,
          skala: convertArrStateToObj,
        };
      });

      setState(fixValueArrState);
    } else {
      setState(filteredState);
    }
  };

  return (
    <Row
      align="middle"
      justify={Qn === "Q2" || xs ? "center" : "space-between"}
      gutter={32}
      {...(xs && { gutter: [16, 16] })}
    >
      <Col span="auto">
        <IconDragNDrop />
      </Col>
      <Col span={xs ? 24 : Qn === "Q3" ? 20 : 7}>
        {Qn === "Q2" && (
          <Text type="secondary">Nama Kriteria (K{idxItem})</Text>
        )}

        <Input value={item?.name} onChange={onChangeKriteria} />
      </Col>
      {Qn === "Q2" && (
        <Fragment>
          {xs ? (
            <Col span={24}>
              <Row justify="space-between" style={{ marginBottom: 10 }}>
                <Col span={10}>
                  <Text type="secondary">Skala prioritas</Text>

                  <InputNumberAHP item={item} idxItem={idxItem} />
                </Col>
                <Col span={14}>
                  <Text type="secondary">Benefit/Cost</Text>
                  <Radio.Group
                    optionType="button"
                    options={benefitCost}
                    value={item?.benefitCost}
                    onChange={onChangeBenCost}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Text type="secondary">Keterangan</Text>

                  <Input.TextArea
                    value={item?.keterangan}
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
                <InputNumberAHP item={item} idxItem={idxItem} />
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
                  value={item?.keterangan}
                  autoSize
                  onChange={onChangeKeterangan}
                />
              </Col>
            </Fragment>
          )}
        </Fragment>
      )}

      {state?.length > 3 ? (
        <Col span="auto">
          <DeleteOutlined
            style={{ color: "red", padding: 20, fontSize: 18 }}
            onClick={deleteHandler}
          />
        </Col>
      ) : (
        <Fragment />
      )}
    </Row>
  );
};

export default QComponents;
