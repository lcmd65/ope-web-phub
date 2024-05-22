export const getAllMixerList = async () => {
  // const res = await apiGetClient<IMixerResponse[]>(Endpoints.DASHBOARD.MIXER, {});
  const res = {
    msg: "SUCCESS",
    data: [
      {
        mixer_id: "103faad6-5800-40e2-8c9d-5ac71c63b5a0",
        category_name: null,
        name: "503",
        batch: null,
      },
      {
        mixer_id: "38ded70d-d178-4bde-a975-36f3e5abfbf7",
        category_name: null,
        name: "1501",
        batch: null,
      },
      {
        mixer_id: "ae68f093-c8cf-40d1-bd22-dab9e4cef053",
        category_name: null,
        name: "1001",
        batch: null,
      },
      {
        mixer_id: "ba9b8628-3756-4627-a4e1-b6b2a5dcd47e",
        category_name: null,
        name: "502",
        batch: null,
      },
      {
        mixer_id: "c782c36d-227e-4d55-aa22-fc3527a76f2a",
        category_name: null,
        name: "501",
        batch: null,
      },
    ],
  };
  return {
    data: res.data,
  };
};

export async function getBatchResult(mixerId?: string) {
  // const res = await apiGetClient<IBatchResult>(Endpoints.DASHBOARD.BATCH_RESULT + "?mixer_id=" + mixerId);
  const res = {
    msg: "SUCCESS",
    data: {
      predict: {
        ph: 6.811688311688307,
        vis: 0,
        ad: 0,
      },
      spec_data: {
        ph: [7.7, 8.3],
        vis: [200, 400],
        ad: [200, 400],
      },
      material_spec_data: {
        water: 6029.653,
        naoh: 450.08255,
        las: 1095.4513,
      },
    },
  };
  return {
    data: res.data,
  };
}

export async function getBatchUncertain(mixerId?: string) {
  // const res = await apiGetClient<IBatchUncertain>(Endpoints.DASHBOARD.BATCH_RESULT_UNCERTAIN + "?mixer_id=" + mixerId);
  const res = {
    error: false,
    msg: "SUCCESS",
    data: {
      batch_no_uncertain: ["233022204"],
      total_predict_pass: 77,
      total_predict: 99,
    },
  };
  return {
    data: res.data,
  };
}

export async function getOPE(mixerId?: string) {
  // const res = await apiGetClient<IOPE>(Endpoints.DASHBOARD.IOPE + "?mixer_id=" + mixerId);
  const res = {
    error: false,
    msg: "",
    data: {
      shift: 2,
      date: "27/07/2023",
      ope: 0.542,
    },
  };
  return {
    data: res.data,
  };
}

export async function getOPEHistory(mixerId?: string) {
  // const res = await apiGetClient<IOPE[]>(Endpoints.DASHBOARD.OPE_HISTORY + "?mixer_id=" + mixerId);
  const res = {
    error: false,
    msg: "",
    data: [
      {
        shift: 2,
        date: "27/07/2023",
        ope: 0.425,
      },
      {
        shift: 1,
        date: "28/07/2023",
        ope: 0.85,
      },
      {
        shift: 3,
        date: "29/07/2023",
        ope: 0.991,
      },
    ],
  };

  return {
    data: res.data,
  };
}

export async function getOR(mixerId?: string) {
  // const res = await apiGetClient<IOR>(Endpoints.DASHBOARD.IOR + "?mixer_id=" + mixerId);
  const res = {
    error: false,
    msg: "",
    data: {
      shift: 2,
      date: "27/07/2023",
      or: 0.375,
    },
  };
  return {
    data: res.data,
  };
}

export async function getORHistory(mixerId?: string) {
  // const res = await apiGetClient<IOR[]>(Endpoints.DASHBOARD.OR_HISTORY + "?mixer_id=" + mixerId);
  const res = {
    error: false,
    msg: "",
    data: [
      {
        shift: 2,
        date: "27/07/2023",
        or: 0.375,
      },
      {
        shift: 1,
        date: "28/07/2023",
        or: 0.425,
      },
      {
        shift: 3,
        date: "29/07/2023",
        or: 0.31,
      },
    ],
  };

  return {
    data: res.data,
  };
}

export async function getMixerLastShiftTopLoss(mixerId?: string) {
  // const res = await apiGetClient<IToploss>(Endpoints.DASHBOARD.TOP_LOSS_LAST_SHIFT + "?mixer_id=" + mixerId);
  const res = {
    msg: "SUCCESS",
    data: {
      toploss: [8, 5, 1],
    },
  };
  return {
    data: res.data,
  };
}

export async function getMixerThisShiftTopLoss(mixerId?: string) {
  // const res = await apiGetClient<IToploss>(Endpoints.DASHBOARD.TOP_LOSS_THIS_SHIFT + "?mixer_id=" + mixerId);
  const res = {
    msg: "SUCCESS",
    data: {
      toploss: [8, 5, 1],
    },
  };
  return {
    data: res.data,
  };
}

export async function getBatchEfficiency(mixerId?: string) {
  // const res = await apiGetClient<IEfficiency[]>(Endpoints.DASHBOARD.BATCH_EFFICIENCY + "?mixer_id=" + mixerId);
  const res = {
    message: "SUCCESS",
    data: [
      {
        batch_no: "233013505",
        actual: 95,
        spec: 100,
      },
      {
        batch_no: "233013504",
        actual: 620,
        spec: 600,
      },
      {
        batch_no: "233013503",
        actual: 312,
        spec: 280,
      },
      {
        batch_no: "233013502",
        actual: 550,
        spec: 520,
      },
      {
        batch_no: "233013501",
        actual: 800,
        spec: 750,
      },
      {
        batch_no: "233013500",
        actual: 420,
        spec: 400,
      },
      {
        batch_no: "233013499",
        actual: 280,
        spec: 260,
      },
      {
        batch_no: "233013498",
        actual: 110,
        spec: 100,
      },
      {
        batch_no: "233013497",
        actual: 950,
        spec: 900,
      },
      {
        batch_no: "233013496",
        actual: 760,
        spec: 700,
      },
      {
        batch_no: "233013495",
        actual: 610,
        spec: 590,
      },
      {
        batch_no: "233013494",
        actual: 920,
        spec: 880,
      },
      {
        batch_no: "233013493",
        actual: 340,
        spec: 320,
      },
      {
        batch_no: "233013492",
        actual: 520,
        spec: 500,
      },
      {
        batch_no: "233013491",
        actual: 180,
        spec: 170,
      },
      {
        batch_no: "233013490",
        actual: 450,
        spec: 420,
      },
      {
        batch_no: "233013489",
        actual: 890,
        spec: 850,
      },
      {
        batch_no: "233013488",
        actual: 720,
        spec: 680,
      },
      {
        batch_no: "233013487",
        actual: 260,
        spec: 240,
      },
      {
        batch_no: "233013486",
        actual: 670,
        spec: 650,
      },
    ],
  };
  return {
    data: res.data,
  };
}

export async function getMixerStatusHistory(mixerId?: string) {
  // const res = await apiGetClient<boolean[]>(Endpoints.DASHBOARD.MIXER_HISTORY + "?mixer_id=" + mixerId);

  const res = {
    msg: "SUCCESS",
    data: [
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      // true,
      // true,
      // true,
      // true,
      // true,
      // true,
      // true,
      // true,
      // true,
      // true,
    ],
  };

  return {
    data: res.data,
  };
}
