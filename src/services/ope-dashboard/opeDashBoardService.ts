import apiGetClient from "services/axios/apiClient/get";
import {
  IDataLossBCTExternal,
  IDataLossBCTInternal,
  IDataOPEByShift,
  IDataOPEStepMixerDate,
  IStackedBarChartByShift,
} from "types/response/ope-dashboard/IOPEDashboard";
import Endpoints from "utilities/enums/Endpoint";
import { formatDateTimeDataOPE, formatDateTimeLogTrainModel } from "utilities/function/formatDateTime";
import { groupByKey } from "utilities/function/groupByKey";
import { roundTo2Digits } from "utilities/function/roundTo2Digits";
import { sortDatesOldToNew } from "utilities/function/sortDate";

export async function getDataOPE(start_date: Date, end_date: Date, mixerId?: string[], shift?: string[]) {
  let response = [] as IDataOPEByShift[];
  const res = await apiGetClient<IDataOPEByShift[]>(Endpoints.OPE_DASHBOARD.BASE, {
    mixer_id: mixerId,
    shift: shift,
    start_date: formatDateTimeDataOPE(start_date),
    end_date: formatDateTimeDataOPE(end_date),
  });
  if (res.error || !res.data) {
    response = [];
  } else {
    response = res.data;
  }
  return response;
}

export async function getDataLossBCTInternal(start_date: Date, end_date: Date, mixerId?: string[], shift?: string[]) {
  let response = [] as IDataLossBCTInternal[];
  const res = await apiGetClient<IDataLossBCTInternal[]>(Endpoints.OPE_DASHBOARD.LOSS_BCT_INTERNAL, {
    mixer_id: mixerId,
    shift: shift,
    start_date: formatDateTimeDataOPE(start_date),
    end_date: formatDateTimeDataOPE(end_date),
  });
  if (res.error || !res.data) {
    response = [];
  } else {
    response = res.data;
  }
  return response;
}

export async function getDataLossBCTExternal(start_date: Date, end_date: Date, mixerId?: string[], shift?: string[]) {
  let response = [] as IDataLossBCTExternal[];
  const res = await apiGetClient<IDataLossBCTExternal[]>(Endpoints.OPE_DASHBOARD.LOSS_BCT_EXTERNAL, {
    mixer_id: mixerId,
    shift: shift,
    start_date: formatDateTimeLogTrainModel(start_date),
    end_date: formatDateTimeLogTrainModel(end_date),
  });
  if (res.error || !res.data) {
    response = [];
  } else {
    response = res.data;
  }
  return response;
}

export const handleDataOPEForChartByShift = (dataOPE: IDataOPEByShift[]) => {
  let dataOPEGroupByDate = groupByKey(dataOPE, "date") as IDataOPEByShift[][];
  let response = [] as IStackedBarChartByShift[];

  Object.values(dataOPEGroupByDate).map((itemByDate: IDataOPEByShift[]) => {
    const date = itemByDate[0].date;
    let dataShift1 = itemByDate.filter((item) => item.shift == 1);
    let dataShift2 = itemByDate.filter((item) => item.shift == 2);
    let dataShift3 = itemByDate.filter((item) => item.shift == 3);

    let valueOPEShift1 = 0 as any;
    let valueOPEShift2 = 0 as any;
    let valueOPEShift3 = 0 as any;

    if (dataShift1.length == 0) {
      valueOPEShift1 = null;
    } else {
      dataShift1.forEach((item) => {
        valueOPEShift1 += item.ope;
      });
    }
    if (dataShift2.length == 0) {
      valueOPEShift2 = null;
    } else {
      dataShift2.forEach((item) => {
        valueOPEShift2 += item.ope;
      });
    }
    if (dataShift3.length == 0) {
      valueOPEShift3 = null;
    } else {
      dataShift3.forEach((item) => {
        valueOPEShift3 += item.ope;
      });
    }

    response.push({
      date: date,
      shift1: valueOPEShift1 != null ? ((valueOPEShift1 * 100) / dataShift1.length)?.toFixed(2) : null,
      shift2: valueOPEShift2 != null ? ((valueOPEShift2 * 100) / dataShift2.length).toFixed(2) : null,
      shift3: valueOPEShift3 != null ? ((valueOPEShift3 * 100) / dataShift3.length).toFixed(2) : null,
    });
  });

  return response.sort((a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("-")).getTime();
    const dateB = new Date(b.date.split("/").reverse().join("-")).getTime();
    return dateA - dateB;
  });
};

