import apiGetClient from "services/axios/apiClient/get";
import { IDataOPEStepMixerAverage } from "types/response/ope-dashboard/IOPEDashboard";
import Endpoints from "utilities/enums/Endpoint";
import { formatDateTimeLogTrainModel } from "utilities/function/formatDateTime";

export async function getOPEStepMixerAverage(
  start_date: Date,
  end_date: Date,
  mixerId?: string[],
  shift?: string[],
  batchNo?: string,
  cucCode?: string[],
) {
  let response = {} as IDataOPEStepMixerAverage;
  const res = await apiGetClient<IDataOPEStepMixerAverage>(Endpoints.OPE_DASHBOARD.OPE_STEP_MIXER_AVERAGE, {
    mixer_id: mixerId,
    shift: shift,
    start_date: formatDateTimeLogTrainModel(start_date),
    end_date: formatDateTimeLogTrainModel(end_date),
    cuc_code: cucCode,
    batch_no: batchNo,
  });

  if (res.error || !res.data) {
    response = {} as IDataOPEStepMixerAverage;
  } else {
    response = res.data;
  }

  return response;
}

export function handleDataOPEStepMixerChart(data: IDataOPEStepMixerAverage) {
  let response = [] as any;
  if (data.stepInfos) {
    const keyStepList = Object.keys(data.stepInfos);
    keyStepList.map((key) => {
      response.push({
        name: data.stepNamesList[key],
        topLoss: data.stepInfos[key].top_loss.toFixed(1),
        masterData: data.stepInfos[key].master_data.toFixed(1),
      });
    });
  }
  return response;
}

export function handleDataListKeyStepAverageChart(data: IDataOPEStepMixerAverage) {
  let response = [] as any;
  if (data.stepInfos) {
    const keyStepList = Object.keys(data.stepInfos);
    keyStepList.map((key) => {
      let value = 0;
      if (data.stepInfos[key].master_data != 0 && data.stepInfos[key].top_loss == 0) {
        value = 0;
      } else if (data.stepInfos[key].master_data == 0 && data.stepInfos[key].top_loss != 0) {
        value = data.stepInfos[key].top_loss / 4.8 / data.stepInfos[key].unique_mixer_shift;
      } else if (data.stepInfos[key].master_data != 0 && data.stepInfos[key].top_loss != 0) {
        value =
          ((data.stepInfos[key].top_loss - data.stepInfos[key].master_data) / data.stepInfos[key].master_data) * 100;
      } else {
        value = 0;
      }
      response.push({
        name: data.stepNamesList[key],
        value: value.toFixed(2),
      });
    });
  }
  return response;
}
