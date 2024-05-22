import { apiDeleteClient } from "services/axios/apiClient/delete";
import apiGetClient from "services/axios/apiClient/get";
import apiPostClient from "services/axios/apiClient/post";
import apiPutClient from "services/axios/apiClient/put";
import { IMixerCategoryManagement } from "types/response/category-management/mixer_category";
import Endpoints from "utilities/enums/Endpoint";

export const getAllMixerCategoryManagementList = async () => {
  const res = await apiGetClient<IMixerCategoryManagement[]>(Endpoints.CATEGORY_MANAGEMENT.MIXER_CATEGORY_LIST);

  if (res.error || !res.data) {
    return {
      data: [],
    };
  }

  return {
    data: res.data,
  };
};

export const updateMixerCategoryManagement = async (mixercategoryData: IMixerCategoryManagement, token: string) => {
  const { id, ...payload } = mixercategoryData;

  const res = await apiPutClient(Endpoints.CATEGORY_MANAGEMENT.MIXER_CATEGORY_LIST + `/${id}`, { ...payload }, token);
  if (res.error) {
    return false;
  } else {
    return true;
  }
};

export const createMixerCategoryManagement = async (mixercategoryData: IMixerCategoryManagement, token: string) => {
  const { id, ...payload } = mixercategoryData;

  const res = await apiPostClient(Endpoints.CATEGORY_MANAGEMENT.MIXER_CATEGORY_LIST, { ...payload }, token);
  if (res.error) {
    return false;
  } else {
    return true;
  }
};

export const deleteMixerCategoryManagement = async (id: string, token: string) => {
  const res = await apiDeleteClient(Endpoints.CATEGORY_MANAGEMENT.MIXER_CATEGORY_LIST + `/${id}`, {}, token);
  if (res.error) {
    return false;
  } else {
    return true;
  }
};
