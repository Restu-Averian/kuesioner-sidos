/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, Spin } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import LoadingComponent from "./components/LoadingComponent";
import dbFs from "./firebase";
import FormQuestion from "./pages/FormQuestion";

function App() {
  const [isLsExist, setIsLsExist] = useState(false);
  const [ipData, setIpData] = useState("");
  const [arrDatasFromFb, setArrDatasFromFb] = useState([]);
  const [isLoadingFields, setIsLoadingFields] = useState(true);

  const fetchIp = async () => {
    const response = await fetch("https://api.ipify.org/?format=json");
    const jsonData = await response.json();
    setIpData(jsonData?.ip);
  };

  const readDataHandler = async () => {
    getDocs(collection(dbFs, "questions"))
      ?.then((res) => {
        fetchIp();

        res?.forEach((data) => {
          setArrDatasFromFb([...new Set([...arrDatasFromFb, data?.data()])]);
        });
      })
      .finally(() => setIsLoadingFields(false));
  };

  useEffect(() => {
    setIsLsExist(localStorage?.getItem("isFilled"));
  }, [isLsExist]);

  useEffect(() => {
    readDataHandler();
  }, []);

  return (
    <Fragment>
      {isLoadingFields ? (
        <LoadingComponent />
      ) : (
        <Fragment>
          {isLsExist || arrDatasFromFb?.some((ele) => ele?.ip === ipData) ? (
            <h1>Terima kasih ya pak/buk</h1>
          ) : (
            <Layout.Content className="sd-main-content">
              <FormQuestion ipData={ipData} />
            </Layout.Content>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;