export const handleDataCIPForChartByShift = (dataCIP: IDataLossBCTExternal[]) => {
  let dataOPEGroupByDate = groupByKey(dataCIP, "date") as IDataLossBCTExternal[][];
  let response = [] as IStackedBarChartByShift[];

  Object.values(dataOPEGroupByDate).map((itemByDate: IDataLossBCTExternal[]) => {
    const date = itemByDate[0].date;
    let dataShift1 = itemByDate.filter((item) => item.shift == 1);
    let dataShift2 = itemByDate.filter((item) => item.shift == 2);
    let dataShift3 = itemByDate.filter((item) => item.shift == 3);

    let valueCIPShift1 = 0 as any;
    let valueCIPShift2 = 0 as any;
    let valueCIPShift3 = 0 as any;

    if (dataShift1.length == 0) {
      valueCIPShift1 = null;
    } else {
      dataShift1.forEach((item) => {
        valueCIPShift1 += item.cip;
      });
    }
    if (dataShift2.length == 0) {
      valueCIPShift2 = null;
    } else {
      dataShift2.forEach((item) => {
        valueCIPShift2 += item.cip;
      });
    }
    if (dataShift3.length == 0) {
      valueCIPShift3 = null;
    } else {
      dataShift3.forEach((item) => {
        valueCIPShift3 += item.cip;
      });
    }

    response.push({
      date: date,
      shift1: valueCIPShift1 != null ? (valueCIPShift1 / dataShift1.length / 4.8)?.toFixed(2) : null,
      shift2: valueCIPShift2 != null ? (valueCIPShift2 / dataShift2.length / 4.8).toFixed(2) : null,
      shift3: valueCIPShift3 != null ? (valueCIPShift3 / dataShift3.length / 4.8).toFixed(2) : null,
    });
  });

  return response.sort((a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("-")).getTime();
    const dateB = new Date(b.date.split("/").reverse().join("-")).getTime();
    return dateA - dateB;
  });
};

export const handleOPEPercentage = (dataOPE: IDataOPEByShift[]) => {
  let response = 0;
  let numberShift = dataOPE.length;
  dataOPE.map((item) => {
    if (item != null) {
      response += Number(item.ope);
    }
  });
  response = (response / numberShift) * 100;

  return response;
};

export const handleLossBCTInternalPercentage = (dataOPE: IDataOPEByShift[]) => {
  let response = 0;
  let numberShift = dataOPE.length;
  dataOPE.map((item) => {
    response += Number(item.internal);
  });
  response = response / numberShift;

  return response;
};

export async function getOPEStepMixerDate(start_date: Date, end_date: Date, mixerId?: string[], shift?: string[]) {
  let response = {} as IDataOPEStepMixerDate;
  const res = await apiGetClient<IDataOPEStepMixerDate>(Endpoints.OPE_DASHBOARD.OPE_STEP_MIXER_DATE, {
    mixer_id: mixerId,
    shift: shift,
    start_date: formatDateTimeLogTrainModel(start_date),
    end_date: formatDateTimeLogTrainModel(end_date),
  });

  if (res.error || !res.data) {
    response = {} as IDataOPEStepMixerDate;
  } else {
    response = res.data;
  }

  return response;
}

export async function getOPEStepMixerWeek(startWeek: number, endWeek: number, mixerId?: string[], shift?: string[]) {
  let response = {} as IDataOPEStepMixerDate;
  const res = await apiGetClient<IDataOPEStepMixerDate>(Endpoints.OPE_DASHBOARD.OPE_STEP_MIXER_WEEK, {
    mixer_id: mixerId,
    shift: shift,
    start_week: startWeek,
    end_week: endWeek,
  });

  if (res.error || !res.data) {
    response = {} as IDataOPEStepMixerDate;
  } else {
    response = res.data;
  }

  return response;
}

