import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { getAllMixerList } from "services/dashboard/dashboard";
import { getBatchHistoryList } from "services/history/history";
import { getOPEStepMixerAverage } from "services/ope-dashboard/opeDashboardComparisonService";
import { IMixerResponse } from "types/response/dashboard/IMixerResponse";
import { IBatch } from "types/response/history/Ibatch";
import { IDataOPEStepMixerAverage } from "types/response/ope-dashboard/IOPEDashboard";

const useOPEComparison = () => {
  //statistic data
  const dateFormat = "YYYY/MM/DD";
  const shiftList = [
    { label: "Shift 1", value: "1" },
    { label: "Shift 2", value: "2" },
    { label: "Shift 3", value: "3" },
  ];

  //handling state
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(true);

  //filter state
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [mixer, setMixer] = useState<IMixerResponse>();
  const [mixerId, setMixerId] = useState<string[]>([]);
  const [batchNo, setBatchNo] = useState<string>("");
  const [selectShift, setSelectShift] = useState<string[]>([shiftList[0].value]);

  //data state
  const [mixerList, setMixerList] = useState<IMixerResponse[]>([]);
  const [batchNoList, setBatchNoList] = useState<IBatch[]>([]);
  const [dataOPEStepMixerAverage, setDataOPEStepMixerAverage] = useState({} as IDataOPEStepMixerAverage);

  //fetch data
  const interval = setTimeout(() => {
    setReload((prev) => !prev);
  }, 300000);
  const fetchData = async () => {
    setIsLoading(true);

    await getOPEStepMixerAverage(startDate.toDate(), endDate.toDate(), mixerId, selectShift, batchNo)
      .then((res) => {
        setDataOPEStepMixerAverage(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, mixerId, startDate, endDate, selectShift, batchNo]);
  useEffect(() => {
    fetchData();
    handleMixerList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //filter change
  const onSelectorChangeMixer = (item: any) => {
    setMixerId(item);
  };
  const onShiftChange = (item: any) => {
    setSelectShift(item);
  };
  const onChangeBatchNo = (item: any) => {
    setBatchNo(item);
  };

  //handle batch no list
  useEffect(() => {
    if (mixerId.length > 0) {
      getBatchHistoryList(mixerId).then((res) => {
        setBatchNoList(res.data);
      });
    } else {
      setBatchNoList([]);
      setBatchNo("");
    }
  }, [mixerId]);

  //other function
  const handleMixerList = () => {
    getAllMixerList().then((res) => {
      const sortedMixerList = res.data.sort((a, b) => {
        return parseInt(a.name) - parseInt(b.name);
      });
      setMixerList(sortedMixerList);
      setMixerId([sortedMixerList[0]?.mixer_id] ?? "");
      if ((mixer === undefined || mixer === null) && res.data.length > 0) {
        setMixer(sortedMixerList[sortedMixerList.length - 1] ?? "");
      }
    });
  };

  return {
    mixer,
    mixerList,
    dateFormat,
    shiftList,
    startDate,
    endDate,
    dataOPEStepMixerAverage,
    isLoading,
    batchNoList,
    batchNo,
    onShiftChange,
    onSelectorChangeMixer,
    setEndDate,
    setStartDate,
    onChangeBatchNo,
  };
};

export default useOPEComparison;
