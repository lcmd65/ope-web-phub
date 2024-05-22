import { IBatchResult } from "types/response/dashboard/IBatchResultResponse";
import { IBatchUncertain } from "types/response/dashboard/IBatchUncertain";
import { IOPE } from "types/response/dashboard/IOPE";
import { IOR } from "types/response/dashboard/IOR";
import { IBatchLossData, ShiftData } from "types/response/dashboard/IToploss";
import { IPumpStatus } from "types/response/pump/IPumpStatus";
import ProgressCard from "./categoryPorpotion/progressCard";
import BatchEfficiencyCard from "./cucDetail/cucDetailCard";
import LoadingIndicator from "./LoadingIndicator";
import QualityPredictCard from "./spec/qualityPredictCard";

const DashBoardContent = (props: {
  loading?: boolean;
  batchResult?: IBatchResult;
  batchUncertain?: IBatchUncertain;
  ope?: IOPE;
  external?: number;
  opeHistory?: IOPE[];
  or?: IOR;
  orHistory?: IOR[];
  thisShiftTopLoss?: ShiftData;
  lastShiftTopLoss?: ShiftData;
  currentBatchTopLoss?: IBatchLossData;
  mixer_id: string;
  pumpStatus?: IPumpStatus;
}) => {
  const {
    loading,
    batchResult,
    batchUncertain,
    ope,
    external,
    opeHistory,
    or,
    orHistory,
    thisShiftTopLoss,
    lastShiftTopLoss,
    currentBatchTopLoss,
    mixer_id,
    pumpStatus,
  } = props;
  return (
    <div className="w-full">
      {loading && <LoadingIndicator />}
      <div
        className="gap-[10px] relative grid grid-cols-11"
        style={
          loading
            ? {
                filter: "blur(3px)",
                pointerEvents: "none",
              }
            : {}
        }
      >
        <div className="h-full col-span-4 bg-white">
          <ProgressCard
            ope={ope}
            external={external}
            opeHistory={opeHistory}
            or={or}
            orHistory={orHistory}
            thisShiftTopLoss={thisShiftTopLoss}
            lastShiftTopLoss={lastShiftTopLoss}
          />
        </div>
        <div className="h-full col-span-4 bg-white">
          <BatchEfficiencyCard currentBatchTopLoss={currentBatchTopLoss} />
        </div>
        <div className="h-full col-span-3 bg-white">
          <QualityPredictCard
            is_pump_running={pumpStatus?.is_pumb_running}
            batchResult={batchResult}
            batchUncertain={batchUncertain}
            mixer_id={mixer_id}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoardContent;
