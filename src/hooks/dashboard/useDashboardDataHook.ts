import { useEffect, useState } from "react";
import {
  getBatchResult,
  getBatchUncertain,
  getMixerCurrentBatchTopLoss,
  getMixerLastShiftTopLoss,
  getMixerStatus,
  getMixerThisShiftTopLoss,
  getOPE,
  getOPEHistory,
  getOR,
  getORHistory,
  handleExternal,
} from "services/dashboard/dashboard";
import { IBatchResult } from "types/response/dashboard/IBatchResultResponse";
import { IBatchUncertain } from "types/response/dashboard/IBatchUncertain";
import { IOPE } from "types/response/dashboard/IOPE";
import { IOR } from "types/response/dashboard/IOR";
import { IBatchLossData, ShiftData } from "types/response/dashboard/IToploss";

export function useDashboardDataHook(mixerId: string | undefined) {
  const [loading, setLoading] = useState<boolean>(false);
  const [batchResult, setBatchResult] = useState<IBatchResult>();
  const [batchUncertain, setBatchUncertain] = useState<IBatchUncertain>();
  const [ope, setOPE] = useState<IOPE>();
  const [external, setExternal] = useState<number>(0);
  const [opeHistory, setOPEHistory] = useState<IOPE[]>();
  const [or, setOR] = useState<IOR>();
  const [orHistory, setORHistory] = useState<IOR[]>();
  const [thisShiftTopLoss, setThisShiftTopLoss] = useState<ShiftData>();
  const [lastShiftTopLoss, setLastShiftTopLoss] = useState<ShiftData>();
  const [currentBatchTopLoss, setCurrentBatchTopLoss] = useState<IBatchLossData>();

  const fetchData = async () => {
    const [
      batchResultData,
      batchUncertainData,
      opeData,
      externalData,
      opeHistoryData,
      orData,
      orHistoryData,
      thisShiftTopLossData,
      lastShiftTopLossData,
      currentBatchTopLoss,
    ] = await Promise.all([
      getBatchResult(mixerId),
      getBatchUncertain(mixerId),
      getOPE(mixerId),
      getMixerStatus(mixerId),
      getOPEHistory(mixerId),
      getOR(mixerId),
      getORHistory(mixerId),
      getMixerThisShiftTopLoss(mixerId),
      getMixerLastShiftTopLoss(mixerId),
      getMixerCurrentBatchTopLoss(mixerId),
    ]);
    setBatchResult(batchResultData.data);
    setBatchUncertain(batchUncertainData.data);
    setOPE(opeData.data);
    setExternal(handleExternal(externalData));
    setOPEHistory(opeHistoryData.data);
    setOR(orData.data);
    setORHistory(orHistoryData.data);
    setThisShiftTopLoss(thisShiftTopLossData.data);
    setLastShiftTopLoss(lastShiftTopLossData.data);
    setCurrentBatchTopLoss(currentBatchTopLoss.data);
    setLoading(false);
  };

  useEffect(() => {
    if (!mixerId) return;
    setLoading(true);
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mixerId]);

  return {
    loading,
    batchResult,
    batchUncertain,
    ope,
    external,
    opeHistory,
    or,
    orHistory,
    thisShiftTopLoss,
    lastShiftTopLoss,
    currentBatchTopLoss,
  };
}
