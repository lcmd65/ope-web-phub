import { apiDeleteClient } from "services/axios/apiClient/delete";
import apiGetClient from "services/axios/apiClient/get";
import apiPostClient from "services/axios/apiClient/post";
import apiPutClient from "services/axios/apiClient/put";
import { ICategoryManagement } from "types/response/category-management/category";
import Endpoints from "utilities/enums/Endpoint";

export const getAllCategoryManagementList = async () => {
  const res = await apiGetClient<ICategoryManagement[]>(Endpoints.CATEGORY_MANAGEMENT.CATEGORY);

  if (res.error || !res.data) {
    return {
      data: [],
    };
  }

  return {
    data: res.data,
  };
};

export const updateCategoryManagement = async (categoryData: ICategoryManagement, token: string) => {
  const { id, ...payload } = categoryData;

  const res = await apiPutClient(Endpoints.CATEGORY_MANAGEMENT.CATEGORY + `/${id}`, { ...payload }, token);
  if (res.error) {
    return false;
  } else {
    return true;
  }
};

export const createCategoryManagement = async (categoryData: ICategoryManagement, token: string) => {
  const { id, ...payload } = categoryData;

  const res = await apiPostClient(Endpoints.CATEGORY_MANAGEMENT.CATEGORY, { ...payload }, token);
  if (res.error) {
    return false;
  } else {
    return true;
  }
};

export const deleteCategoryManagement = async (categoryId: string, token: string) => {
  const res = await apiDeleteClient(Endpoints.CATEGORY_MANAGEMENT.CATEGORY + `/${categoryId}`, {}, token);
  if (res.error) {
    return false;
  } else {
    return true;
  }
};
