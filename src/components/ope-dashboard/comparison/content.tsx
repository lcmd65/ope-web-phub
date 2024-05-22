import { IDataOPEStepMixerAverage } from "types/response/ope-dashboard/IOPEDashboard";
import ActualVsStandard from "./actual_vs_standard";
import AverageOfLossByShift from "./avg_of_loss_by_shift";

type Props = {
  dataOPEStepMixerAverage: IDataOPEStepMixerAverage;
  isLoading: boolean;
};

const ComparisonContent = (props: Props) => {
  return (
    <div className="flex w-full h-full overflow-hidden gap-4">
      <div className="w-1/2">
        <h1>Actual vs Standard</h1>
        <ActualVsStandard dataOPEStepMixerAverage={props.dataOPEStepMixerAverage} isLoading={props.isLoading} />
      </div>
      <div className="w-1/2">
        <h1>Average of Loss By Step</h1>
        <AverageOfLossByShift dataOPEStepMixerAverage={props.dataOPEStepMixerAverage} isLoading={props.isLoading} />
      </div>
    </div>
  );
};

export default ComparisonContent;
