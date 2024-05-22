import { Radio } from "antd";
import { IMixerLoss } from "types/response/loss-management/ILossManagement";
import { formatDateTimeDetail } from "utilities/function/formatDateTime";

type Props = {
  currentId: string;
  onChange: (e: any) => void;
  lossInfo: IMixerLoss;
  loss?: string;
};

const LossInfoFrame = (props: Props) => {
  const { lossInfo } = props;
  return (
    <div
      className={
        lossInfo.status_log == "NOTED" ? "flex gap-2 pr-2 rounded-xl border-[1px]" : "flex gap-2 pr-2 rounded-xl"
      }
      style={{
        backgroundColor:
          lossInfo.status_log == "NOTED" ? "#FFFFFF" : lossInfo.type == "loss_internal" ? "#FFFF00" : "#FE6E4F",
      }}
    >
      <div
        className={`w-3 h-full rounded-l-xl`}
        style={{
          backgroundColor:
            lossInfo.status_log == "NOTED"
              ? lossInfo.ReasonLevel1?.length > 0
                ? `#${lossInfo.ReasonLevel1[0]?.color}`
                : "#FFFFFF"
              : lossInfo.type == "loss_internal"
              ? "#FFFF00"
              : "#FE6E4F",
        }}
      ></div>
      <Radio
        value={lossInfo._id}
        checked={props.currentId == lossInfo._id}
        onChange={(e) => {
          if (e.target.checked) props.onChange(e.target.value);
        }}
        className="w-full h-full py-2"
      >
        <div className="flex flex-col gap-1 ">
          <p className="text-[0.9vw]">
            {formatDateTimeDetail(lossInfo.duration_start)} | {formatDateTimeDetail(lossInfo.duration_end)}
          </p>
        </div>
      </Radio>
    </div>
  );
};

export default LossInfoFrame;
