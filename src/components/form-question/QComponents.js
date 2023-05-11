import { Col, Grid, Input, Radio, Row, Tooltip, Typography } from "antd";
import React, { Fragment } from "react";
import { benefitCost } from "../../constants/benefitCost";
import { DeleteOutlined } from "@ant-design/icons";
import IconDragNDrop from "../IconDragNDrop";
import InputNumberAHP from "./InputNumberAHP";
import { QuestionCircleFilled } from "@ant-design/icons";

const QComponents = ({ item, idxItem, state, setState, Qn }) => {
  const { xs } = Grid.useBreakpoint();
  const { Text } = Typography;
  // let timeoutKriteria;
  // let timeoutKeterangan;

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

    // timeout = setTimeout(() => {
    // }, 250);
    setState(newArrDatas);
  };

  const onChangeKriteria = ({ target: { value } }) => {
    // clearTimeout(timeoutKriteria);
    // timeoutKriteria = setTimeout(() => {
    //   onChangeHandler({ field: "name", value });
    // }, 150);
    onChangeHandler({ field: "name", value });
  };

  const onChangeKeterangan = ({ target: { value } }) => {
    // clearTimeout(timeoutKeterangan);
    // timeoutKeterangan = setTimeout(() => {
    // }, 250);
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
        delete data?.stringSkala?.[`K${idxItem}`];
      });

      const fixValueArrState = filteredState?.map((data) => {
        const arrNewValueSkala = Object.values(data?.skala)?.map(
          (valSkala, index) => {
            return {
              [`K${index + 1}`]: valSkala,
            };
          }
        );
        const arrNewValueStringSkala = Object.values(data?.stringSkala)?.map(
          (valStringSkala, index) => {
            return {
              [`K${index + 1}`]: valStringSkala,
            };
          }
        );

        const convertArrStateToObjSkala = arrNewValueSkala.reduce(
          (obj, item) => {
            const key = Object.keys(item)[0]; // Ambil kunci properti pertama dari objek saat ini
            obj[key] = item[key]; // Set properti pada objek akhir
            return obj;
          },
          {}
        );
        const convertArrStateToObjStringSkala = arrNewValueStringSkala.reduce(
          (obj, item) => {
            const key = Object.keys(item)[0]; // Ambil kunci properti pertama dari objek saat ini
            obj[key] = item[key]; // Set properti pada objek akhir
            return obj;
          },
          {}
        );

        return {
          ...data,
          skala: convertArrStateToObjSkala,
          stringSkala: convertArrStateToObjStringSkala,
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
      justify={xs ? "center" : "space-between"}
      gutter={32}
      {...(xs && { gutter: [16, 16] })}
    >
      {Qn === "Q3" && (
        <Col span="auto">
          <IconDragNDrop />
        </Col>
      )}
      <Col span={xs ? 24 : Qn === "Q3" ? 20 : 7}>
        {Qn === "Q2" && (
          <Text type="secondary">Nama Kriteria (K{idxItem})</Text>
        )}

        <Input
          defaultValue={item?.name}
          onChange={onChangeKriteria}
          value={item?.name}
        />
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
                    defaultValue={item?.keterangan}
                    autoSize
                    onChange={onChangeKeterangan}
                  />
                </Col>
              </Row>
            </Col>
          ) : (
            <Fragment>
              <Col span={5}>
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
                  defaultValue={item?.keterangan}
                  autoSize
                  onChange={onChangeKeterangan}
                />
              </Col>
            </Fragment>
          )}
        </Fragment>
      )}

      {state?.length > 3 && (Qn === "Q3" || (Qn === "Q2" && idxItem !== 1)) ? (
        <Col span="auto">
          <DeleteOutlined
            style={{ color: "red", padding: 20, fontSize: 18 }}
            onClick={deleteHandler}
          />
        </Col>
      ) : (
        <Fragment />
      )}

      {idxItem === 1 && Qn === "Q2" && (
        <Col span="auto">
          <Tooltip title="Perhitungan akan dilakukan dengan algoritma winnowing dengan membandingkan judul penelitian dosen dan judul yang diajukan">
            <QuestionCircleFilled
              style={{
                fontSize: 18,
                padding: 20,
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </Col>
      )}
    </Row>
  );
};

export default QComponents;
