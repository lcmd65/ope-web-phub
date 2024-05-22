export interface IToploss {
  toploss: {
    key: string;
    value: number;
  }[];
}

export interface ShiftData {
  topLoss: TopLoss | null;
  masterDataInfo: MasterDataInfo[];
  BatchID: string;
  CUCCode: string;
  stepNamesList: any;
}

export interface IBatchLossData {
  topLoss: any;
  masterDataInfo: MasterDataInfo[];
  stepNamesList: any;
  BatchID: string;
  CUCCode: string;
}

export interface MasterDataInfo {
  [key: string]: number | string | null;
}

export interface TopLoss {
  _id: string;
  BatchDate: string;
  DayInWeek: number;
  Shift: number;
  StepLossDetails: StepLossDetail[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StepLossDetail {
  _id: string;
  BatchID: string[];
  BatchDate: string;
  CUCCode: string[];
  DayInWeek: number;
  Shift: number;
  Loss: number;
  PreviousLoss: number;
  CurrentStepLoss: number;
  Step: string;
  StepNameDisplay: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
