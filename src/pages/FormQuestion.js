/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, Typography } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import SDDnDWrapper from "../components/SDDnDWrapper";
import SDDragNDrop from "../components/sd-component-input/SDDragNDrop";
import SDSelect from "../components/sd-component-input/SDSelect";
import { dataQ1, dataQ2, dataQ3 } from "../constants/dataQ";
import { addDataHandler, sortedData } from "../helpers";
import QComponents from "../components/form-question/QComponents";
import { disabledButtonHandler } from "../constants/disabledButton";

const FormQuestion = ({ ipData }) => {
  const { Title, Text } = Typography;
  let tempArr = [];

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
    const newData = {
      id: stateQ2?.length + 1,
      name: "",
      benefitCost: "benefit",
      skala: 0,
      keterangan: "",
    };

    setStateQ2([...stateQ2, newData]);
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
    tempArr = [...stateQ2];

    sortedData(tempArr, "skala");
    setStateQ2(tempArr);
  }, [JSON.stringify(stateQ2)]);

  useEffect(() => {
    if (disabledButtonHandler(stateQ2, stateQ3)) {
      setIsDisabledButton(true);
    } else {
      setIsDisabledButton(false);
    }
  }, [JSON.stringify(stateQ2), JSON.stringify(stateQ3)]);

  return (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        <Title level={3}>Form Kuesioner </Title>
        <Title level={4}>Tugas Akhir Sistem Penentuan Dosen Pembimbing</Title>
        <Title level={5}>By : Restu Averian Putra</Title>
        <Text level={5}>
          Form ini ditujukan untuk pengumpulan data yang akan digunakan untuk
          sempro
        </Text>
      </div>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        labelCol={{
          span: 24,
        }}
        scrollToFirstError
      >
        <SDSelect
          name="kaprodi_name"
          label="Nama Kaprodi"
          listOptions={dataQ1}
          required
        />
        <SDDragNDrop
          label="Kriteria apa yang sekiranya digunakan oleh Kaprodi untuk menentukan seorang dosen untuk menjadi dosen pembimbing untuk seorang mahasiswa akhir ? (urutkan dari yang prioritas sampai tidak terlalu prioritas)"
          name="q2"
          state={stateQ2}
          setState={setStateQ2}
          formItemObj={{
            tooltip:
              "Bapak/Ibu bisa melakukan drag untuk menyusun prioritas kriteria, pilihan akan auto sort berdasarkan skala prioritas yang diberikan",
          }}
        >
          {stateQ2.map((item) => (
            <SDDnDWrapper key={item?.id}>
              <QComponents
                item={item}
                idItem={item?.id}
                state={stateQ2}
                setState={setStateQ2}
                Qn="Q2"
              />
            </SDDnDWrapper>
          ))}
        </SDDragNDrop>
        <Button style={{ width: "100%" }} type="primary" onClick={addQ2Data}>
          Tambah
        </Button>

        <SDDragNDrop
          label="Apakah urutan untuk penentuan dosen pembimbing di jurusan TI PNP pada saat ini telah benar ? kalau belum mohon untuk diurutkan"
          name="q3"
          state={stateQ3}
          setState={setStateQ3}
        >
          {stateQ3.map((item) => (
            <SDDnDWrapper key={item?.id}>
              <QComponents
                item={item}
                idItem={item?.id}
                state={stateQ3}
                setState={setStateQ3}
                Qn="Q3"
              />
            </SDDnDWrapper>
          ))}
        </SDDragNDrop>
        <Button type="primary" style={{ width: "100%" }} onClick={addQ3Data}>
          Tambah
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
    </Fragment>
  );
};

export default FormQuestion;
