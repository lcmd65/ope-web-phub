import { apiDeleteClient } from "services/axios/apiClient/delete";
import apiGetClient from "services/axios/apiClient/get";
import apiPostClient from "services/axios/apiClient/post";
import apiPutClient from "services/axios/apiClient/put";
import { IMixerManagement } from "types/response/category-management/mixer";
import Endpoints from "utilities/enums/Endpoint";

export const getAllMixerManagementList = async () => {
  const res = await apiGetClient<IMixerManagement[]>(Endpoints.CATEGORY_MANAGEMENT.MIXER);

  if (res.error || !res.data) {
    return {
      data: [],
    };
  }

  return {
    data: res.data,
  };
};

export const updateMixerManagement = async (mixerData: IMixerManagement, token: string) => {
  const { mixer_id, ...payload } = mixerData;

  const res = await apiPutClient(Endpoints.CATEGORY_MANAGEMENT.MIXER + `/${mixer_id}`, { ...payload }, token);
  if (res.error) {
    return false;
  } else {
    return true;
  }
};

export const createMixerManagement = async (mixerData: IMixerManagement, token: string) => {
  const { mixer_id, ...payload } = mixerData;

  const res = await apiPostClient(Endpoints.CATEGORY_MANAGEMENT.MIXER, { ...payload }, token);
  if (res.error) {
    return false;
  } else {
    return true;
  }
};

export const deleteMixerManagement = async (mixerId: string, token: string) => {
  const res = await apiDeleteClient(Endpoints.CATEGORY_MANAGEMENT.MIXER + `/${mixerId}`, {}, token);
  if (res.error) {
    return false;
  } else {
    return true;
  }
};
