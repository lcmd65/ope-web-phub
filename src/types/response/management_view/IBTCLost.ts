export interface IBCTLost {
  _id: string;
  mixer_id: string;
  status: string;
  cuc_code: string;
  shift: number;
  shift_date: string;
  total_times: number;
  standard_time: number;
  loss_percent: number;
  batch_nos_list: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
