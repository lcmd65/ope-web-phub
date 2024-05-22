import { Progress } from "antd";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { handleChartOPEExternalInternal } from "services/dashboard/dashboard";
import color from "styles/enums/color";
import { IMixerStatusOpeExtInt } from "types/response/dashboard/IMixerResponse";
import { IOPE } from "types/response/dashboard/IOPE";
import { IOR } from "types/response/dashboard/IOR";
import { getDashboardChartColor } from "utilities/function/getChartColor";
import { roundTo2Digits } from "utilities/function/roundTo2Digits";

const CategoryPorpotionGrid = (props: {
  title: string;
  type?: string;
  data?: number;
  chartIOPEList?: IOPE[];
  chartIORList?: IOR[];
  external?: number;
  internal?: number;
}) => {
  const { type } = props;
  const percent = (props.data ?? 0) * 100;
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
        style={{ fontSize: "1.2vw", fontWeight: "bold" }}
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
  var chartDataList;
  if (props.chartIOPEList) {
    chartDataList = props.chartIOPEList?.map((item) => {
      const [day, month] = item.date.split("/");

      return {
        ope: parseFloat((item.ope * 100).toFixed(1)),
        dateShift: `${day}${month}.` + item.shift,
        Standard: 85,
      };
    });
  } else if (props.chartIORList) {
    chartDataList = props.chartIORList?.map((item) => {
      const [day, month] = item.date.split("/");

      return { or: parseFloat((item.or * 100).toFixed(1)), dateShift: `${day}${month}.` + item.shift, Standard: 85 };
    });
  }
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
    <div className="flex flex-col items-center w-full h-[20vh]">
      <h2>{props.title}</h2>
      <div className="flex justify-between w-full h-[20vh]">
        <div className="h-full w-[200px] 2xl:w-[100px] flex justify-center items-center">
          {props.type == "ope" ? (
            <div className="w-full h-full flex flex-col gap-2">
              {typeof props.data === "number" && typeof props.external === "number" ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={100} height={100}>
                      <Pie
                        data={dataChartOPExternalInternal}
                        innerRadius={60}
                        outerRadius={80}
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
                  <p className="text-center text-[1.1vw] text-[#000000] pt-4">No data</p>
                </div>
              )}
            </div>
          ) : (
            <Progress
              strokeLinecap="butt"
              type="dashboard"
              percent={percent}
              size={xxl ? 100 : 200}
              format={(percent) => `${roundTo2Digits(percent ?? 0)}%`}
              strokeWidth={10}
              strokeColor={getDashboardChartColor(percent!)}
            />
          )}
        </div>
        <div
          style={{
            height: "100%",
            width: xxl ? "calc(100% - 100px)" : "calc(100% - 200px)",
          }}
        >
          <ResponsiveContainer height="100%" width="100%">
            <ComposedChart
              width={500}
              height={400}
              data={chartDataList}
              margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
              style={{ fontSize: "1vw" }}
            >
              <Tooltip contentStyle={{ color: color.black }} />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dateShift" type="category" padding={{ left: 10, right: 10 }} />
              <Line type="monotone" dataKey="ope" stroke={color.blue} yAxisId={0} strokeWidth={2}>
                <LabelList
                  dataKey="ope"
                  position="top"
                  angle={360}
                  offset={20}
                  fill="black"
                  dy={10}
                  style={{ fontSize: "16px", fontWeight: 500 }}
                />
              </Line>
              <Line type="monotone" dataKey="or" stroke={color.blue} yAxisId={0} strokeWidth={2}>
                <LabelList
                  dataKey="or"
                  position="top"
                  angle={360}
                  offset={20}
                  fill="black"
                  dy={10}
                  style={{ fontSize: "16px", fontWeight: 500 }}
                />
              </Line>
              <Line type="monotone" dataKey="Standard" stroke={color.green} yAxisId={0} dot=<></> />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="h-[12px]"></div>
    </div>
  );
};

export default CategoryPorpotionGrid;
