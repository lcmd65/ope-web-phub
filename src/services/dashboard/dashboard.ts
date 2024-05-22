import apiGetClient from "services/axios/apiClient/get";
import { IBatchResult } from "types/response/dashboard/IBatchResultResponse";
import { IBatchStatus } from "types/response/dashboard/IBatchStatus";
import { IBatchUncertain } from "types/response/dashboard/IBatchUncertain";
import { IEfficiency } from "types/response/dashboard/IEfficiency";
import { IMixerResponse, IMixerStatusOpeExtInt, IMixerStatusResponse } from "types/response/dashboard/IMixerResponse";
import { IOPE } from "types/response/dashboard/IOPE";
import { IOR } from "types/response/dashboard/IOR";
import { IBatchLossData, ShiftData } from "types/response/dashboard/IToploss";
import Endpoints from "utilities/enums/Endpoint";
import { roundTo2Digits } from "utilities/function/roundTo2Digits";

export const getAllMixerList = async () => {
  const res = await apiGetClient<IMixerResponse[]>(Endpoints.DASHBOARD.MIXER, undefined);
  if (res.error || !res.data) {
    return {
      error: res.error,
      data: [],
    };
  }
  return {
    data: res.data,
  };
};

export async function getBatchResult(mixerId?: string) {
  const res = await apiGetClient<IBatchResult>(Endpoints.DASHBOARD.BATCH_RESULT + "?mixer_id=" + mixerId);
  if (res.error || !res.data) {
    return {
      error: res.error,
      data: undefined,
    };
  }
  return {
    data: res.data,
  };
}

export async function getBatchUncertain(mixerId?: string) {
  const res = await apiGetClient<IBatchUncertain>(Endpoints.DASHBOARD.BATCH_RESULT_UNCERTAIN + "?mixer_id=" + mixerId);
  if (res.error || !res.data) {
    return {
      error: res.error,
      data: undefined,
    };
  }
  return {
    data: res.data,
  };
}

export async function getOPE(mixerId?: string) {
  const res = await apiGetClient<IOPE>(Endpoints.DASHBOARD.IOPE + "?mixer_id=" + mixerId);
  if (res.error || !res.data) {
    return {
      error: res.error,
      data: undefined,
    };
  }
  return {
    data: res.data,
  };
}

export async function getMixerStatus(mixerId?: string) {
  let response = {} as IMixerStatusResponse;
  const res = await apiGetClient<IMixerStatusResponse>(Endpoints.DASHBOARD.MIXER_STATUS + "?mixer_id=" + mixerId);

  if (res.error || !res.data) {
    response = res.data;
  }
  return response;
}

export async function getOPEHistory(mixerId?: string) {
  const res = await apiGetClient<IOPE[]>(Endpoints.DASHBOARD.OPE_HISTORY + "?mixer_id=" + mixerId);
  if (res.error || !res.data) {
    return {
      error: res.error,
      data: [],
    };
  }
  return {
    data: res.data,
  };
}

export async function getOR(mixerId?: string) {
  const res = await apiGetClient<IOR>(Endpoints.DASHBOARD.IOR + "?mixer_id=" + mixerId);
  if (res.error || !res.data) {
    return {
      error: res.error,
      data: undefined,
    };
  }
  return {
    data: res.data,
  };
}

export async function getORHistory(mixerId?: string) {
  const res = await apiGetClient<IOR[]>(Endpoints.DASHBOARD.OR_HISTORY + "?mixer_id=" + mixerId);
  if (res.error || !res.data) {
    return {
      error: res.error,
      data: [],
    };
  }
  return {
    data: res.data,
  };
}

export async function getMixerLastShiftTopLoss(mixerId?: string) {
  const res = await apiGetClient<ShiftData>(Endpoints.DASHBOARD.TOP_LOSS_LAST_SHIFT + "?mixer_id=" + mixerId);
  if (res.error || !res.data) {
    return {
      error: res.error,
      data: undefined,
    };
  }
  return {
    data: res.data,
  };
}

export async function getMixerThisShiftTopLoss(mixerId?: string) {
  const res = await apiGetClient<ShiftData>(Endpoints.DASHBOARD.TOP_LOSS_THIS_SHIFT + "?mixer_id=" + mixerId);
  if (res.error || !res.data) {
    return {
      error: res.error,
      data: undefined,
    };
  }

  return {
    data: res.data,
  };
}

export async function getMixerCurrentBatchTopLoss(mixerId?: string) {
  const res = await apiGetClient<IBatchLossData>(Endpoints.DASHBOARD.TOP_LOSS_CURRENT_SHIFT + "?mixer_id=" + mixerId);
  if (res.error || !res.data) {
    return {
      error: res.error,
      data: undefined,
    };
  }

  return {
    data: res.data,
  };
}

export async function getBatchEfficiency(mixerId?: string) {
  const res = await apiGetClient<IEfficiency[]>(Endpoints.DASHBOARD.BATCH_EFFICIENCY + "?mixer_id=" + mixerId);
  if (res.error || !res.data) {
    return {
      error: res.error,
      data: [],
    };
  }
  return {
    data: res.data,
  };
}

export async function getMixerStatusHistory(mixerId?: string) {
  const res = await apiGetClient<IBatchStatus[]>(Endpoints.DASHBOARD.MIXER_HISTORY + "?mixer_id=" + mixerId);
  if (res.error || !res.data) {
    return {
      error: res.error,
      data: [],
    };
  }
  return {
    data: res.data,
  };
}

export function objectKeysToLowerCase(obj: Record<string, any>): Record<string, any> {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key.toLowerCase()] = obj[key];
    }
  }
  return newObj;
}

export function handleExternal(data: IMixerStatusResponse) {
  let response = 0;
  if (data && data.greenZone && data.redZone) {
    response = Number(data.redZone) / (Number(data.redZone) + Number(data.greenZone));
  }

  return response;
}

export function handleChartOPEExternalInternal(props: { ope?: number; external?: number; internal?: number }) {
  const { ope, external, internal } = props;
  let response = [
    { name: "%OPE", value: 0, key: "ope", reality: 0 },
    { name: "%External", value: 0, key: "external", reality: 0 },
    { name: "%Internal", value: 0, key: "internal", reality: 0 },
  ] as IMixerStatusOpeExtInt[];
  if (typeof ope === "number" && typeof external === "number") {
    if (ope + external > 1) {
      response = [
        {
          name: "%OPE",
          value: Number(roundTo2Digits(ope / (ope + external))),
          key: "ope",
          reality: Number(roundTo2Digits(ope)),
        },
        {
          name: "%External",
          value: Number(roundTo2Digits(external / (ope + external))),
          key: "external",
          reality: Number(roundTo2Digits(external)),
        },
        { name: "%Internal", value: 0, key: "internal", reality: Number(roundTo2Digits(1 - ope - external)) },
      ];
    } else {
      response = [
        {
          name: "%OPE",
          value: Number(roundTo2Digits(ope)),
          key: "ope",
          reality: Number(roundTo2Digits(ope)),
        },
        {
          name: "%External",
          value: Number(roundTo2Digits(external)),
          key: "external",
          reality: Number(roundTo2Digits(external)),
        },
        {
          name: "%Internal",
          value: Number(roundTo2Digits(internal)),
          key: "internal",
          reality: Number(roundTo2Digits(internal)),
        },
      ];
    }
  }

  return response;
}
