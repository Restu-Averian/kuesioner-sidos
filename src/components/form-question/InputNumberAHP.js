/* eslint-disable react-hooks/exhaustive-deps */
import { Col, InputNumber, Row } from "antd";
import React, { Fragment, useEffect } from "react";
import { consIndexDatas } from "../../constants/ahpRelated";
import { useSDContext } from "../../context";
import { extractNum, roundUp3, sumAllArrDatas } from "../../helpers";

const InputNumberAHP = ({ item, idxItem }) => {
  let totalEachKriteria = {};
  let timeout;

  const {
    arrValueEigenVector,
    stateQ2: state,
    setStateQ2: setState,
  } = useSDContext();

  const newValueOfSkalaChanged = (data, skalaData, value) => ({
    ...data?.skala,
    [skalaData]: value,
  });

  const newValueOfSkalaTargetted = (data, value) => {
    return {
      ...data?.skala,
      [`K${idxItem}`]: roundUp3(1 / value),
      // [`string_K${idxItem}`]: `1/${value}`,
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
          [`totalSkalaK${idxItem}`]: totalSkalaHandler(
            Object.values(newValueOfSkalaChanged(data, skalaData, value))
          ),
        };
      } else if (index + 1 === extractNum(skalaData)) {
        return {
          ...data,
          skala: newValueOfSkalaTargetted(data, value),
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
      {Object?.entries(item?.skala)?.map((skala) => {
        return (
          <Row gutter={8} align="middle" key={skala}>
            <Col span="auto">{skala?.[0]}</Col>
            <Col span={2}>
              <InputNumber
                {...(`K${idxItem}` === skala[0] && {
                  disabled: true,
                })}
                min={1}
                defaultValue={skala[1]}
                onChange={(value) => onChangeSkala(value, skala?.[0])}
              />
            </Col>
          </Row>
        );
      })}
    </Fragment>
  );
};

export default InputNumberAHP;
