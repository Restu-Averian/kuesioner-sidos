/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Form, Grid, Input, Row, Tooltip, Typography } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import SDDnDWrapper from "../components/SDDnDWrapper";
import SDDragNDrop from "../components/sd-component-input/SDDragNDrop";
import SDSelect from "../components/sd-component-input/SDSelect";
import { dataQ1, dataQ2, dataQ3 } from "../constants/dataQ";
import { addDataHandler } from "../helpers";
import QComponents from "../components/form-question/QComponents";
import { disabledButtonHandler } from "../constants/disabledButton";
import SDContext from "../context";
import { QuestionCircleFilled } from "@ant-design/icons";

const FormQuestion = ({ ipData }) => {
  const { Title, Text } = Typography;

  let newSkalaData = {};
  let newStringSkalaData = {};

  let arrValueEigenVector = [];

  const { xs } = Grid.useBreakpoint();

  const [form] = Form?.useForm();

  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [stateQ2, setStateQ2] = useState(dataQ2);
  const [stateQ3, setStateQ3] = useState(dataQ3);

  const [isDisabledButton, setIsDisabledButton] = useState(false);

  const onFinish = () => {
    setIsLoadingBtn(true);
    addDataHandler(form?.getFieldsValue(), setIsLoadingBtn);
  };

  const addQ2Data = () => {
    for (let i = 0; i < stateQ2?.length + 1; i++) {
      newSkalaData[`K${i + 1}`] = 1 / 1;
      newStringSkalaData[`K${i + 1}`] = "1";
    }

    const newData = {
      id: stateQ2?.length + 1,
      name: "",
      benefitCost: "benefit",
      skala: newSkalaData,
      stringSkala: newStringSkalaData,
      keterangan: "",
    };

    const newDataExisting = stateQ2?.map((data, index) => {
      return {
        ...data,
        skala: {
          ...data?.skala,
          [`K${stateQ2?.length + 1}`]: 1 / 1,
        },
        stringSkala: {
          ...data?.stringSkala,
          [`K${stateQ2?.length + 1}`]: "1",
        },
      };
    });

    setStateQ2([...newDataExisting, newData]);
  };

  const addQ3Data = () => {
    const newData = {
      id: stateQ3?.length + 1,
      name: "",
    };

    setStateQ3([...stateQ3, newData]);
  };

  useEffect(() => {
    form?.setFieldsValue({
      ip: ipData,
    });
  }, [ipData]);

  useEffect(() => {
    if (disabledButtonHandler(stateQ2, stateQ3)) {
      setIsDisabledButton(true);
    } else {
      setIsDisabledButton(false);
    }
  }, [JSON.stringify(stateQ2), JSON.stringify(stateQ3)]);

  return (
    <Fragment>
      <div style={{ textAlign: "center", marginBottom: xs ? 80 : 50 }}>
        <Title level={3}>Form Kuesioner </Title>
        <Title level={4}>Tugas Akhir Sistem Penentuan Dosen Pembimbing</Title>
        <Title level={5}>By : Restu Averian Putra</Title>
        <Text level={5}>
          Form ini ditujukan untuk pengumpulan data yang akan digunakan untuk
          sempro
        </Text>
      </div>
      <SDContext.Provider
        value={{
          stateQ2,
          setStateQ2,
          arrValueEigenVector,
        }}
      >
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          scrollToFirstError
          {...(xs && {
            style: {
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            },
          })}
        >
          <SDSelect
            name="kaprodi_name"
            label="Nama Kaprodi"
            listOptions={dataQ1}
            required
          />
          <Form.Item
            label={
              <Text strong style={{ fontSize: 16 }}>
                Kriteria apa yang sekiranya digunakan oleh Kaprodi untuk
                menentukan seorang dosen untuk menjadi dosen pembimbing untuk
                seorang mahasiswa akhir ?
              </Text>
            }
            name="q2"
            // formItemObj={{
            //   tooltip:
            //     "Bapak/Ibu bisa melakukan drag untuk menyusun prioritas kriteria, pilihan akan auto sort berdasarkan skala prioritas yang diberikan",
            // }}
          >
            {stateQ2.map((item, index) => (
              <SDDnDWrapper key={index + 1}>
                <QComponents
                  item={item}
                  idxItem={index + 1}
                  state={stateQ2}
                  setState={setStateQ2}
                  Qn="Q2"
                  arrValueEigenVector={arrValueEigenVector}
                />
              </SDDnDWrapper>
            ))}
          </Form.Item>

          <Row
            align="middle"
            justify="space-between"
            style={{ marginBottom: 50 }}
          >
            {stateQ2?.length < 20 ? (
              <Col span={2}>
                <Button
                  type="primary"
                  onClick={addQ2Data}
                  size="large"
                  style={{ fontSize: 18, fontWeight: "bold" }}
                >
                  Tambah Kriteria
                </Button>
              </Col>
            ) : (
              <Fragment />
            )}
            <Col span="auto">
              <Row align="middle">
                <Col span={2}>
                  <Tooltip title="Bobot masing-masing kriteria akan dikatakan stabil kalau Consistency Ratio (CR) kecil dari 0.1">
                    <QuestionCircleFilled
                      style={{
                        fontSize: 20,
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </Col>
                <Col span={22}>
                  <Row>
                    <Col span={24}>
                      <Title level={4}>
                        Status Bobot prioritas :
                        <span
                          style={{
                            color: stateQ2?.[0]?.CR < 0.1 ? "green" : "red",
                          }}
                        >
                          {stateQ2?.[0]?.CR < 0.1 ? "Stabil" : "Tidak Stabil"}
                        </span>
                      </Title>
                    </Col>
                    <Col span={24}>
                      <Text style={{ fontSize: 16 }}>
                        Consistency Ratio : {stateQ2?.[0]?.CR}
                      </Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>

          <SDDragNDrop
            label="Apakah urutan untuk penentuan dosen pembimbing di jurusan TI PNP pada saat ini telah benar ? kalau belum mohon untuk diurutkan"
            name="q3"
            state={stateQ3}
            setState={setStateQ3}
          >
            {stateQ3.map((item, index) => (
              <SDDnDWrapper key={index}>
                <QComponents
                  item={item}
                  idxItem={index + 1}
                  state={stateQ3}
                  setState={setStateQ3}
                  Qn="Q3"
                  arrValueEigenVector={arrValueEigenVector}
                />
              </SDDnDWrapper>
            ))}
          </SDDragNDrop>
          <Button
            type="primary"
            onClick={addQ3Data}
            size="large"
            style={{ fontSize: 18, fontWeight: "bold" }}
          >
            Tambah Tahapan
          </Button>

          <Form.Item hidden name="ip">
            <Input hidden />
          </Form.Item>

          <Form.Item style={{ margin: "50px 0 " }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoadingBtn}
              disabled={isDisabledButton}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </SDContext.Provider>
    </Fragment>
  );
};

export default FormQuestion;
