import apiGetClient from "services/axios/apiClient/get";
import apiPostClient from "services/axios/apiClient/post";
import {
  IArea,
  IDataLossAreaChart,
  IDataLossReasonChart,
  IImportLossInternalRequest,
  IMixerLoss,
} from "types/response/loss-management/ILossManagement";
import Endpoints from "utilities/enums/Endpoint";
import { formatDateTimeDataOPE } from "utilities/function/formatDateTime";

export const renderDataReasonLossTable = (dataReason: any, listLevel: any) => {
  let response = [] as any[];
  let lengthChildMax = 0;
  listLevel.map((level: any) => {
    lengthChildMax = level.lengthChild > lengthChildMax ? level.lengthChild : lengthChildMax;
  });
};

export const getArea = async () => {
  let response = [] as IArea[];
  const res = await apiGetClient<any[]>(Endpoints.LOSS_MANAGEMENT.AREA).then((res) => {
    if (res.error || !res.data) {
      response = [];
    } else {
      response = res.data;
    }
  });

  return response;
};

export const getReasonLoss = async () => {
  let response = [] as any[];
  const res = await apiGetClient<any[]>(Endpoints.LOSS_MANAGEMENT.REASON_LOSS).then((res) => {
    if (res.error || !res.data) {
      response = [];
    } else {
      response = res.data;
    }
  });

  return response;
};

export const getMixerLoss = async (startTime: Date, endTime: Date, mixerId: string, statusLog?: string) => {
  let response = [] as IMixerLoss[];
  const res = await apiGetClient<IMixerLoss[]>(Endpoints.LOSS_MANAGEMENT.MIXER_LOSS, {
    mixer_id: mixerId,
    start_time: formatDateTimeDataOPE(startTime),
    end_time: formatDateTimeDataOPE(endTime),
    status_log: statusLog,
  }).then((res) => {
    if (res.error || !res.data) {
      response = [];
    } else {
      response = res.data;
    }
  });

  return response;
};

export const getLossLog = async (props: { id?: string; status?: string }) => {
  let response = [] as any[];
  const res = await apiGetClient<any[]>(Endpoints.LOSS_MANAGEMENT.LOSS_LOG, {
    MixerLogID: props.id,
    status: props.status,
  }).then((res) => {
    if (res.error || !res.data) {
      response = [];
    } else {
      response = res.data;
    }
  });

  return response;
};

export const postCreateLossLog = async (data: any) => {
  const res = await apiPostClient<any[]>(Endpoints.LOSS_MANAGEMENT.CREATE_LOSS, data);

  return res;
};

export const handleDataLossAreaChart = async (areaList: IArea[], mixerLossNotedList: IMixerLoss[]) => {
  let response = [] as IDataLossAreaChart[];

  const batchShiftCountsMap: Map<string, number> = new Map();
  for (const loss of mixerLossNotedList) {
    const key = `${loss.batch_date}-${loss.shift}`;

    if (batchShiftCountsMap.has(key)) {
      batchShiftCountsMap.set(key, batchShiftCountsMap.get(key)! + 1);
    } else {
      batchShiftCountsMap.set(key, 1);
    }
  }

  if (areaList.length != 0) {
    areaList?.map((area: IArea) => {
      const mixerLossByAreas = mixerLossNotedList.filter((mixer: IMixerLoss) => mixer.Area[0]?._id == area._id);
      let mixerLossPercentByArea = 0;
      for (const mixerLossByArea of mixerLossByAreas) {
        mixerLossPercentByArea += mixerLossByArea.duration / 480;
      }
      mixerLossPercentByArea = (mixerLossPercentByArea / batchShiftCountsMap.size) * 100;
      const totalLoss = mixerLossNotedList.length == 0 ? 0 : parseFloat(mixerLossPercentByArea.toFixed(2));
      response.push({
        area: area.name,
        loss: totalLoss,
      });
    });
  }

  return response;
};

