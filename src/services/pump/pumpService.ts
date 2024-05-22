import apiGetClient from "services/axios/apiClient/get";
import apiPostClient from "services/axios/apiClient/post";
import { IPumpStatus } from "types/response/pump/IPumpStatus";
import Endpoints from "utilities/enums/Endpoint";

export async function startPumpByMixer(mixer_id?: string) {
  const res = await apiPostClient(Endpoints.PUMP.START_PUMP, {
    mixer_id,
    status: true,
  });
  if (res.error || !res.data) {
    return {
      data: null,
    };
  }
  return {
    data: res.data,
  };
}

export async function getPumpStatusByMixer(mixer_id: string) {
  const res = await apiGetClient<IPumpStatus>(Endpoints.PUMP.STATUS_PUMP + mixer_id);

  if (res.error || !res.data) {
    return {
      data: undefined,
    };
  }
  return {
    data: res.data,
  };
}
