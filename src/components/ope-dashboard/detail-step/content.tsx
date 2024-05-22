import { Checkbox, Radio } from "antd";
import CheckboxBox from "./checkbox-box";
import DetailStepStats from "./detail-step-stats";

const CheckboxGroup = Checkbox.Group;

type Props = {
  keyStepInfoList: any[];
  dataOPEbyDateStepChart: any[];
  dataOPEbyDate: any[];
  isLoading: boolean;
  modeTime: string;
  selectStepDay: any[];
  selectStepWeek: any[];
  modeTimeChange: (e: any) => void;
  onSelectStep: (e: any) => void;
  onCheckAllChange: (e: any) => void;
};

const DetailStepContent = (props: Props) => {
  return (
    <div className="flex">
      <div className="flex flex-col gap-4">
        <CheckboxBox
          keyStepInfoList={props.keyStepInfoList}
          onSelectStep={props.onSelectStep}
          selectStepList={props.modeTime == "day" ? props.selectStepDay : props.selectStepWeek}
          onCheckAllChange={props.onCheckAllChange}
        />
        <Radio.Group value={props.modeTime} onChange={props.modeTimeChange}>
          <Radio.Button value="day">Day</Radio.Button>
          <Radio.Button value="week">Week</Radio.Button>
        </Radio.Group>
      </div>
      <DetailStepStats
        dataOPEbyDateStepChart={props.dataOPEbyDateStepChart}
        dataOPEbyDate={props.dataOPEbyDate}
        isLoading={props.isLoading}
        modeTime={props.modeTime}
      />
    </div>
  );
};

export default DetailStepContent;
