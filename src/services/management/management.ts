import apiGetClient from "services/axios/apiClient/get";
import { IBCTLostByCUC } from "types/response/management_view/IBCTLostByCUC";
import { IBCTLostByStep } from "types/response/management_view/IBCTLostByStep";
import { IBCTLostByShift } from "types/response/management_view/IBCTLostShift";
import { IBCTLost } from "types/response/management_view/IBTCLost";
import { IStepLostByShift } from "types/response/management_view/IStepLossByShift";
import Endpoints from "utilities/enums/Endpoint";
import { sortDatesOldToNew } from "utilities/function/sortDate";

export async function getBCTLostByMixer(mixer_id?: string, from_date?: string, to_date?: string) {
  const res = await apiGetClient<IBCTLost[]>(Endpoints.MANAGEMENT.BCTLOST_BY_MIXER, {
    mixer_id,
    from_date,
    to_date,
  });
  if (res.error || !res.data) {
    return {
      data: [],
    };
  }
  return {
    data: res.data,
  };
}

export async function getBCTLostByCucCode(mixer_id?: string, cuc_code?: string, from_date?: string, to_date?: string) {
  const res = await apiGetClient<IBCTLostByCUC>(Endpoints.MANAGEMENT.BCTLOST_BY_CUC, {
    mixer_id,
    cuc_code,
    from_date,
    to_date,
  });
  if (res.error || !res.data) {
    return {
      data: undefined,
    };
  }
  return {
    data: res.data,
  };
}

export async function getBCTLostByStep(
  mixer_id?: string,
  cuc_code?: string,
  batch_no?: string,
  from_date?: string,
  to_date?: string,
) {
  const res = await apiGetClient<IBCTLostByStep[]>(Endpoints.MANAGEMENT.BCTLOST_BY_BATCH, {
    mixer_id,
    cuc_code,
    batch_no,
    from_date,
    to_date,
  });

  if (res.error || !res.data) {
    return {
      data: [] as IBCTLostByStep[],
    };
  }
  return {
    data: res.data,
  };
}

export async function getBCTLostByShift(mixer_id?: string, from_date?: string, to_date?: string) {
  const res = await apiGetClient<IBCTLostByShift[]>(Endpoints.MANAGEMENT.BCTLOST_BY_SHIFT, {
    mixer_id,
    from_date,
    to_date,
  });
  if (res.error || !res.data) {
    return {
      data: [] as IBCTLost[],
    };
  }
  return {
    data: res.data,
  };
}

export async function getStepLostByShift(mixer_id?: string, from_date?: string, to_date?: string) {
  const res = await apiGetClient<IStepLostByShift[]>(Endpoints.MANAGEMENT.BCTSTEP_LOSS_BY_SHIFT, {
    mixer_id,
    from_date,
    to_date,
  });
  if (res.error || !res.data) {
    return {
      data: [] as IStepLostByShift[],
    };
  }
  return {
    data: res.data,
  };
}

export function handleDataShiftLossBCT(data: IBCTLostByShift[]) {
  let response = [] as IBCTLostByShift[];
  let dateArray = [] as string[];
  if (data) {
    data.map((item) => {
      dateArray.push(item.shift_date);
      dateArray = sortDatesOldToNew(Array.from(new Set(dateArray)));
    });
  }

  dateArray.map((date) => {
    response.push(data?.find((item) => item.shift_date == date) as IBCTLostByShift);
  });

  return response;
}
