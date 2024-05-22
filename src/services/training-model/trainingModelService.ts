import apiGetClient from "services/axios/apiClient/get";
import ITrainingModelResponse from "types/response/training-model/ITrainingModelResponse";
import Endpoints from "utilities/enums/Endpoint";
import { formatDateTimeLogTrainModel } from "utilities/function/formatDateTime";

const getDataLogTrainingModelHistory = async (dateStart: Date, dateEnd: Date): Promise<ITrainingModelResponse[]> => {
  let response = [] as ITrainingModelResponse[];
  await apiGetClient<ITrainingModelResponse[]>(Endpoints.TRAIN_MODEL.HISTORY_LOG, {
    date_train_start: formatDateTimeLogTrainModel(dateStart),
    date_train_end: formatDateTimeLogTrainModel(dateEnd),
  }).then((res) => {
    if (!res.error) {
      response = handleDataLogTrainModelHistory(res.data);
    }
  });

  return response;
};

const handleDataLogTrainModelHistory = (dataLogTrainHistory: ITrainingModelResponse[]) => {
  let response = [] as ITrainingModelResponse[];
  dataLogTrainHistory.forEach((log) => {
    log.key = log._id;
  });
  response = dataLogTrainHistory;

  return response;
};

export { getDataLogTrainingModelHistory, handleDataLogTrainModelHistory };
