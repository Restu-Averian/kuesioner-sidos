/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Col,
  Form,
  Grid,
  Input,
  Modal,
  Row,
  Table,
  Tooltip,
  Typography,
} from "antd";
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
import {
  columnsTableSkalaBanding,
  dataSourceTableSkalaBanding,
} from "../constants/dataHintQ2";

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
  const [isOpenModalQ2, setIsOpenModalQ2] = useState(false);
  const [isOpenModalQ3, setIsOpenModalQ3] = useState(false);

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

  useEffect(() => {
    form?.setFieldsValue({
      q2: stateQ2,
    });
  }, [JSON.stringify(stateQ2)]);

  return (
    <Fragment>
      <div style={{ textAlign: "center", marginBottom: xs ? 80 : 50 }}>
        <Title level={3}>Form Kuesioner </Title>
        <Title level={4}>Tugas Akhir SPK Penentuan Dosen Pembimbing</Title>
        <Title level={5}>By : Restu Averian Putra</Title>
        <Text level={5}>
          Form ini dibuat untuk mendapatkan skala prioritas per kriteria
          berdasarkan preferensi Kaprodi jurusan TI PNP yang akan digunakan
          untuk pembangunan Tugas Akhir mengenai SPK Penentuan Dosen Pembimbing
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
              <Fragment>
                <Text strong style={{ fontSize: 16 }}>
                  Kriteria apa yang sekiranya digunakan oleh Kaprodi untuk
                  menentukan seorang dosen untuk menjadi dosen pembimbing untuk
                  seorang mahasiswa akhir ?
                </Text>

                <Tooltip title="Klik untuk lihat petunjuk sederhana">
                  <QuestionCircleFilled
                    style={{
                      fontSize: 20,
                      cursor: "pointer",
                      marginLeft: 10,
                    }}
                    onClick={() => setIsOpenModalQ2(true)}
                  />
                </Tooltip>
              </Fragment>
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

          {/* <SDDragNDrop
            labelComponent={
              <Fragment>
                <Text strong style={{ fontSize: 16 }}>
                  Apakah urutan untuk penentuan dosen pembimbing di jurusan TI
                  PNP pada saat ini telah benar ? kalau belum mohon untuk
                  diurutkan
                </Text>

                <Tooltip title="Klik untuk lihat petunjuk sederhana">
                  <QuestionCircleFilled
                    style={{
                      fontSize: 20,
                      marginLeft: 10,
                      cursor: "pointer",
                    }}
                    onClick={() => setIsOpenModalQ3(true)}
                  />
                </Tooltip>
              </Fragment>
            }
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
          </Button> */}

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

        <Modal
          open={isOpenModalQ2}
          onCancel={() => setIsOpenModalQ2(false)}
          // title="Mengenai AHP secara sederhana"
          okButtonProps={{
            style: {
              display: "none",
            },
          }}
          width={1000}
        >
          <Fragment>
            <Title level={4}>Disclaimer</Title>

            <Text>
              Pertanyaan ini akan ditujukan sebagai referensi dalam penentuan
              bobot dari masing-masing kriteria yang Bapak/Ibu Kaprodi berikan.
              Bobot masing-masing kriteria akan dibandingkan dengan kriteria
              lain berdasarkan table perbandingan skala yang ditampilkan di
              bawah ini. Tiap bobot yang diberikan, akan langsung dicek
              kestabilannya dengan kalkulasi AHP. Tidak ada salah dan benar atas
              bobot yang Bapak/Ibu Kaprodi berikan.
            </Text>

            <Title level={4}>Table Skala Banding Antar Kriteria</Title>
            <Table
              pagination={false}
              dataSource={dataSourceTableSkalaBanding}
              columns={columnsTableSkalaBanding}
            />
          </Fragment>
        </Modal>

        {/* <Modal
          open={isOpenModalQ3}
          onCancel={() => setIsOpenModalQ3(false)}
          // title="Mengenai AHP secara sederhana"
          okButtonProps={{
            style: {
              display: "none",
            },
          }}
          width={1000}
        >
          <Fragment>
            <Title level={4}>Disclaimer</Title>

            <Text>
              Pertanyaan ini akan digunakan untuk memastikan apakah urutan yang
              saya sediakan dibawah ini telah benar dalam penentuan dosen
              pembimbing sekarang di jurusan TI PNP
            </Text>
          </Fragment>
        </Modal> */}
      </SDContext.Provider>
    </Fragment>
  );
};

export default FormQuestion;
