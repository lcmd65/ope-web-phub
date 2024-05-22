import { useEffect, useState } from "react";

const useLossInputForm = (dataReason: any[], lossDetail: any) => {
  const [nameSearch, setNameSearch] = useState("");
  const [cleanReason, setCleanReason] = useState(false);
  const [valueLevel1, setValueLevel1] = useState<any>("");
  const [valueLevel2, setValueLevel2] = useState<any>("");
  const [valueLevel3, setValueLevel3] = useState<any>("");
  const [dataLevel2, setDataLevel2] = useState<any>([]);
  const [dataLevel3, setDataLevel3] = useState<any>([]);
  const [returnData, setReturnData] = useState<boolean>(true);

  //set default reason value
  useEffect(() => {
    if (
      lossDetail?.ReasonLevel1.length == 0 &&
      lossDetail?.ReasonLevel2.length == 0 &&
      lossDetail?.ReasonLevel3.length == 0
    ) {
      setValueLevel1(4);
      setValueLevel2(null);
      setValueLevel3(null);
    } else {
      setValueLevel1(lossDetail?.ReasonLevel1.length > 0 ? lossDetail.ReasonLevel1[0]._id : null);
      setValueLevel2(lossDetail?.ReasonLevel2.length > 0 ? lossDetail.ReasonLevel2[0]._id : null);
      setValueLevel3(lossDetail?.ReasonLevel3.length > 0 ? lossDetail.ReasonLevel3[0]._id : null);
    }
  }, [lossDetail, returnData]);

  useEffect(() => {
    if (valueLevel1 && valueLevel1 !== 4) {
      setDataLevel2(dataReason.find((item: any) => item._id === valueLevel1).ReasonLevel2s);
    } else {
      setDataLevel2([]);
    }
    // eslint-disable-next-line
  }, [valueLevel1]);

  useEffect(() => {
    if (valueLevel2 && dataLevel2.length > 0) {
      setDataLevel3(dataLevel2.find((item: any) => item._id === valueLevel2).ReasonLevel3s);
    } else {
      setDataLevel3([]);
    }
    // eslint-disable-next-line
  }, [valueLevel2, dataLevel2]);

  return {
    nameSearch,
    setNameSearch,
    cleanReason,
    setCleanReason,
    valueLevel1,
    setValueLevel1,
    valueLevel2,
    setValueLevel2,
    valueLevel3,
    setValueLevel3,
    dataLevel2,
    setDataLevel2,
    dataLevel3,
    setDataLevel3,
    setReturnData,
  };
};

export default useLossInputForm;
