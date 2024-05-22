interface INumberSampleByCUC {
  _id: string;
  cuc: string;
  train: number;
  test: number;
  rmse: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ISignalTrainInfo {
  _id: string;
  number_samples: string;
  rmse: string;
  file: string;
  type: string;
  number_samples_by_cuc: INumberSampleByCUC[];
}

interface ITrainingModelResponse {
  key: string;
  _id: string;
  date_train: string;
  version: string;
  signal_train_infos: ISignalTrainInfo[];
}

interface ITrainingModelExpendedRow {
  _id: string;
  number_samples: string;
  rmse: string;
  file: string;
  type: string;
}

export type { ISignalTrainInfo, INumberSampleByCUC, ITrainingModelExpendedRow };

export default ITrainingModelResponse;
