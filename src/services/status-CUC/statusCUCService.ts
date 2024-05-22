import { apiDeleteClient } from "services/axios/apiClient/delete";
import apiGetClient from "services/axios/apiClient/get";
import apiPostClient from "services/axios/apiClient/post";
import apiPutClient from "services/axios/apiClient/put";
import {
  IImportCUCScheduleRequest,
  IImportMixerWeightRequest,
  IUpdateCUCScheduleRequest,
} from "types/request/status-CUC/IStatusCUCRequest";
import { IInfoCUCMixer } from "types/response/info-CUC/IInfoCUC";
import Endpoints from "utilities/enums/Endpoint";
import { formatDateTimeDataOPE } from "utilities/function/formatDateTime";

export const getCUCSchedule = async (props: {
  mixerId?: string;
  startTime: Date;
  endTime: Date;
  shift?: string | null;
}) => {
  let response = [] as IInfoCUCMixer[];
  const res = await apiGetClient<IInfoCUCMixer[]>(Endpoints.STATUS_CUC.GET_CUC_SCHEDULE, {
    mixer_id: props.mixerId,
    start_time: formatDateTimeDataOPE(props.startTime),
    end_time: formatDateTimeDataOPE(props.endTime),
    shift: props.shift,
  }).then((res) => {
    if (!res.error) {
      response = res.data;
    }
  });

  return response;
};

export const deleteCUCSchedule = async (CUCStatusId: React.Key) => {
  const res = await apiDeleteClient<any>(Endpoints.STATUS_CUC.DELETE_CUC_SCHEDULE + "/" + CUCStatusId);

  return res;
};

export const postImportCUCSchedule = async (data: IImportCUCScheduleRequest) => {
  const res = await apiPostClient<any>(Endpoints.STATUS_CUC.POST_IMPORT_CUC_SCHEDULE, data);

  return res;
};

export const postImportMixerWeight = async (data: IImportMixerWeightRequest) => {
  const res = await apiPostClient<any>(Endpoints.STATUS_CUC.POST_IMPORT_MIXER_WEIGHT, data);

  return res;
};

export const putUpdateCUCSchedule = async (body: IUpdateCUCScheduleRequest, mixerId: string) => {
  const res = await apiPutClient<any>(Endpoints.STATUS_CUC.BASE + "/" + mixerId, body);

  return res;
};
