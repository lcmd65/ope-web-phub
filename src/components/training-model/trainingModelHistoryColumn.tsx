import { ColumnsType } from "antd/es/table";
import ITrainingModelResponse from "types/response/training-model/ITrainingModelResponse";

const TrainingModelHistoryColumn = (): ColumnsType<ITrainingModelResponse> => [
  {
    title: "Version",
    dataIndex: "version",
  },
  {
    title: "Date train",
    dataIndex: "date_train",
  },
];

export { TrainingModelHistoryColumn };
