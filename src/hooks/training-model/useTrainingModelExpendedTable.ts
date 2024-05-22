import { useState } from "react";
import { INumberSampleByCUC } from "types/response/training-model/ITrainingModelResponse";

const useTrainingModelExpendedTable = () => {
  const [openDetailSampleModal, setOpenDetailSampleModal] = useState(false);
  const [dataDetailSample, setDataDetailSample] = useState<INumberSampleByCUC[]>([] as INumberSampleByCUC[]);

  return {
    openDetailSampleModal,
    dataDetailSample,
    setOpenDetailSampleModal,
    setDataDetailSample,
  };
};

export default useTrainingModelExpendedTable;
