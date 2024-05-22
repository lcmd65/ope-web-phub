interface IArea {
  _id: string;
  code: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IMixerLoss {
  _id: string;
  mixer_id: string;
  batch_no: string;
  CUCCode: string;
  status: string;
  status_log: string;
  shift: number;
  batch_date: string;
  duration: number;
  duration_start: string;
  duration_end: string;
  Area: IArea[];
  createdAt: string;
  updatedAt: string;
  ReasonLevel1: any;
  ReasonLevel2: any;
  ReasonLevel3: any;
  note: string;
  __v: number;
  type?: string;
}

interface IDataLossAreaChart {
  area: string;
  loss: number;
}

interface IDataLossReasonChart {
  reasonName: string;
  loss: number;
}

interface IImportLossInternalForm {
  mixerId: string;
  startDate: any;
  startTime: any;
  endDate: any;
  endTime: any;
}

interface IImportLossInternalRequest {
  mixer_id: string;
  duration_start: string;
  duration_end: string;
}

export type {
  IArea,
  IMixerLoss,
  IDataLossAreaChart,
  IDataLossReasonChart,
  IImportLossInternalRequest,
  IImportLossInternalForm,
};
