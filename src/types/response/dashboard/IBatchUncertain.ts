export interface IBatchUncertain {
  batch_no_uncertain: BatchNoUncertain[];
  total_predict_pass: number;
  total_predict: number;
}

export interface BatchNoUncertain {
  batchNo: string;
  ph_status: string;
  vis_status: string;
  ad_status: string;
}
