/* eslint-disable react-hooks/exhaustive-deps */
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import {
  getBCTLostByCucCode,
  getBCTLostByMixer,
  getBCTLostByShift,
  getBCTLostByStep,
  getStepLostByShift,
} from "services/management/management";
import { IBCTLostByCUC } from "types/response/management_view/IBCTLostByCUC";
import { IBCTLostByStep } from "types/response/management_view/IBCTLostByStep";
import { IBCTLostByShift } from "types/response/management_view/IBCTLostShift";
import { IBCTLost } from "types/response/management_view/IBTCLost";
import { IStepLostByShift } from "types/response/management_view/IStepLossByShift";

export function useManagementViewDataHook(mixerId?: string) {
  const intervalDuration = 30000;

  const [loading, setLoading] = useState<boolean>(false);
  const [CUCLoading, setCUCLoading] = useState<boolean>(false);
  const [batchNoLoading, setBatchNoLoading] = useState<boolean>(false);

  const [BCTLostList, setBCTLostList] = useState<IBCTLost[]>([]);
  const [selectedCUCCode, setSelectedCUCCode] = useState<string>("");
  const [selectedBatchNo, setSelectedBatchNo] = useState<string>("");
  const [BCTLostByCUC, setBCTLostByCUC] = useState<IBCTLostByCUC>();
  const [BCTLostListByBatchNo, setBCTLostListByBatchNo] = useState<IBCTLostByStep[]>([]);

  const [BCTLostByShiftList, setBCTLostByShiftList] = useState<IBCTLostByShift[]>([]);
  const [stepLostByShiftList, setStepLostByShiftList] = useState<IStepLostByShift[]>([]);

  const dateFormat = "YYYY/MM/DD";
  const [fromDate, setFromDate] = useState<Dayjs>(dayjs());
  const [toDate, setToDate] = useState<Dayjs>(dayjs());

  const callAPI = async (mixer_id?: string) => {
    const from_date = fromDate.toISOString();
    const to_date = toDate.toISOString();
    getBCTLostByMixer(mixer_id, from_date, to_date).then((res) => {
      setBCTLostList(res.data);
      if (!res.data || res.data.length === 0) {
      } else {
        setSelectedCUCCode(res.data[0].cuc_code);
        const cuc_code = res.data[0].cuc_code;
        getBCTLostByCucCode(mixer_id, cuc_code, from_date, to_date).then((res) => {
          setBCTLostByCUC(res.data);
          if (!res.data || res.data.batch_nos_list.length === 0) {
          } else {
            getBCTLostByStep(mixer_id, cuc_code, res.data?.ope_data_detail[0].BatchID, from_date, to_date).then(
              (res) => {
                setBCTLostListByBatchNo(res.data);
              },
            );
          }
        });
      }
    });

    getBCTLostByShift(mixer_id, from_date, to_date).then((res) => {
      setBCTLostByShiftList(res.data);
    });

    getStepLostByShift(mixer_id, from_date, to_date).then((res) => {
      setStepLostByShiftList(res.data);
    });
  };

  // call getBCTLostByCucCode API
  const getBCTLostByCucCodeAPI = (props: { mixer_id: string; cuc_code: string; showloading?: boolean }) => {
    const { mixer_id, cuc_code, showloading } = props;
    showloading && setCUCLoading(true);
    getBCTLostByCucCode(mixer_id, cuc_code, fromDate.toISOString(), toDate.toISOString()).then((res) => {
      setBCTLostByCUC(res.data);
      showloading && setCUCLoading(false);
      if (!res.data || res.data.ope_data_detail.length === 0) {
        setSelectedBatchNo("");
      } else {
        setSelectedBatchNo(res.data?.ope_data_detail[0].BatchID ?? "");
      }
    });
  };

  // call getBCTLostByStep API
  const getBCTLostByStepAPI = (props: {
    mixer_id: string;
    cuc_code: string;
    batch_no: string;
    showloading?: boolean;
  }) => {
    const { mixer_id, cuc_code, batch_no, showloading } = props;
    showloading && setBatchNoLoading(true);
    getBCTLostByStep(mixer_id, cuc_code, batch_no, fromDate.toISOString(), toDate.toISOString()).then((res) => {
      setBCTLostListByBatchNo(res.data);
      showloading && setBatchNoLoading(false);
    });
  };

  useEffect(() => {
    setSelectedBatchNo("");
    setSelectedCUCCode("");
    if (!mixerId) {
      setBCTLostList([]);
    }
    setLoading(true);
    callAPI(mixerId).finally(() => {
      setLoading(false);
    });
  }, [mixerId, fromDate, toDate]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!mixerId) {
  //       setBCTLostList([]);
  //     } else {
  //       getBCTLostByMixer(mixerId, fromDate.toISOString(), toDate.toISOString()).then((res) => {
  //         setBCTLostList(res.data);
  //       });
  //     }
  //   }, intervalDuration);
  //   return () => clearInterval(interval);
  // }, [mixerId]);

  // use effect for selected cuc code
  useEffect(() => {
    if (!selectedCUCCode || !mixerId) {
      setBCTLostByCUC(undefined);
    } else {
      getBCTLostByCucCodeAPI({ mixer_id: mixerId, cuc_code: selectedCUCCode, showloading: true });
    }

    // const interval = setInterval(() => {
    //   if (!selectedCUCCode || !mixerId) {
    //     setBCTLostByCUC(undefined);
    //   } else {
    //     getBCTLostByCucCodeAPI({ mixer_id: mixerId, cuc_code: selectedCUCCode });
    //   }
    // }, intervalDuration);
    // return () => clearInterval(interval);
  }, [mixerId, selectedCUCCode, fromDate, toDate]);

  useEffect(() => {
    if (!(selectedBatchNo && selectedCUCCode && mixerId)) {
      setBCTLostListByBatchNo([]);
    } else {
      getBCTLostByStepAPI({
        mixer_id: mixerId,
        cuc_code: selectedCUCCode,
        batch_no: selectedBatchNo,
        showloading: true,
      });
    }

    // const interval = setInterval(() => {
    //   if (!(selectedBatchNo && selectedCUCCode && mixerId)) {
    //     setBCTLostListByBatchNo([]);
    //   } else {
    //     getBCTLostByStepAPI({ mixer_id: mixerId, cuc_code: selectedCUCCode, batch_no: selectedBatchNo });
    //   }
    // }, intervalDuration);

    // return () => clearInterval(interval);
  }, [mixerId, selectedBatchNo, selectedCUCCode, fromDate, toDate]);

  return {
    loading,
    CUCLoading,
    batchNoLoading,
    BCTLostList,
    selectedCUCCode,
    setSelectedCUCCode,
    selectedBatchNo,
    setSelectedBatchNo,
    BCTLostByCUC,
    BCTLostListByBatchNo,
    dateFormat,
    fromDate,
    setFromDate,
    to_date: toDate,
    setToDate,
    BCTLostByShiftList,
    stepLostByShiftList,
  };
}
