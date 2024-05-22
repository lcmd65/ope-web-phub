import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { getPullDataADX } from "services/statistical/statisticalService";
import IPullDataADXResponse from "types/response/statistical/IPullDataADXResponse";

interface IDataPieChart {
  name: string;
  value: number | string;
}

export function usePullDataADX() {
  //statistic data
  const dateFormat = "YYYY/MM/DD";
  const minuteReload = 2;

  // handling state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(true);

  //filter state
  const [startTime, setStartTime] = useState<Dayjs>(dayjs());
  const [endTime, setEndTime] = useState<Dayjs>(dayjs());

  //data state
  const [dataPullDataADX, setDataPullDataADX] = useState<IPullDataADXResponse>({} as IPullDataADXResponse);
  const [dataPieChart, setDataPieChart] = useState<IDataPieChart[]>([] as IDataPieChart[]);

  //other state
  const [timeReload, setTimeReload] = useState(minuteReload);

  //fetch data
  const fetchData = async () => {
    setIsLoading(true);
    await getPullDataADX(endTime.toDate(), startTime.toDate())
      .then((res) => {
        setDataPullDataADX(res);
        setDataPieChart([
          {
            name: "Pull success",
            value: res.success,
          },
          {
            name: "Pull fail",
            value: res.fail,
          },
          {
            name: "Pull response null",
            value: res.null,
          },
        ]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, endTime, startTime]);

  return {
    isLoading,
    dataPullDataADX,
    dataPieChart,
    startTime,
    endTime,
    dateFormat,
    setStartTime,
    setEndTime,
  };
}
