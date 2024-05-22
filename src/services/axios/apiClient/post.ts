import axios from "axios";
import userStore from "stores/user";
import IBaseResponse, { IReturnData } from "types/response/base/IBaseResponse";

const apiPostClient = async <T>(url: string, data: any, token?: string): Promise<IReturnData<T>> => {
  let returnData = { error: false, data: null, accessToken: "" } as IReturnData<T>;
  try {
    const result = await axios
      .create({
        headers: {
          Authorization: token ? "Bearer " + token : "Bearer " + userStore.getState().access_token,
        },
      })
      .post<IBaseResponse<T>>(url, data);
    if (result.status == 200 || result.status == 201) {
      returnData.error = false;
      returnData.accessToken = result.data.accessToken;
      returnData.data = result.data.data;
    }
  } catch (error) {
    console.error(error);
    returnData.error = true;
  }
  return returnData;
};

export const uploadFile = async <T>(url: string, file: any, token?: string) => {
  let returnData = { error: false, data: null } as IReturnData<T>;

  try {
    const res = await axios.post(url, file, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: token ? "Bearer " + token : "Bearer " + userStore.getState().access_token,
      },
    });
    if (res.status == 200) {
      returnData.error = false;
      returnData.data = res.data;
    }
  } catch (error) {
    console.error(error);
    returnData.error = true;
  }
  return returnData;
};

export default apiPostClient;
