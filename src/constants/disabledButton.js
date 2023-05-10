const Q2DisabledButtonHandler = (stateQ2) => {
  return (
    stateQ2?.some((data) => data?.name === "") ||
    stateQ2?.length === 0 ||
    stateQ2?.some((data) => data?.keterangan === "") ||
    stateQ2?.some((data) => data?.skala === null) ||
    stateQ2[0]?.CR < 0.1
  );
};
const Q3DisabledButtonHandler = (stateQ3) => {
  return (
    stateQ3?.some((data) => data?.name === "") ||
    stateQ3?.length === 0 ||
    stateQ3?.some((data) => data?.keterangan === "")
  );
};

const disabledButtonHandler = (stateQ2, stateQ3) => {
  return Q2DisabledButtonHandler(stateQ2) || Q3DisabledButtonHandler(stateQ3);
};

export { disabledButtonHandler };
