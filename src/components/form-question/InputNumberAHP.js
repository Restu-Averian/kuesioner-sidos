/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Select, Typography } from "antd";
import React, { Fragment, useEffect } from "react";
import { consIndexDatas } from "../../constants/ahpRelated";
import valSkala from "../../constants/valSkala";
import { useSDContext } from "../../context";
import { extractNum, roundUp3, sumAllArrDatas } from "../../helpers";

const InputNumberAHP = ({ item, idxItem }) => {
  let totalEachKriteria = {};
  let timeout;
  const { Text } = Typography;

  const {
    arrValueEigenVector,
    stateQ2: state,
    setStateQ2: setState,
  } = useSDContext();

  const newValueOfSkalaChanged = (data, skalaData, value) => ({
    ...data?.skala,
    [skalaData]: value,
  });
  const newValueStringSkalaChanged = (data, skalaData, value) => ({
    ...data?.stringSkala,
    [skalaData]: value?.toString(),
  });

  const newValueOfSkalaTargetted = (data, value) => {
    return {
      ...data?.skala,
      [`K${idxItem}`]: roundUp3(1 / value),
    };
  };
  const newValueStringSkalaTargetted = (data, value) => {
    return {
      ...data?.stringSkala,
      [`K${idxItem}`]: `1/${value}`,
    };
  };

  const totalSkalaHandler = (arr) => sumAllArrDatas(arr);

  const totalSkalaPerKriteria = () => {
    state?.forEach((item) => {
      Object?.keys(item?.skala)?.forEach((KCode) => {
        totalEachKriteria[KCode] = sumAllArrDatas(
          state?.map((dataState) => dataState?.skala?.[KCode])
        );
      });
    });
  };

  const AHPCalculateHandler = () => {
    totalSkalaPerKriteria();

    const eigenVectorPerData = Object.keys(item?.skala).reduce((acc, key) => {
      acc[key] = item?.skala[key] / totalEachKriteria?.[key];
      return acc;
    }, {});

    if (arrValueEigenVector?.length + 1 <= state?.length) {
      arrValueEigenVector?.push(
        sumAllArrDatas(Object?.values(eigenVectorPerData)) / state?.length
      );
    }

    const lambdaMax = arrValueEigenVector?.reduce((total, data, index) => {
      return (total += data * totalEachKriteria[`K${index + 1}`]);
    }, 0);

    const consistencyIndex = (lambdaMax - state?.length) / (state?.length - 1);

    const consistencyRatio =
      consistencyIndex /
      consIndexDatas?.find((ciData) => ciData?.n === state?.length)?.IR;

    setState(
      state?.map((data) => ({
        ...data,
        CR: roundUp3(consistencyRatio),
      }))
    );
  };

  //   // buat array baru yg isinya hasil perkalian antara totalSkala dengan eigenVector

  const onChangeSkala = (value, skalaData) => {
    const newValue = state?.map((data, index) => {
      if (index + 1 === idxItem) {
        return {
          ...data,
          skala: newValueOfSkalaChanged(data, skalaData, value),
          stringSkala: newValueStringSkalaChanged(data, skalaData, value),
          [`totalSkalaK${idxItem}`]: totalSkalaHandler(
            Object.values(newValueOfSkalaChanged(data, skalaData, value))
          ),
        };
      } else if (index + 1 === extractNum(skalaData)) {
        return {
          ...data,
          skala: newValueOfSkalaTargetted(data, value),
          stringSkala: newValueStringSkalaTargetted(data, value),
          [`totalSkalaK${idxItem}`]: totalSkalaHandler(
            Object.values(newValueOfSkalaTargetted(data, value))
          ),
        };
      }
      return data;
    });

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      setState(newValue);
    }, 250);
  };

  useEffect(() => {
    AHPCalculateHandler();
  }, [JSON.stringify(state)]);

  return (
    <Fragment>
      {Object?.entries(item?.skala)?.map((skala, index) => {
        return (
          <Row
            gutter={[8, 8]}
            align="middle"
            justify="center"
            key={skala}
            style={{ marginBottom: 15 }}
          >
            <Col span="auto">{skala?.[0]}</Col>
            <Col span={6}>
              <Text keyboard>{item?.stringSkala?.[skala[0]]}</Text>{" "}
            </Col>

            <Col span={14}>
              <Select
                showSearch
                onChange={(value) => onChangeSkala(value, skala?.[0])}
                options={valSkala}
                defaultValue={skala[1]}
                {...(`K${idxItem}` === skala[0] && {
                  disabled: true,
                })}
              />
              {/* <InputNumber
                {...(`K${idxItem}` === skala[0] && {
                  disabled: true,
                })}
                min={1}
                style={{ width: 70 }}
                defaultValue={skala[1]}
                onChange={(value) => onChangeSkala(value, skala?.[0])}
              /> */}
            </Col>
          </Row>
        );
      })}
    </Fragment>
  );
};

export default InputNumberAHP;
