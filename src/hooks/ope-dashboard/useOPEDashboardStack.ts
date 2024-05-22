import { useEffect, useState } from "react";
import {
  handleDataLossBCTExternalPercentage,
  handleLossBCTExternalPercentage,
  handleLossBCTInternalPercentage,
  handleOPEPercentage,
} from "services/ope-dashboard/opeDashBoardService";
import { IMixerStatusOpeExtInt } from "types/response/dashboard/IMixerResponse";
import {
  IDataLossBCTExternal,
  IDataLossBCTInternal,
  IDataOPEByShift,
} from "types/response/ope-dashboard/IOPEDashboard";

const useOPEDashboardStack = (
  dataOPEByShift: IDataOPEByShift[],
  dataLossBCTInternal: IDataLossBCTInternal[],
  dataLossBCTExternal: IDataLossBCTExternal[],
) => {
  //statistic data
  const radian = Math.PI / 180;
  const colors = ["#0088FE", "#00C49F", "#FFBB28"];

  //data state
  const [dataChartOpeExtInt, setDataChartOpeExtInt] = useState<IMixerStatusOpeExtInt[]>([]);
  const [dataPercentCIP, setDataPercentCIP] = useState(0);
  const [isHiddenChartOpeExtInt, setIsHiddenChartOpeExtInt] = useState(false);

  useEffect(() => {
    setDataPercentCIP(handleDataLossBCTExternalPercentage(dataLossBCTExternal).CIP);
    const ope = handleOPEPercentage(dataOPEByShift);
    const external = handleLossBCTExternalPercentage(dataOPEByShift);
    const internal = handleLossBCTInternalPercentage(dataOPEByShift);
    setDataChartOpeExtInt([
      {
        name: "OPE",
        value: ope,
        key: "OPE",
      },
      {
        name: "External",
        value: external,
        key: "external",
      },
      {
        name: "Internal",
        value: 100 - external - ope,
        key: "internal",
      },
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataOPEByShift, dataLossBCTInternal, dataLossBCTExternal]);

  useEffect(() => {
    setIsHiddenChartOpeExtInt(false);
    dataChartOpeExtInt.forEach((item) => {
      if (item.value > 100 || !item.value) {
        setIsHiddenChartOpeExtInt(true);
      }
    });
  }, [dataChartOpeExtInt]);

  return { dataChartOpeExtInt, dataPercentCIP, isHiddenChartOpeExtInt, radian, colors };
};

export default useOPEDashboardStack;
