import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteCUCSchedule, getCUCSchedule } from "services/status-CUC/statusCUCService";
import { IMixerResponse } from "types/response/dashboard/IMixerResponse";
import { IDataInfoCUCMixer, IListCUCStatusDelete } from "types/response/info-CUC/IInfoCUC";

const useCUCMixerStatus = (mixerList: IMixerResponse[]) => {
  //statistic data
  const dateFormat = "YYYY/MM/DD";
  const minuteReload = 5;
  const shiftList = [
    { label: "Shift 1", value: "1" },
    { label: "Shift 2", value: "2" },
    { label: "Shift 3", value: "3" },
  ];

  //handling state
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState(true);

  //filter state
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [selectedShift, setSelectedShift] = useState<string>(shiftList[0].value);

  //data state
  const [dataInfoCUCMixer, setDataInfoCUCMixer] = useState<IDataInfoCUCMixer[]>();

  //other state
  const [listCUCStatusDelete, setListCUCStatusDelete] = useState<IListCUCStatusDelete[]>([]);
  const [timeReload, setTimeReload] = useState(minuteReload);

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
    setLoading(true);
    let dataInfo = [] as IDataInfoCUCMixer[];
    await getCUCSchedule({
      startTime: startDate.toDate(),
      endTime: endDate.toDate(),
      shift: selectedShift == "" ? null : selectedShift,
    })
      .then((res) => {
        mixerList.map((mixer, index) => {
          dataInfo.push({
            mixerId: mixer.mixer_id,
            mixerName: mixer.name,
            data: res.filter((item) => item.MixerID == mixer.mixer_id),
          });
          setDataInfoCUCMixer(dataInfo);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (mixerList?.length > 0) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [mixerList, startDate, endDate, reload, selectedShift]);

  //filter function
  const onShiftChange = (item: any) => {
    setSelectedShift(item);
  };

  //other function
  const onDeleteCUCSchedule = async (mixerId: string, CUCScheduleIdList: React.Key[]) => {
    setLoading(true);
    const listIdSuccess = [] as any[];
    const listIdFail = [] as any[];
    await Promise.all(
      CUCScheduleIdList.map(async (CUCScheduleId) => {
        await deleteCUCSchedule(CUCScheduleId).then((res) => {
          if (!res.error && res.data) {
            listIdSuccess.push(CUCScheduleId);
          } else {
            listIdFail.push(CUCScheduleId);
          }
        });
      }),
    ).finally(() => {
      const dataRemoveSelectMixer = listCUCStatusDelete.filter((item) => item.mixerId != mixerId);
      setListCUCStatusDelete([...dataRemoveSelectMixer, { mixerId: mixerId, CUCStatusId: listIdFail }]);
      setReload((prev) => !prev);
      if (listIdSuccess.length > 0) {
        toast.success(`Deleted ${listIdSuccess.length} CUC Schedule!`);
      }
      if (listIdFail.length > 0) {
        toast.error(`Error deleting ${listIdFail.length} CUC Schedule!`);
      }
    });
  };

  return {
    loading,
    mixerList,
    startDate,
    endDate,
    dateFormat,
    dataInfoCUCMixer,
    listCUCStatusDelete,
    shiftList,
    onDeleteCUCSchedule,
    onShiftChange,
    setListCUCStatusDelete,
    setStartDate,
    setEndDate,
    setReload,
  };
};

export default useCUCMixerStatus;
