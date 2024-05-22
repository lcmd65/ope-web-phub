interface IInfoCUCMixer {
  key: React.Key;
  serial: number;
  CUCCode: string;
  MixerName: string;
  _id: string;
  schedule_date: string;
  shift: number;
  CUCCodeActual: string;
  BatchNo: string;
  MixerID: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IDataInfoCUCMixer {
  mixerId: string;
  mixerName: string;
  data: IInfoCUCMixer[];
}

interface IListCUCStatusDelete {
  mixerId: string;
  CUCStatusId: any[];
}

interface IImportCUCScheduleForm {
  CUCCode: string;
  mixerId: string;
  scheduleDate: string;
  shift: string;
}

interface IImportMixerWeightForm {
  value: string;
  mixerId: string;
  shiftDate: string;
  shift: string;
}
export type { IInfoCUCMixer, IDataInfoCUCMixer, IListCUCStatusDelete, IImportCUCScheduleForm, IImportMixerWeightForm };
