import apiPostClient from "services/axios/apiClient/post";
import ILoginResponse, { ICheckAccount } from "types/response/auth/IAuth";
import { IReturnData } from "types/response/base/IBaseResponse";
import Endpoints from "utilities/enums/Endpoint";

const postCheckAccount = async (phone: string): Promise<IReturnData<ICheckAccount>> => {
  const response = await apiPostClient<ICheckAccount>(Endpoints.AUTH.CHECK_ACCOUNT, { phone: phone });

  return response;
};

export async function loginGetAccessToken(username: string, password: string) {
  const res = await apiPostClient<ILoginResponse>(Endpoints.AUTH.LOG_IN, {
    username: username,
    password: password,
  });

  if (res.error || !res.accessToken) {
    return null;
  }
  return res.accessToken;
}

export { postCheckAccount };