export const handleDataListKeyStepInfo = (dataOPEStepMixerDate: IDataOPEStepMixerDate) => {
  let stepInfoList = [] as any;
  let keyStepInfoList = [] as any;
  let stepNameList = [] as any;

  dataOPEStepMixerDate.batchInfos?.map((batch) => {
    stepInfoList.push(...Object.keys(batch.StepInfo));
  });
  keyStepInfoList = Array.from(new Set(stepInfoList));
  stepNameList = keyStepInfoList.map((item: string) => {
    let key = item;
    let value = dataOPEStepMixerDate.stepNamesList[item];
    return { key, value };
  });

  return {
    keyStepInfoList: keyStepInfoList,
    stepNameList: stepNameList,
  };
};

export const handleDataOPEByDate = (
  dataOPEStepMixerDate: IDataOPEStepMixerDate,
  stepArray: string[],
  modeTime: string,
  selectShift: string[],
  mixerId: string[],
) => {
  let numberShift = selectShift.length != 0 ? selectShift.length : 3;
  const numberMixer = mixerId.length != 0 ? mixerId.length : 5;

  if (dataOPEStepMixerDate.batchInfos) {
    let data = { ...dataOPEStepMixerDate };
    let response = [] as any;
    let dateArray = [] as string[];
    //get array date
    data.batchInfos.map((batch) => {
      if (modeTime == "day") {
        dateArray.push(batch.BatchDate);
        dateArray = sortDatesOldToNew(Array.from(new Set(dateArray)));
      } else if (modeTime == "week") {
        dateArray.push(batch.Week);
        dateArray = Array.from(new Set(dateArray)).sort(function (a, b) {
          return parseInt(a, 10) - parseInt(b, 10);
        });
      }
    });

    //get data by date
    dateArray.map((date) => {
      if (modeTime == "day") {
        response.push({
          date: date,
          data: data.batchInfos.filter((batch) => {
            return batch.BatchDate === date;
          }),
        });
      } else {
        response.push({
          date: date,
          data: data.batchInfos.filter((batch) => {
            return batch.Week === date;
          }),
        });
      }
    });

    response.map((item: any) => {
      if (item.data.length > 0) {
        item.data.map((batch: any) => {
          let arrayStepInfo = [];
          for (const key in batch.StepInfo) {
            if (stepArray.includes(key)) {
              if (batch.StepInfo[key].master_data && batch.StepInfo[key].top_loss) {
                const valueLoss = (batch.StepInfo[key].top_loss - batch.StepInfo[key].master_data) / 480;
                arrayStepInfo.push({
                  key: key,
                  value: valueLoss,
                });
              }
            }
          }

          let value = 0;

          if (arrayStepInfo.length > 0) {
            arrayStepInfo.map((item: any) => {
              value = value + item.value;
            });
            value = value / arrayStepInfo.length;
          }
          item.data = value != 0 ? roundTo2Digits((value * 100) / (numberShift * numberMixer)) : 0;
        });
      } else {
        item.data = 0;
      }
    });
    return response;
  }
};

export const handleDataLossBCTExternalPercentage = (dataLossBCTExternal: IDataLossBCTExternal[]) => {
  let lossExternal = 0 as any;
  let CIP = 0 as any;

  if (dataLossBCTExternal?.length > 0) {
    dataLossBCTExternal.map((item) => {
      lossExternal += item.cip;
    });

    lossExternal = (lossExternal / 480) * 100;

    const uniqueDates = new Set<string>();
    dataLossBCTExternal.forEach((item) => uniqueDates.add(item.mixer_id));
    const numberOfUniqueDates = uniqueDates.size;

    const uniqueShift = new Set<number>();
    dataLossBCTExternal.forEach((item) => uniqueShift.add(item.shift));
    const numberOfUniqueShift = uniqueShift.size;

    const uniqueMixerIds = new Set<string>();
    dataLossBCTExternal.forEach((item) => uniqueMixerIds.add(item.mixer_id));
    const numberOfUniqueMixerIds = uniqueMixerIds.size;
    CIP = lossExternal / (numberOfUniqueDates + numberOfUniqueMixerIds + numberOfUniqueShift);
  } else {
    lossExternal = undefined;
    CIP = undefined;
  }

  return {
    lossExternal: lossExternal,
    CIP: CIP,
  };
};

export const handleLossBCTExternalPercentage = (dataOPE: IDataOPEByShift[]) => {
  let response = 0;
  let numberShift = dataOPE.length;
  dataOPE.map((item) => {
    if (item != null) {
      response += Number(item.external);
    }
  });
  response = (response / numberShift) * 100;

  return response;
};
