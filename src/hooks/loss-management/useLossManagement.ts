import { RadioChangeEvent } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { exportMasterData } from "services/excel/excel_services";
import {
  getArea,
  getLossLog,
  getMixerLoss,
  getReasonLoss,
  handleDataLossAreaChart,
  handleDataLossReasonChart,
} from "services/loss-management/lossManagementService";
import {
  IArea,
  IDataLossAreaChart,
  IDataLossReasonChart,
  IMixerLoss,
} from "types/response/loss-management/ILossManagement";
import Endpoints from "utilities/enums/Endpoint";

export function useLossManagement(mixerId: string | undefined) {
  //handling state
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState(true);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isExportExcel, setIsExportExcel] = useState(false);

  //filter state
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(7, "day"));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [statusLog, setStatusLog] = useState<string>("ACTIVE");
  const [pageStatus, setPageStatus] = useState<string>("lossList");
  const [level, setLevel] = useState<string>("level1");
  const [statusExcel, setStatusExcel] = useState<string>("ALL");
  const [areaExcel, setAreaExcel] = useState<string>("ALL");
  const [statusLogExcel, setStatusLogExcel] = useState<string>("ALL");
  const [startDateExcel, setStartDateExcel] = useState<Dayjs>(dayjs().subtract(7, "day"));
  const [endDateExcel, setEndDateExcel] = useState<Dayjs>(dayjs());

  //data state
  const [areaList, setAreaList] = useState<IArea[]>([]);
  const [reasonList, setReasonList] = useState<any[]>([]);
  const [mixerLossList, setMixerLossList] = useState<IMixerLoss[]>([]);
  const [lossNotedDetail, setLossNotedDetail] = useState<any[]>();
  const [dataLossAreaChart, setDataLossAreaChart] = useState([] as IDataLossAreaChart[]);
  const [dataLossReasonChart, setDataLossReasonChart] = useState([] as IDataLossReasonChart[]);
  const [countStatus, setCountStatus] = useState({
    ACTIVE: 0,
    NOTED: 0,
    ALL: 0,
  });

  //other state
  const [currentIdLoss, setCurrentIdLoss] = useState<string>("");
  const [disabledForm, setDisabledForm] = useState(true);
  const [isModalExcelOpen, setIsModalExcelOpen] = useState(false);

  //statistic data
  const dateFormat = "YYYY/MM/DD";
  const statusList = [
    { label: "All", value: "ALL" },
    { label: "Running", value: "RUNNING" },
    { label: "Not running", value: "NOT_RUNNING" },
  ];
  const statusLogList = [
    { label: "All", value: "ALL" },
    { label: "Chưa nhập", value: "ACTIVE" },
    { label: "Đã nhập", value: "NOTED" },
  ];

  //change page dashboard/loss list
  const onChangePage = ({ target: { value } }: RadioChangeEvent) => {
    setPageStatus(value);
  };

  //fetch data
  const fetchData = async () => {
    const [area, reason, mixerLoss, mixerLossAll] = await Promise.all([
      getArea(),
      getReasonLoss(),
      getMixerLoss(
        startDate.toDate(),
        endDate.toDate(),
        mixerId ? mixerId : "",
        statusLog != "ALL" ? statusLog : undefined,
      ),
      getMixerLoss(startDate.toDate(), endDate.toDate(), mixerId ? mixerId : "", undefined),
    ]);
    const mixerLossNotedList = mixerLossAll.filter((mixer: IMixerLoss) => mixer.status_log == "NOTED");
    const mixerLossActiveList = mixerLossAll.filter((mixer: IMixerLoss) => mixer.status_log == "ACTIVE");
    setAreaList(area);
    setReasonList(reason);
    setDataLossReasonChart(await handleDataLossReasonChart(reason, level, mixerLossNotedList));
    setDataLossAreaChart(await handleDataLossAreaChart(area, mixerLossNotedList));
    if (mixerLoss.length == 0) {
      setCurrentIdLoss("");
    }
    setMixerLossList(mixerLoss);
    setCountStatus({
      ACTIVE: mixerLossActiveList.length,
      NOTED: mixerLossNotedList.length,
      ALL: mixerLossAll.length,
    });
    setLoading(false);
  };
  useEffect(() => {
    if (!mixerId) return;
    setLoading(true);
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 300000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mixerId, startDate, endDate, statusLog, reload, level]);

  //handle choose loss
  useEffect(() => {
    if (currentIdLoss) {
      setIsLoadingForm(true);
      getLossLog({ id: currentIdLoss })
        .then((res) => {
          if (res.length == 0) {
            setDisabledForm(false);
          } else {
            setDisabledForm(true);
          }
          setLossNotedDetail(res);
        })
        .finally(() => {
          setIsLoadingForm(false);
        });
    } else {
      setDisabledForm(false);
      setLossNotedDetail([]);
      setIsLoadingForm(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdLoss, reload]);

  //modal export excel
  const showModalExcel = () => {
    setIsModalExcelOpen(true);
  };
  const handleOkModalExcel = () => {
    setIsExportExcel(true);
    exportMasterData(
      Endpoints.EXCEL.LOSS_LOG,
      `Loss list ${startDateExcel.toISOString()} - ${endDateExcel.toISOString()}`,
      {
        start_time: startDateExcel.toISOString(),
        end_time: endDateExcel.toISOString(),
        AreaId: areaExcel == "ALL" ? null : areaExcel,
        status: statusExcel == "ALL" ? null : statusExcel,
        status_log: statusLogExcel == "ALL" ? null : statusLogExcel,
      },
    ).finally(() => {
      setIsExportExcel(false);
    });
  };
  const handleCancelModalExcel = () => {
    setIsModalExcelOpen(false);
  };

  return {
    loading,
    countStatus,
    isLoadingForm,
    dateFormat,
    startDate,
    endDate,
    areaList,
    reasonList,
    mixerLossList,
    statusLog,
    level,
    currentIdLoss,
    lossNotedDetail,
    disabledForm,
    dataLossAreaChart,
    dataLossReasonChart,
    pageStatus,
    isModalExcelOpen,
    statusList,
    statusLogList,
    isExportExcel,
    onChangePage,
    setDisabledForm,
    setCurrentIdLoss,
    setEndDate,
    setStartDate,
    setStatusLog,
    setReload,
    setLevel,
    showModalExcel,
    handleOkModalExcel,
    handleCancelModalExcel,
    setAreaExcel,
    setStartDateExcel,
    setEndDateExcel,
    setStatusLogExcel,
    setStatusExcel,
  };
}
