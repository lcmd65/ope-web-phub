export interface IStepLostByShift {
  name: string;
  total_loss_percent: number;
  shift_step_loss_list: ShiftStepLossList[];
}

export interface ShiftStepLossList {
  name: string;
  shift: number;
  shift_date: string;
  start_date: string;
  total_loss_percent: number;
  step_loss_list: StepLossList[];
}

export interface StepLossList {
  name: string;
  batch_no: string;
  cuc_code: string;
  shift_date: string;
  shift: number;
  start_date: string;
  actual: number;
  standard: number;
  loss_percent: number;
}
