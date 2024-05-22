import { RadioChangeEvent } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { getAllMixerList } from "services/dashboard/dashboard";
import {
  getDataLossBCTExternal,
  getDataLossBCTInternal,
  getDataOPE,
  handleDataCIPForChartByShift,
  handleDataOPEForChartByShift,
} from "services/ope-dashboard/opeDashBoardService";
import { IMixerResponse } from "types/response/dashboard/IMixerResponse";
import {
  IDataLossBCTExternal,
  IDataLossBCTInternal,
  IDataOPEByShift,
  IStackedBarChartByShift,
} from "types/response/ope-dashboard/IOPEDashboard";

const useOPEDashboard = () => {
  //statistic data
  const dateFormat = "YYYY/MM/DD";
  const minuteReload = 5;
  const shiftList = [
    { label: "Shift 1", value: "1" },
    { label: "Shift 2", value: "2" },
    { label: "Shift 3", value: "3" },
  ];

  // loading state
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(true);

  //filter state
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [mixerId, setMixerId] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [selectShift, setSelectShift] = useState<string[]>([shiftList[0].value]);

  //data state
  const [mixerList, setMixerList] = useState<IMixerResponse[]>([]);
  const [dataOPEByShift, setDataOPEByShift] = useState([] as IDataOPEByShift[]);
  const [dataLossBCTInternal, setDataLossBCTInternal] = useState([] as IDataLossBCTInternal[]);
  const [dataLossBCTExternal, setDataLossBCTExternal] = useState([] as IDataLossBCTExternal[]);
  const [mixer, setMixer] = useState<IMixerResponse>();

  //data chart state
  const [dataChartOPEByShift, setDataChartOPEByShift] = useState([] as IStackedBarChartByShift[]);
  const [dataChartCIPByShift, setDataChartCIPByShift] = useState([] as IStackedBarChartByShift[]);

  //other state
  const [timeReload, setTimeReload] = useState(minuteReload);

  //onChange filter function
  const onChange = (e: RadioChangeEvent) => {
    setMixer(e.target.value);
  };
  const onSelectorChangeMixer = (item: any) => {
    setMixerId(item);
  };
  const onShiftChange = (item: any) => {
    setSelectShift(item);
  };

  //fetch data
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeReload((prevTimeReload) => {
        if (prevTimeReload == 0) {
          setReload((prev) => !prev);
          return minuteReload;
        }
        return prevTimeReload - 1;
      });
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const callAPI = () => {
    getAllMixerList().then((res) => {
      const sortedMixerList = res.data.sort((a, b) => {
        return parseInt(a.name) - parseInt(b.name);
      });
      setMixerList(sortedMixerList);
      if ((mixer === undefined || mixer === null) && res.data.length > 0) {
        setMixer(sortedMixerList[sortedMixerList.length - 1] ?? "");
      }
    });
  };
  const fetchData = async (mixerId: string[]) => {
    setIsLoading(true);
    const [dataOPE, lossBCTInternal, lossBCTExternal] = await Promise.all([
      getDataOPE(startDate.toDate(), endDate.toDate(), mixerId, selectShift),
      getDataLossBCTInternal(startDate.toDate(), endDate.toDate(), mixerId, selectShift),
      getDataLossBCTExternal(startDate.toDate(), endDate.toDate(), mixerId, selectShift),
    ]).finally(() => {
      setIsLoading(false);
    });

    setDataOPEByShift(dataOPE);
    setDataChartOPEByShift(handleDataOPEForChartByShift(dataOPE));
    setDataLossBCTInternal(lossBCTInternal);
    setDataLossBCTExternal(lossBCTExternal);
    setDataChartCIPByShift(handleDataCIPForChartByShift(lossBCTExternal));
  };
  useEffect(() => {
    callAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchData(mixerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, mixerId, startDate, endDate, selectShift]);

  return {
    dateFormat,
    mixerList,
    mixer,
    dataOPEByShift,
    startDate,
    endDate,
    shiftList,
    dataChartOPEByShift,
    dataChartCIPByShift,
    dataLossBCTInternal,
    dataLossBCTExternal,
    isLoading,
    setMixer,
    onChange,
    onSelectorChangeMixer,
    onShiftChange,
    setMixerList,
    setEndDate,
    setStartDate,
  };
};

export default useOPEDashboard;
