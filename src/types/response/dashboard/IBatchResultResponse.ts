export interface IBatchResultResponse {
  msg: string;
  data?: IBatchResult | null;
}

export interface IBatchResult {
  predict: Predict;
  spec_data: SpecData;
  material_spec_data: MaterialSpecData;
}

export interface Predict {
  ph: PredictData;
  vis: PredictData;
  ad: PredictData;
}

export interface PredictData {
  value: number;
  status: string;
}

export interface SpecData {
  ph: number[];
  vis: number[];
  ad: number[];
}

export interface MaterialSpecData {
  water: number;
  naoh: number;
  las: number;
  water_suggested: number;
  naoh_suggested: number;
  las_suggested: number;
}
