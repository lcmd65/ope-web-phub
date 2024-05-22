import { apiDeleteClient } from "services/axios/apiClient/delete";
import apiGetClient from "services/axios/apiClient/get";
import apiPostClient from "services/axios/apiClient/post";
import apiPutClient from "services/axios/apiClient/put";
import { IPHManagement } from "types/response/category-management/ph";
import Endpoints from "utilities/enums/Endpoint";

export const getAllPhManagementList = async () => {
  const res = await apiGetClient<IPHManagement[]>(Endpoints.CATEGORY_MANAGEMENT.PH);
  if (res.error || !res.data) {
    return {
      data: [],
    };
  }

  return {
    data: res.data,
  };
};

export const updatePhManagement = async (phData: IPHManagement, token: string) => {
  const { id, ...payload } = phData;

  const res = await apiPutClient(Endpoints.CATEGORY_MANAGEMENT.PH + `/${id}`, { ...payload }, token);
  if (res.error) {
    return false;
  } else {
    return true;
  }
};

export const createPhManagement = async (phData: IPHManagement, token: string) => {
  const { id, ...payload } = phData;

  const res = await apiPostClient(Endpoints.CATEGORY_MANAGEMENT.PH, { ...payload }, token);
  if (res.error) {
    return false;
  } else {
    return true;
  }
};

export const deletePhManagement = async (phId: string, token: string) => {
  const res = await apiDeleteClient(Endpoints.CATEGORY_MANAGEMENT.PH + `/${phId}`, {}, token);
  if (res.error) {
    return false;
  } else {
    return true;
  }
};
