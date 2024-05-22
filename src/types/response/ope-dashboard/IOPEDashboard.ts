interface IDataOPEByShift {
  mixer_id: string;
  shift: number;
  date: string;
  ope: number;
  internal: number;
  external: number;
  mixer_name: string;
}

interface IBatchInfo {
  BatchNo: string;
  Week: string;
  DayInWeek: string;
  BatchDate: string;
  productCode: string;
  mixerName: string;
  StepInfo: any;
}

interface IStackedBarChartByShift {
  name?: string;
  date: string;
  shift1: any;
  shift2: any;
  shift3: any;
}

interface IDataLossBCTInternal {
  mixer_id: string;
  cuc_code: string;
  total_times: number;
  loss_percent: number;
  batch_nos_list: string[];
}

interface IDataLossBCTExternal {
  date: string;
  mixer_id: string;
  shift: number;
  cuc_code: string;
  idle_time: number;
  cip: number;
}

interface IDataOPEStepMixerDate {
  batchInfos: IBatchInfo[];
  stepNamesList: any;
}

interface IDataOPEStepMixerAverage {
  stepInfos: any;
  stepNamesList: any;
}

export type {
  IDataOPEByShift,
  IStackedBarChartByShift,
  IDataLossBCTInternal,
  IDataLossBCTExternal,
  IBatchInfo,
  IDataOPEStepMixerDate,
  IDataOPEStepMixerAverage,
};
