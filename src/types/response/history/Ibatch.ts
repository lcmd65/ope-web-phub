export interface IBatch {
  Ad_SauChinh: any;
  Axit: any;
  Muoi: any;
  NaOH: any;
  Ph_SauChinh: any;
  Vis_SauChinh: any;
  _id: string;
  mixer_id: string;
  batchNo: string;
  start_time: string;
  status: string;
  is_suggested: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  mixer_category_id: string;
  productCode: string;
  mixer_category: MixerCategory;
  vis_predict_data: VisPredictData;
  vis_safe_zone: SafeZone;
  ad_predict_data: AdPredictData;
  ad_safe_zone: SafeZone;
  ph_predict_data: PhPredictData;
  ph_safe_zone: SafeZone;
  end_time?: string;
  date?: number;
  shift_num?: number;
  week_num?: number;
}

export interface IUpdateBatchRequest {
  Axit?: number;
  Muoi?: number;
  NaOH?: number;
  Ph_SauChinh?: number;
  Vis_SauChinh?: number;
  Ad_SauChinh?: number;
}

export interface IUpdateBatchForm {
  axit: string | number;
  muoi: string | number;
  naOH: string | number;
  phSauChinh: string | number;
  visSauChinh: string | number;
  adSauChinh: string | number;
}

export interface MixerCategory {
  id: string;
  mixer_name: string;
  category_name: string;
}

export interface VisPredictData {
  _id?: string;
  batch_id?: string;
  status?: string;
  pressure?: number;
  speed?: number;
  temp?: number;
  weight?: number;
  real_vis?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  BatchCodeModified?: string;
  predict_vis?: number;
  vis_certain_pass?: string;
}

export interface AdPredictData {
  _id?: string;
  batch_id?: string;
  status?: string;
  pressure?: number;
  speed?: number;
  temp?: number;
  weight?: number;
  real_ad?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  BatchCodeModified?: string;
  predict_ad?: number;
  ad_certain_pass?: string;
}

export interface PhPredictData {
  _id?: string;
  batch_id?: string;
  real_ph?: number;
  predict_ph?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  accurate?: number;
  actual?: string;
  evaluate?: string;
  predict?: string;
  inputs?: Inputs;
}

export interface Inputs {
  [key: string]: number | undefined;
}

export interface SafeZone {
  cuc?: number;
  lower_limit?: number;
  upper_limit?: number;
  rmse?: number;
  safezone?: string;
  lower_safezone?: number;
  upper_safezone?: number;
}

export interface MixerHistory {
  batchNo?: string;
  cucCode?: string;
  time?: string;
  status?: string;
  batchVisDetail?: BatchDetail;
  batchAdDetail?: BatchDetail;
  batchPHDetail?: BatchDetail;
}
export interface BatchDetail {
  batchNo?: string;
  weight?: number;
  temperature?: number;
  pressure?: number;
  pumpSpeed?: number;
  predictedValue?: number;
  actualValue?: number | null;
  regulatedValueRange: (number | undefined)[];
  safeValueRange: (number | undefined)[];
}
