import { toast } from "react-toastify";
import { exportFile } from "services/axios/apiClient/export";
import { uploadFile } from "services/axios/apiClient/post";

export async function exportMasterData(endpoint: string, fileName: string, params?: any) {
  await exportFile(endpoint, fileName, params);
}

export async function importMasterData(endpoint: string, file: any, token?: string) {
  const res = await uploadFile(endpoint, { file }, token);
  if (res.error) {
    toast.error("Import failed");
  } else {
    toast.success("Import successfully");
  }
}
