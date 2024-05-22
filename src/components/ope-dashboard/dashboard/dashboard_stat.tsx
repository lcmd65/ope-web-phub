import { Divider } from "antd";
import { IStackedBarChartByShift } from "types/response/ope-dashboard/IOPEDashboard";
import ByShiftDateChart from "./chart/byShiftDateChart";

type Props = {
  dataChartOPEByShift: IStackedBarChartByShift[];
  dataChartCIPByShift: IStackedBarChartByShift[];
};

const DashBoardStat = (props: Props) => {
  return (
    <div className="h-[90vh] w-[90%] pl-[32px]">
      <div className="h-[40vh] w-[100%]">
        <ByShiftDateChart title="%OPE by Shift" dataChart={props.dataChartOPEByShift} />
      </div>
      <Divider />
      <ByShiftDateChart title="%CIP by Shift" dataChart={props.dataChartCIPByShift} />
    </div>
  );
};

export default DashBoardStat;
