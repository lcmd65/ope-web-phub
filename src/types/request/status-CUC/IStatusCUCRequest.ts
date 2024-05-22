interface IImportCUCScheduleRequest {
  CUCCode: string;
  MixerID: string;
  MixerName: string;
  schedule_date: string;
  shift: string;
  CUCCodeActual?: string;
  BatchNo?: string;
  status?: string;
}

interface IImportMixerWeightRequest {
  mixer: string;
  value: string;
  shift_date: string;
  shift: string;
}

interface IUpdateCUCScheduleRequest {
  serial: number;
  CUCCode: string;
}

interface IListIndexUpdatedCUC {
  newIndex: number;
  oldIndex: number;
  idCUCSchedule: string;
}
export type { IImportCUCScheduleRequest, IImportMixerWeightRequest, IUpdateCUCScheduleRequest, IListIndexUpdatedCUC };
