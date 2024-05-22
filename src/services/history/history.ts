import apiGetClient from "services/axios/apiClient/get";
import apiPutClient from "services/axios/apiClient/put";
import { IBatch, IUpdateBatchRequest } from "types/response/history/Ibatch";
import Endpoints from "utilities/enums/Endpoint";

export async function getBatchHistoryList(mixer_id: string[]) {
  const res = await apiGetClient<IBatch[]>(Endpoints.HISTORY.BATCH_LIST, {
    mixer_id: mixer_id,
  });
  if (res.error || !res.data) {
    return {
      data: [],
    };
  }

  return {
    data: res.data,
  };
}

export async function updateMixerHistory(batchHistory: IBatch, token: string) {
  const { _id, ...payload } = batchHistory;
  const res = await apiPutClient<IBatch[]>(
    `${Endpoints.HISTORY.BATCH}/${_id}`,
    {
      ...payload,
    },
    token,
  );
  if (res.error || !res.data) {
    return false;
  }
  return true;
}

export async function putUpdateBatch(id: string, data: IUpdateBatchRequest, token: string) {
  const res = await apiPutClient<any[]>(Endpoints.HISTORY.BATCH + `/${id}`, { ...data }, token);

  return res;
}