export const handleDataLossReasonChart = async (
  reasonList: any[],
  currentReason: string,
  mixerLossNotedList: IMixerLoss[],
) => {
  let response = [] as IDataLossReasonChart[];
  let reasonLevel1NameList = [] as any[];
  let reasonLevel2NameList = [] as any[];
  let reasonLevel3NameList = [] as any[];

  reasonList.map((reasonLevel1: any) => {
    reasonLevel1NameList.push({ reasonId: reasonLevel1._id, reasonName: reasonLevel1.name });
    reasonLevel1.ReasonLevel2s.map((reasonLevel2: any) => {
      reasonLevel2NameList.push({
        reasonId: reasonLevel2._id,
        reasonName: reasonLevel1.code + "-" + reasonLevel2.code,
      });
      reasonLevel2.ReasonLevel3s.map((reasonLevel3: any) => {
        reasonLevel3NameList.push({
          reasonId: reasonLevel3._id,
          reasonName: reasonLevel1.code + "-" + reasonLevel3.code,
        });
      });
    });
  });

  const batchShiftCountsMap: Map<string, number> = new Map();
  for (const loss of mixerLossNotedList) {
    const key = `${loss.batch_date}-${loss.shift}`;

    if (batchShiftCountsMap.has(key)) {
      batchShiftCountsMap.set(key, batchShiftCountsMap.get(key)! + 1);
    } else {
      batchShiftCountsMap.set(key, 1);
    }
  }
  console.log(currentReason);
  if (currentReason == "level1") {
    reasonLevel1NameList.map((reason: any) => {
      const mixerLossByReasons = mixerLossNotedList.filter(
        (mixer: IMixerLoss) => mixer.ReasonLevel1 && mixer.ReasonLevel1[0]?._id == reason.reasonId,
      );
      let mixerLossPercentByReason = 0;
      for (const mixerLossByReason of mixerLossByReasons) {
        mixerLossPercentByReason += mixerLossByReason.duration / 480;
      }
      mixerLossPercentByReason = (mixerLossPercentByReason / batchShiftCountsMap.size) * 100;
      const totalLoss = mixerLossNotedList.length == 0 ? 0 : parseFloat(mixerLossPercentByReason.toFixed(2));
      response.push({
        reasonName: reason.reasonName,
        loss: totalLoss ? totalLoss : 0,
      });
    });
  } else if (currentReason == "level2") {
    reasonLevel2NameList.map((reason: any) => {
      const mixerLossByReasons = mixerLossNotedList.filter(
        (mixer: IMixerLoss) => mixer.ReasonLevel2 && mixer.ReasonLevel2[0]?._id == reason.reasonId,
      );
      let mixerLossPercentByReason = 0;
      for (const mixerLossByReason of mixerLossByReasons) {
        mixerLossPercentByReason += mixerLossByReason.duration / 480;
      }
      mixerLossPercentByReason = (mixerLossPercentByReason / batchShiftCountsMap.size) * 100;
      const totalLoss = mixerLossNotedList.length == 0 ? 0 : parseFloat(mixerLossPercentByReason.toFixed(2));
      response.push({
        reasonName: reason.reasonName,
        loss: totalLoss ? totalLoss : 0,
      });
    });
  } else if (currentReason == "level3") {
    reasonLevel3NameList.map((reason: any) => {
      const mixerLossByReasons = mixerLossNotedList.filter(
        (mixer: IMixerLoss) => mixer.ReasonLevel3 && mixer.ReasonLevel3[0]?._id == reason.reasonId,
      );
      let mixerLossPercentByReason = 0;
      for (const mixerLossByReason of mixerLossByReasons) {
        mixerLossPercentByReason += mixerLossByReason.duration / 480;
      }
      mixerLossPercentByReason = (mixerLossPercentByReason / batchShiftCountsMap.size) * 100;
      const totalLoss = mixerLossNotedList.length == 0 ? 0 : parseFloat(mixerLossPercentByReason.toFixed(2));
      response.push({
        reasonName: reason.reasonName,
        loss: totalLoss ? totalLoss : 0,
      });
    });
  } else if (currentReason == "other") {
    const mixerLossByReasons = mixerLossNotedList.filter(
      (mixer: IMixerLoss) =>
        ((!mixer.ReasonLevel1 && !mixer.ReasonLevel2 && !mixer.ReasonLevel3) ||
          (mixer.ReasonLevel1?.length == 0 && mixer.ReasonLevel2?.length == 0 && mixer.ReasonLevel3?.length == 0)) &&
        mixer.note,
    );
    let mixerLossPercentByReason = 0;
    for (const mixerLossByReason of mixerLossByReasons) {
      mixerLossPercentByReason += mixerLossByReason.duration / 480;
    }
    mixerLossPercentByReason = (mixerLossPercentByReason / batchShiftCountsMap.size) * 100;
    const totalLoss = mixerLossNotedList.length == 0 ? 0 : parseFloat(mixerLossPercentByReason.toFixed(2));
    response.push({
      reasonName: "Lý do khác",
      loss: totalLoss ? totalLoss : 0,
    });
  }

  return response;
};

export function postImportLossInternal(data: IImportLossInternalRequest) {
  const res = apiPostClient<any>(Endpoints.LOSS_MANAGEMENT.CREATE_MIXER_LOSS, data);

  return res;
}
