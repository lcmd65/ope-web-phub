export interface IMixerResponse {
  mixer_id: string;
  name: string;
}

export interface IMixerStatusResponse {
  _id: string;
  mixer_id: string;
  shift: number;
  shift_date: string;
  __v: any;
  createdAt: string;
  greenZone: number;
  redZone: number;
  shift_date_converted: string;
  status: string;
  updatedAt: string;
}

export interface IMixerStatusOpeExtInt {
  name: string;
  value: number;
  key: string;
  reality?: number;
}
