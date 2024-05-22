import LoadingIndicator from "components/dashBoard/LoadingIndicator";
import Selector from "components/ope-dashboard/selector";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { IDataLossAreaChart, IDataLossReasonChart } from "types/response/loss-management/ILossManagement";

type Props = {
  dataLossAreaChart: IDataLossAreaChart[];
  dataLossReasonChart: IDataLossReasonChart[];
  level: string;
  setLevel: (value: string) => void;
  loading: boolean;
};

const DashboardLoss = (props: Props) => {
  const reasonList = [
    {
      label: "Level 1",
      value: "level1",
    },
    {
      label: "Level 2",
      value: "level2",
    },
    {
      label: "Level 3",
      value: "level3",
    },
    {
      label: "Lý do khác",
      value: "other",
    },
  ];
  return (
    <div
      className="w-full grid grid-cols-2 h-[100vh] p-4"
      style={
        props.loading
          ? {
              filter: "blur(3px)",
              pointerEvents: "none",
            }
          : {}
      }
    >
      {props.loading && <LoadingIndicator />}
      <div className="relative col-span-1 flex flex-col gap-2 h-[80vh]">
        <h1>Theo khu vực</h1>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={500}
            data={props.dataLossAreaChart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="area" />
            <YAxis />
            <Tooltip cursor={true} contentStyle={{ color: "#000000" }} />
            <Legend verticalAlign="top" wrapperStyle={{ top: -20 }} />
            <Bar dataKey="loss" fill="#8884d8" name="Loss" label={{ position: "top" }} maxBarSize={100} />
          </BarChart>
        </ResponsiveContainer>
        {props.dataLossAreaChart.length == 0 && (
          <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
            <p className="text-center text-[1vw] text-[#000000]">No data</p>
          </div>
        )}
      </div>
      <div className="col-span-1 flex flex-col gap-2 h-[80vh]">
        <div className="flex justify-between">
          <h1>Theo cấp lý do</h1>
          <div className="flex gap-2 items-center">
            <Selector
              placeholder="Select level"
              onChange={(e) => props.setLevel(e)}
              defaultValue={props.level}
              options={reasonList.map((item) => {
                return {
                  label: item.label,
                  value: item.value,
                };
              })}
            />
          </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={500}
            data={props.dataLossReasonChart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="reasonName" />
            <YAxis />
            <Tooltip cursor={true} contentStyle={{ color: "#000000" }} />
            <Legend verticalAlign="top" wrapperStyle={{ top: -20 }} />
            <Bar dataKey="loss" fill="#82ca9d" name="Loss" label={{ position: "top" }} maxBarSize={100} />
          </BarChart>
        </ResponsiveContainer>
        {props.dataLossReasonChart.length == 0 && (
          <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
            <p className="text-center text-[1vw] text-[#000000]">No data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLoss;
