import { message } from "antd";
import apiClient from "services/axios/apiClient";
import userStore from "stores/user";

const exportFile = async <T>(url: string, filename: string, params?: T, headers?: any): Promise<void> => {
  try {
    await apiClient
      .get(url, {
        params: params,
        responseType: "blob",
        headers: {
          ...headers,
          Authorization: userStore.getState().access_token ? "Bearer " + userStore.getState().access_token : "",
        },
      })
      .then(
        (response) =>
          new Blob([response.data], {
            type: "",
          }),
      )
      .then((response) => {
        const link = window.document.createElement("a");
        link.href = window.URL.createObjectURL(response);
        link.download = `${filename}_${new Date().toISOString()}.xlsx`;
        link.click();
        message.success("Xuất file excel " + filename + " thành công!");
      });
  } catch (error) {
    message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
  }
};

export { exportFile };
