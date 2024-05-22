import LoadingIndicator from "components/dashBoard/LoadingIndicator";
import {
  IDataLossBCTExternal,
  IDataLossBCTInternal,
  IDataOPEByShift,
  IStackedBarChartByShift,
} from "types/response/ope-dashboard/IOPEDashboard";
import DashBoardStack from "./dashboard_stack";
import DashBoardStat from "./dashboard_stat";

type Props = {
  isLoading: boolean;
  dataChartOPEByShift: IStackedBarChartByShift[];
  dataChartCIPByShift: IStackedBarChartByShift[];
  dataOPEByShift: IDataOPEByShift[];
  dataLossBCTInternal: IDataLossBCTInternal[];
  dataLossBCTExternal: IDataLossBCTExternal[];
};

const OPEDashboardContent = (props: Props) => {
  return (
    <div className="flex" style={{ filter: props.isLoading ? "blur(3px)" : "none" }}>
      {props.isLoading && <LoadingIndicator />}
      <DashBoardStack
        dataOPEByShift={props.dataOPEByShift}
        dataLossBCTInternal={props.dataLossBCTInternal}
        dataLossBCTExternal={props.dataLossBCTExternal}
      />
      <DashBoardStat dataChartOPEByShift={props.dataChartOPEByShift} dataChartCIPByShift={props.dataChartCIPByShift} />
    </div>
  );
};

export default OPEDashboardContent;
