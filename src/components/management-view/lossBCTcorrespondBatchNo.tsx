import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import color from "styles/enums/color";
import { IBCTLostByStep } from "types/response/management_view/IBCTLostByStep";
import { useStepName } from "utilities/enums/AppEnums";
import { decimalToPercent, roundTo2Digits } from "utilities/function/roundTo2Digits";

const LossBCTcorrespondBatchNo = (props: { BCTLostListByBatchNo: IBCTLostByStep[] }) => {
  var chartLostBCTData: any = [];
  if (!props.BCTLostListByBatchNo) {
    chartLostBCTData = [];
  } else {
    chartLostBCTData = props.BCTLostListByBatchNo.map((item) => {
      if (useStepName.includes(item.name)) {
        return {
          name: item.name,
          Actual: roundTo2Digits(item.actual),
          Standard: roundTo2Digits(item.standard),
          "Loss Percent": decimalToPercent(item.loss_percent),
        };
      }
    }).filter((item) => item != undefined);
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart width={500} height={400} data={chartLostBCTData} style={{ fontSize: "0.9vw" }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          label={{ value: "Step", position: "right", offset: -2 }}
          interval={0}
          fontSize={"0.7vw"}
        />
        <YAxis yAxisId="left" label={{ value: "min", position: "top", offset: 10 }} />
        <YAxis yAxisId="right" label={{ value: "%", position: "top", offset: 10 }} orientation="right" />
        <Tooltip contentStyle={{ color: color.black }} />
        <Legend verticalAlign="top" />
        <Bar
          yAxisId="left"
          dataKey="Actual"
          //barSize={30}
          fill={color.darkGreen}
        />
        <Bar
          yAxisId="left"
          dataKey="Standard"
          //barSize={30}
          fill={color.purple}
        />
        <Line yAxisId="right" type="monotone" dataKey="Loss Percent" stroke={color.blue} strokeWidth={3} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default LossBCTcorrespondBatchNo;
