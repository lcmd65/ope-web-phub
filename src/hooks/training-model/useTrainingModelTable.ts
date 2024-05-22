import { ColumnsType } from "antd/es/table";
import { TrainingModelHistoryColumn } from "components/training-model/trainingModelHistoryColumn";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { getDataLogTrainingModelHistory } from "services/training-model/trainingModelService";
import ITrainingModelResponse from "types/response/training-model/ITrainingModelResponse";

const useTrainingModelTable = () => {
  //statistic data
  const dateFormat = "YYYY/MM/DD";
  const minuteReload = 5;

  //handling state
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(true);

  //data state
  const [dataLogTrainTable, setDataLogTrainTable] = useState<ITrainingModelResponse[]>([] as ITrainingModelResponse[]);

  //filter state
  const [dateStart, setDateStart] = useState<Dayjs>(dayjs().subtract(7, "day"));
  const [dateEnd, setDateEnd] = useState<Dayjs>(dayjs());

  //other state
  const [columns, setColumns] = useState<ColumnsType<ITrainingModelResponse>>([]);
  const [openDetailSampleModal, setOpenDetailSampleModal] = useState(false);
  const [timeReload, setTimeReload] = useState(minuteReload);

  useEffect(() => {
    setColumns(TrainingModelHistoryColumn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //fetch data
  const interval = setInterval(() => {
    setReload((prev) => !prev);
  }, 300000);
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
    setLoading(true);
    await getDataLogTrainingModelHistory(dateStart.toDate(), dateEnd.toDate())
      .then((res) => {
        setDataLogTrainTable(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, dateStart, dateEnd]);

  return {
    loading,
    dataLogTrainTable,
    dateStart,
    dateEnd,
    columns,
    openDetailSampleModal,
    dateFormat,
    setDateEnd,
    setDateStart,
    setOpenDetailSampleModal,
  };
};

export default useTrainingModelTable;
