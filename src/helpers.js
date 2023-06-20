import { addDoc, collection, getDocs } from "firebase/firestore";
import SDModalResult from "./components/sd-component-input/SDModalResult";
import dbFs from "./firebase";

const addDataHandler = async (data, setIsLoadingBtn) => {
  const arrDatas = [];
  const snapshots = await getDocs(collection(dbFs, "questions"));

  if (snapshots?.docs?.length === 0) {
    try {
      addDoc(collection(dbFs, "questions"), data)?.then(() => {
        SDModalResult({
          status: "success",
          subTitle: "Sukses mengirim data",
          title: "Sukses",
          onOkHandler: () => {
            setIsLoadingBtn(false);
            localStorage?.setItem("isFilled", true);
            localStorage?.setItem("kaprodi", data?.kaprodi_name);

            window.location.reload();
          },
        });
      });
    } catch (e) {
      SDModalResult({
        status: "error",
        subTitle: `Gagal mengirim data, pesan error : ${e}`,
        title: "Error",
        onOkHandler: () => {
          setIsLoadingBtn(false);
        },
      });
    }
  } else {
    snapshots?.forEach(async (doc) => {
      arrDatas?.push(doc?.data());
    });

    if (
      arrDatas?.some((dataDoc) => dataDoc?.kaprodi_name === data?.kaprodi_name)
    ) {
      SDModalResult({
        status: "error",
        subTitle: `Data dari ${data?.kaprodi_name} telah ada`,
        title: "Error",
        onOkHandler: () => {
          setIsLoadingBtn(false);
        },
      });
    } else {
      try {
        addDoc(collection(dbFs, "questions"), data)
          ?.then(() => {
            SDModalResult({
              status: "success",
              subTitle: "Sukses mengirim data",
              title: "Sukses",
              onOkHandler: () => {
                setIsLoadingBtn(false);
                localStorage?.setItem("isFilled", true);
                localStorage?.setItem("kaprodi", data?.kaprodi_name);
                window.location.reload();
              },
            });
          })
          .catch((e) => {
            SDModalResult({
              status: "error`",
              subTitle: `Gagal mengirim data, pesan : ${e}`,
              title: "Error",
              onOkHandler: () => {
                setIsLoadingBtn(false);
              },
            });
          });
      } catch (e) {
        SDModalResult({
          status: "error",
          subTitle: `Gagal mengirim data, pesan error : ${e}`,
          title: "Error",
          onOkHandler: () => {
            setIsLoadingBtn(false);
          },
        });
      }
    }
  }
};

const sortedData = (arrDatas, based) => {
  return arrDatas.sort((a, b) => {
    if (a?.[based] < b?.[based]) {
      return 1;
    }
    if (a?.[based] > b?.[based]) {
      return -1;
    }
    return 0;
  });
};

const extractNum = (string) => parseInt(string.replace(/\D/g, ""));

const sumAllArrDatas = (arr) => arr?.reduce((acc, curr) => acc + curr, 0);

const roundUp3 = (num) => Math.ceil(num * 1000) / 1000;

export { addDataHandler, sortedData, extractNum, sumAllArrDatas, roundUp3 };
