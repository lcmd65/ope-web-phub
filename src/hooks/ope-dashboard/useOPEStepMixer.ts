import { RadioChangeEvent } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { getAllMixerList } from "services/dashboard/dashboard";
import {
  getOPEStepMixerDate,
  getOPEStepMixerWeek,
  handleDataListKeyStepInfo,
  handleDataOPEByDate,
} from "services/ope-dashboard/opeDashBoardService";
import { IMixerResponse } from "types/response/dashboard/IMixerResponse";
import { IDataOPEStepMixerDate } from "types/response/ope-dashboard/IOPEDashboard";
import { getCurrentWeek } from "utilities/function/getCurrentWeek";

const useOPEStepMixer = () => {
  //statistic data
  const dateFormat = "YYYY/MM/DD";
  const minuteReload = 5;
  const shiftList = [
    { label: "Shift 1", value: "1" },
    { label: "Shift 2", value: "2" },
    { label: "Shift 3", value: "3" },
  ];
  const weekList = [];
  for (let i = 1; i <= 52; i++) {
    weekList.push({ value: `${i}`, label: `Week ${i}` });
  }

  //handling state
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(true);

  //filter state
  const [mixerId, setMixerId] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [selectShift, setSelectShift] = useState<string[]>([shiftList[0].value]);
  const [modeTime, setModeTime] = useState<"day" | "week">("day");
  const [startWeek, setStartWeek] = useState(getCurrentWeek() - 4);
  const [endWeek, setEndWeek] = useState(getCurrentWeek());
  const [selectStepDay, setSelectStepDay] = useState<string[]>([]);
  const [selectStepWeek, setSelectStepWeek] = useState<string[]>([]);

  //data state
  const [mixer, setMixer] = useState<IMixerResponse>();
  const [mixerList, setMixerList] = useState<IMixerResponse[]>([]);
  const [keyStepInfoList, setKeyStepInfoList] = useState<any[]>([]);
  const [dataOPEStepMixerDate, setDataOPEStepMixerDate] = useState({} as IDataOPEStepMixerDate);
  const [dataOPEbyDateStepChart, setDataOPEbyDateStepChart] = useState([] as any[]);
  const [dataOPEbyDate, setDataOPEbyDate] = useState([] as any[]);

  //other state
  const [timeReload, setTimeReload] = useState(minuteReload);

  //change filter
  const modeTimeChange = (e: RadioChangeEvent) => {
    setModeTime(e.target.value);
  };
  const onSelectorChangeMixer = (item: any) => {
    setMixerId(item);
  };
  const onShiftChange = (item: any) => {
    setSelectShift(item);
  };
  const onSelectStep = (e: CheckboxChangeEvent) => {
    if (modeTime == "day") {
      if (selectStepDay.includes(e.target.value) && !e.target.checked) {
        setSelectStepDay(selectStepDay.filter((item) => item !== e.target.value));
      } else {
        setSelectStepDay([...selectStepDay, e.target.value]);
      }
    } else {
      if (selectStepWeek.includes(e.target.value) && !e.target.checked) {
        setSelectStepWeek(selectStepWeek.filter((item) => item !== e.target.value));
      } else {
        setSelectStepWeek([...selectStepWeek, e.target.value]);
      }
    }
  };
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (modeTime == "day") {
      setSelectStepDay(e.target.checked ? keyStepInfoList.map((item) => item.key) : []);
    } else {
      setSelectStepWeek(e.target.checked ? keyStepInfoList.map((item) => item.key) : []);
    }
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
  const fetchData = async () => {
    setIsLoading(true);
    if (modeTime === "day") {
      await getOPEStepMixerDate(startDate.toDate(), endDate.toDate(), mixerId, selectShift)
        .then((res) => {
          setDataOPEStepMixerDate(res);
          setKeyStepInfoList(handleDataListKeyStepInfo(res).stepNameList);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      await getOPEStepMixerWeek(startWeek, endWeek, mixerId, selectShift)
        .then((res) => {
          setDataOPEStepMixerDate(res);
          setKeyStepInfoList(handleDataListKeyStepInfo(res).stepNameList);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  const handleMixerList = () => {
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
  useEffect(() => {
    fetchData();
    handleMixerList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, mixerId, startDate, endDate, selectShift, modeTime, startWeek, endWeek]);

  //handle data OPE by date step chart
  useEffect(() => {
    setIsLoading(true);
    if (modeTime == "day") {
      setDataOPEbyDateStepChart(
        handleDataOPEByDate(dataOPEStepMixerDate, selectStepDay, modeTime, selectShift, mixerId),
      );
    } else {
      setDataOPEbyDateStepChart(
        handleDataOPEByDate(dataOPEStepMixerDate, selectStepWeek, modeTime, selectShift, mixerId),
      );
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectStepDay, dataOPEStepMixerDate, modeTime, selectStepWeek]);

  //handle data OPE by date
  useEffect(() => {
    setIsLoading(true);
    setDataOPEbyDate(
      handleDataOPEByDate(
        dataOPEStepMixerDate,
        keyStepInfoList.map((item) => item.key),
        modeTime,
        selectShift,
        mixerId,
      ),
    );
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeTime, dataOPEStepMixerDate]);

  return {
    mixer,
    mixerList,
    dateFormat,
    shiftList,
    startDate,
    endDate,
    startWeek,
    endWeek,
    keyStepInfoList,
    dataOPEbyDateStepChart,
    dataOPEbyDate,
    isLoading,
    modeTime,
    weekList,
    selectStepDay,
    selectStepWeek,
    modeTimeChange,
    onSelectStep,
    onShiftChange,
    onSelectorChangeMixer,
    setEndDate,
    setStartDate,
    setEndWeek,
    setStartWeek,
    onCheckAllChange,
  };
};

export default useOPEStepMixer;
