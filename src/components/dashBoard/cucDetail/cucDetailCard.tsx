import { Divider } from "antd";
import { useEffect, useState } from "react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { objectKeysToLowerCase } from "services/dashboard/dashboard";
import color from "styles/enums/color";
import { IBatchLossData } from "types/response/dashboard/IToploss";
import { useKeys } from "utilities/enums/AppEnums";
import { handleLowerCaseArray } from "utilities/function/handleLowerCaseArray";

enum CUCType {
  text = "text",
  tag = "tag",
}
interface CUCInfo {
  category: string;
  value: string;
  type: CUCType;
}

interface EfficiencyData {
  batch_no: any;
  Actual: any;
  Standard: any;
}

const BatchEfficiencyCard = (props: { currentBatchTopLoss?: IBatchLossData }) => {
  const { currentBatchTopLoss } = props;
  const [stepLostData, setStepLossData] = useState<EfficiencyData[] | undefined>();
  const [isErrorMasterData, setIsErrorMasterData] = useState(false);

  useEffect(
    () => {
      if (currentBatchTopLoss?.masterDataInfo.length == 1 && currentBatchTopLoss?.masterDataInfo[0].ProductCode == 0) {
        setIsErrorMasterData(true);
      } else {
        setIsErrorMasterData(false);
      }
      const allKey = Object.keys((currentBatchTopLoss?.topLoss as object) ?? {}).concat(
        Object.keys((currentBatchTopLoss?.masterDataInfo[0] as object) ?? {}),
      );

      const dataChart = [] as EfficiencyData[];
      const dataTopLossLowerKey = objectKeysToLowerCase(currentBatchTopLoss?.topLoss);
      handleLowerCaseArray(allKey).map((key) => {
        if (
          handleLowerCaseArray(useKeys).includes(key) &&
          !(
            !dataTopLossLowerKey[key] &&
            dataTopLossLowerKey[key] != 0 &&
            currentBatchTopLoss?.masterDataInfo[0][key] == 0
          )
        ) {
          dataChart.push({
            batch_no: currentBatchTopLoss?.stepNamesList[key.toLowerCase()]
              ? currentBatchTopLoss?.stepNamesList[key.toLowerCase()]
              : key,
            Actual: dataTopLossLowerKey[key] ? parseFloat(Number(dataTopLossLowerKey[key]).toFixed(2)) : 0,
            Standard: currentBatchTopLoss?.masterDataInfo[0][key]
              ? parseFloat(Number(currentBatchTopLoss?.masterDataInfo[0][key]).toFixed(2))
              : 0,
          });
        }
      });
      setStepLossData(
        dataChart.sort((a, b) => {
          // Sort by 'Actual' in descending order
          if (b.Actual !== a.Actual) {
            return b.Actual - a.Actual;
          }
          // If 'Actual' is equal, sort by 'Standard' in descending order
          return b.Standard - a.Standard;
        }),
      );
    },
    // eslint-disable-next-line
    [props],
  );

  const height = 80 * ((stepLostData ?? []).length ?? 0);

  return (
    <div
      style={{
        paddingTop: 12,
        paddingBottom: 0,
        paddingLeft: 4,
        paddingRight: 4,
        background: color.white,
        width: "100%",
        maxHeight: "80vh",
      }}
      className="flex flex-col items-center"
    >
      <h1>Current batch performance</h1>
      <div>
        <h2>{"Batch ID: " + currentBatchTopLoss?.BatchID}</h2>
        <h2>{"CUC Code: " + currentBatchTopLoss?.CUCCode}</h2>
      </div>
      <Divider></Divider>
      {isErrorMasterData ? (
        <div className="text-[#000000]">
          <p>Lỗi dữ liệu Master Data, hiện không có dữ liệu Product Code</p>
        </div>
      ) : (
        <div
          className="batchEfficiency"
          style={{
            width: "100%",
            height: height + "px",
            scrollbarColor: color.brightGray,
            overflow: "overlay",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart width={500} height={1000} data={stepLostData} layout="vertical" style={{ fontSize: "1vw" }}>
              <Legend layout="horizontal" verticalAlign="top" align="center" />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" unit={" min"} tick={{ fontWeight: 500, fontSize: 18 }} />
              <YAxis
                dataKey="batch_no"
                type="category"
                minTickGap={10}
                tickSize={10}
                width={120}
                tick={{ fontWeight: 700, fontSize: "0.9vw", wordSpacing: 0 }}
              />
              <Tooltip contentStyle={{ color: color.black }} />
              <Bar dataKey="Actual" fill={color.darkGreen}>
                <LabelList dataKey="Actual" position="right" angle={360} offset={20} fill="black" dx={-10} />
                {stepLostData?.map((item, index) => (
                  <Cell
                    cursor="pointer"
                    fill={item.Actual >= item.Standard ? color.error : color.darkGreen}
                    key={`cell-${index}`}
                  />
                ))}
              </Bar>
              <Bar dataKey="Standard" fill={color.purple}>
                <LabelList dataKey="Standard" position="right" angle={360} offset={20} fill="black" dx={-10} />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}

      <Divider></Divider>
    </div>
  );
};

export default BatchEfficiencyCard;
export type { CUCInfo, CUCType };
