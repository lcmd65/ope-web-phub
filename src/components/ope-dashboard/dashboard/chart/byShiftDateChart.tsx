import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import color from "styles/enums/color";
import { IStackedBarChartByShift } from "types/response/ope-dashboard/IOPEDashboard";

type Props = {
  title: string;
  dataChart: IStackedBarChartByShift[];
};

const ByShiftDateChart = (props: Props) => {
  return (
    <div className="relative h-[40vh] w-[100%]">
      <h1>{props.title}</h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={400}
          data={props.dataChart}
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 20,
          }}
          style={{ fontSize: "1vw" }}
        >
          <Legend verticalAlign="top" />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            label={{
              value: `%`,
              style: { textAnchor: "middle", fontSize: "1.1vw" },
              position: "left",
              offset: -10,
            }}
          />
          <Tooltip wrapperStyle={{ color: "#000000" }} />
          <Bar dataKey="shift1" stackId="stack" fill={color.darkGreen} name="Shift 1" maxBarSize={100} />
          <Bar dataKey="shift2" stackId="stack" fill={color.purple} name="Shift 2" maxBarSize={100} />
          <Bar dataKey="shift3" stackId="stack" fill={color.blue} name={"Shift 3"} maxBarSize={100} />
        </BarChart>
      </ResponsiveContainer>
      {props.dataChart.length == 0 && (
        <div className="absolute top-0 left-0 flex justify-center items-center h-full w-full">
          <p className="text-center text-[#000000]">No data</p>
        </div>
      )}
    </div>
  );
};

export default ByShiftDateChart;
