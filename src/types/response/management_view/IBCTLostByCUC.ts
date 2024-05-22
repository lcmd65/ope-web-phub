export interface IBCTLostByCUC {
  _id: string;
  mixer_id: string;
  status: string;
  cuc_code: string;
  shift: number;
  shift_date: string;
  total_times: number;
  loss_percent: number;
  standard_time: number;
  batch_nos_list: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  ope_data_detail: OpeDataDetail[];
}

export interface OpeDataDetail {
  StartTS: string;
  EndTS: string;
  BatchID: string;
  CUCCode: string;
  ActualBCT: number;
  LossPercent: number;
}
