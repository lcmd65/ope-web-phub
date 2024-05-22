import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { handleChartOPEExternalInternal } from "services/dashboard/dashboard";
import { IMixerStatusOpeExtInt } from "types/response/dashboard/IMixerResponse";

const OpeExternalInternalPieChart = (props: { title: string; data?: number; external?: number; internal?: number }) => {
  const xxl = useMediaQuery({ maxWidth: 1536 });
  const [dataChartOPExternalInternal, setDataChartOPExternalInternal] = useState<IMixerStatusOpeExtInt[]>([]);
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) - 10;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) - 5;

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "1vw" }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    setDataChartOPExternalInternal(
      handleChartOPEExternalInternal({ ope: props.data, external: props.external, internal: props.internal }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, props.external, props.internal]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const CustomTooltipMixerStatus = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-1 rounded-sm border-[1px]">
          <p className="label text-black">{`${payload[0].name} : ${payload[0].payload.reality}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center w-full h-[40vh]">
      <h2 className="text-[0.8vw]">{props.title}</h2>
      <div className="h-full w-[400px] 2xl:w-[300px] flex flex-col justify-center items-center">
        {typeof props.data === "number" && typeof props.external === "number" ? (
          <>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart width={100} height={100}>
                <Pie
                  data={dataChartOPExternalInternal}
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {dataChartOPExternalInternal.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltipMixerStatus />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="gap-2 mt-2 grid grid-cols-2">
              {dataChartOPExternalInternal.map((entry, index) => (
                <div key={`cell-${index}`} className="flex col-span-1 gap-2 items-center">
                  <div className={`w-3 h-3`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <p className="text-sm text-black text-[0.6vw]">{entry.name}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full h-full justify-center items-center">
            <p className="text-center text-[1.1vw] text-[#000000] pt-4">No data chart OPE-External-Internal</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpeExternalInternalPieChart;
