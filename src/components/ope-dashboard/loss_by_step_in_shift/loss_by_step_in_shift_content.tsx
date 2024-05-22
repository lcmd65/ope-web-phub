import { Tooltip } from "antd";
import { Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";
import color from "styles/enums/color";

const LostByStepInShiftContent = () => {
  const chartLostBCTData = [
    { name: "Step 1", "Loss Percent": 15 },
    { name: "Step 2", "Loss Percent": 18 },
    { name: "Step 3", "Loss Percent": 25 },
    { name: "Step 4", "Loss Percent": 33 },
    { name: "Step 5", "Loss Percent": -40 },
    { name: "Step 6", "Loss Percent": 50 },
    { name: "Step 7", "Loss Percent": -60 },
    { name: "Step 8", "Loss Percent": -75 },
    { name: "Step 9", "Loss Percent": -80 },
    { name: "Step 10", "Loss Percent": -90 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={chartLostBCTData}
        margin={{
          top: 20,
          right: 80,
          bottom: 20,
          left: 20,
        }}
        style={{ fontSize: "1.3vw" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" label={{ value: "Step", position: "right", offset: 10 }} textAnchor="end" />
        <YAxis
          yAxisId="left"
          label={{ value: "% Difftotal", position: "insideLeft", offset: 10, angle: -90, fontSize: 30 }}
        />
        <Tooltip />
        <Legend verticalAlign="top" />
        <Bar
          yAxisId="left"
          dataKey="Loss Percent"
          //barSize={30}
          fill={color.purple}
          label={{ fill: "black", fontSize: "1.3vw", position: "top", formatter: (value: string) => value + "%" }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default LostByStepInShiftContent;
