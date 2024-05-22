import { Divider, Progress } from "antd";
import useOPEDashboardStack from "hooks/ope-dashboard/useOPEDashboardStack";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  IDataLossBCTExternal,
  IDataLossBCTInternal,
  IDataOPEByShift,
} from "types/response/ope-dashboard/IOPEDashboard";
import { getDashboardChartColor } from "utilities/function/getChartColor";
import { roundTo2Digits } from "utilities/function/roundTo2Digits";

type Props = {
  dataOPEByShift: IDataOPEByShift[];
  dataLossBCTInternal: IDataLossBCTInternal[];
  dataLossBCTExternal: IDataLossBCTExternal[];
};

const DashBoardStack = (props: Props) => {
  const { dataChartOpeExtInt, dataPercentCIP, colors, radian, isHiddenChartOpeExtInt } = useOPEDashboardStack(
    props.dataOPEByShift,
    props.dataLossBCTInternal,
    props.dataLossBCTExternal,
  );

  const CustomTooltipMixerStatus = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-1 rounded-sm border-[1px]">
          <p className="label text-black">{`${payload[0].name} : ${roundTo2Digits(payload[0].payload.value)}%`}</p>
        </div>
      );
    }

    return null;
  };
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * radian) - 5;
    const y = cy + radius * Math.sin(-midAngle * radian) - 5;

    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="h-[100vh] flex flex-col gap-6">
      {!isHiddenChartOpeExtInt ? (
        <div className="w-full h-[40vh]">
          <ResponsiveContainer width="100%" height="65%">
            <PieChart width={0} height={100}>
              <Pie
                data={dataChartOpeExtInt}
                innerRadius={30}
                outerRadius={50}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {dataChartOpeExtInt.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltipMixerStatus />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="gap-2 mt-2 grid grid-cols-2">
            {dataChartOpeExtInt.map((entry, index) => (
              <div key={`cell-${index}`} className="flex col-span-1 gap-2 items-center">
                <div className={`w-3 h-3`} style={{ backgroundColor: colors[index % colors.length] }}></div>
                <p className="text-sm text-black">{entry.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-[40vh] flex items-center justify-center">
          <p className="text-center text-[1.1vw] text-[#000000] pt-4">Error data chart Ope - External - Internal</p>
        </div>
      )}
      <div className="w-full h-[300vh]">
        <h1>%CIP</h1>
        <Progress
          strokeLinecap="butt"
          type="dashboard"
          percent={Number(roundTo2Digits(dataPercentCIP))}
          size={100}
          format={() => {
            if (!dataPercentCIP && dataPercentCIP != 0) {
              return `undefined%`;
            } else {
              return `${Number(parseFloat(String(dataPercentCIP)).toFixed(2))}%`;
            }
          }}
          strokeWidth={10}
          strokeColor={getDashboardChartColor(dataPercentCIP!)}
        />
        <Divider />
      </div>
    </div>
  );
};

export default DashBoardStack;
