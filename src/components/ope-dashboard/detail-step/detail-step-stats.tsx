import { Divider } from "antd";
import {
  CartesianGrid,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import color from "styles/enums/color";

type Props = {
  dataOPEbyDateStepChart: any[];
  dataOPEbyDate: any[];
  isLoading: boolean;
  modeTime: string;
};

const DetailStepStats = (props: Props) => {
  return (
    <div className="h-[90vh] w-[90%] pl-[32px]">
      <div className="h-[40vh] w-[100%] relative">
        <h1>OPE by {props.modeTime == "day" ? "Day" : "Week"}</h1>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={props.dataOPEbyDate}
            margin={{
              top: 20,
              right: 80,
              bottom: 20,
              left: 20,
            }}
            style={{ fontSize: "1.2vw", position: "" }}
          >
            <Legend verticalAlign="top" />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              label={{ value: props.modeTime == "day" ? "Day" : "Week", position: "right", offset: 10 }}
              textAnchor="end"
            />
            <YAxis yAxisId="left" />
            <Tooltip contentStyle={{ color: "#000000" }} />
            <Line yAxisId="left" dataKey="data" name="%OPE" strokeWidth={5} fill={color.blue}>
              <LabelList dataKey="data" position="top" offset={10} />
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
        {props.isLoading && (
          <div className="h-full w-full absolute top-0 flex items-center justify-center">
            <div className="loader">Loading</div>
          </div>
        )}
      </div>
      <Divider />
      <div className="h-[40vh] w-[100%] relative">
        <h1>Trend %Step Loss by {props.modeTime == "day" ? "Day" : "Week"}</h1>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={props.dataOPEbyDateStepChart}
            margin={{
              top: 20,
              right: 80,
              bottom: 20,
              left: 20,
            }}
            style={{ fontSize: "1.2vw", position: "" }}
          >
            <Legend verticalAlign="top" />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              label={{ value: props.modeTime == "day" ? "Day" : "Week", position: "right", offset: 10 }}
              textAnchor="end"
            />
            <YAxis yAxisId="left" />
            <Tooltip contentStyle={{ color: "#000000" }} />
            <Line yAxisId="left" dataKey="data" name="%Step Loss" strokeWidth={5} fill={color.blue}>
              <LabelList dataKey="data" position="top" offset={10} />
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
        {props.isLoading && (
          <div className="h-full w-full absolute top-0 flex items-center justify-center">
            <div className="loader">Loading</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailStepStats;
