import apiGetClient from "services/axios/apiClient/get";
import IPullDataADXResponse from "types/response/statistical/IPullDataADXResponse";
import Endpoints from "utilities/enums/Endpoint";
import { formatDateTimeADX } from "utilities/function/formatDateTime";

export const getPullDataADX = async (endTime: Date, startTime: Date): Promise<IPullDataADXResponse> => {
  let response = {} as IPullDataADXResponse;

  await apiGetClient<IPullDataADXResponse>(Endpoints.STATISTICAL.PULL_DATA_ADX, {
    start_time: formatDateTimeADX(new Date(startTime)),
    end_time: formatDateTimeADX(new Date(endTime)),
  }).then((res) => {
    if (!res.error) {
      response = res.data;
    } else {
      response = { success: "-", fail: "-", null: "-", total: "-" };
    }
  });

  return response;
};
