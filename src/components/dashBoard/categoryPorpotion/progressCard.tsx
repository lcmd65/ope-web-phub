import { Divider } from "antd";
import { useEffect, useState } from "react";
import color from "styles/enums/color";
import { IOPE } from "types/response/dashboard/IOPE";
import { IOR } from "types/response/dashboard/IOR";
import { IToploss, ShiftData } from "types/response/dashboard/IToploss";
import { UnusedKeys } from "utilities/enums/AppEnums";
import CategoryPorpotionGrid from "./categoryPorpotionGrid";
import TopLoss from "./topLoss";
const ProgressCard = (props: {
  ope?: IOPE;
  external?: number;
  opeHistory?: IOPE[];
  or?: IOR;
  orHistory?: IOR[];
  thisShiftTopLoss?: ShiftData;
  lastShiftTopLoss?: ShiftData;
}) => {
  const { ope, opeHistory, or, orHistory } = props;
  const [lastShiftTopLoss, setLastShiftTopLoss] = useState<IToploss | undefined>();
  const [thisShiftTopLoss, setThisShiftTopLoss] = useState<IToploss | undefined>();

  const getToploss = (shiftData: ShiftData | undefined, activeShift: boolean): IToploss => {
    if (shiftData == undefined || shiftData.topLoss == null) {
      return {
        toploss: [],
      };
    } else {
      const stepLossDetails = shiftData.topLoss.StepLossDetails;
      return {
        toploss:
          stepLossDetails
            .filter((item) => !UnusedKeys.includes(item.Step))
            .map((item) => {
              return { value: activeShift ? item.CurrentStepLoss ?? 0 : item.Loss ?? 0, key: item.StepNameDisplay };
            })
            .sort((a, b) => b.value - a.value)
            .slice(0, 3) ?? [],
      };
    }
  };

  useEffect(() => {
    setLastShiftTopLoss(getToploss(props.lastShiftTopLoss, false));
    setThisShiftTopLoss(getToploss(props.thisShiftTopLoss, true));
  }, [props.thisShiftTopLoss, props.lastShiftTopLoss]);

  return (
    <div
      style={{
        paddingTop: 8,
        paddingBottom: 0,
        paddingLeft: 8,
        paddingRight: 8,
        background: color.white,
        width: "100%",
      }}
      className="flex flex-col items-center"
    >
      <h1 style={{ color: color.black }}>Performance Summary</h1>
      <Divider />
      <div className="flex flex-col w-full gap-10">
        <CategoryPorpotionGrid
          title={"Shift OPE"}
          type="ope"
          data={ope?.ope}
          chartIOPEList={opeHistory}
          external={ope?.external}
          internal={ope?.internal}
        />
        <CategoryPorpotionGrid title={"Shift OR"} data={or?.or} chartIORList={orHistory} />
        <TopLoss lastShiftTopLoss={lastShiftTopLoss} thisShiftTopLoss={thisShiftTopLoss} />
      </div>
    </div>
    // </div>
  );
};

export default ProgressCard;
