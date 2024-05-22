import { DatePicker, Spin } from "antd";
import dayjs from "dayjs";
import { usePullDataADX } from "hooks/statistical/usePullDataADX";
import { FunctionComponent } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import PullDataADXTable from "./pullDataADXTable";

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const PullDataADX = () => {
  const { isLoading, dataPullDataADX, dataPieChart, endTime, startTime, dateFormat, setStartTime, setEndTime } =
    usePullDataADX();
  const { RangePicker } = DatePicker;

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel: FunctionComponent<CustomLabelProps> = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-[1.6vw]"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  const COLORS = ["#22BB33", "#FF4D4F", "#FFCC00"];

  return (
    <div style={{ width: "100%", height: "100%", overflowY: "hidden" }} className="grid grid-cols-3 gap-4 no-scrollbar">
      <div className="col-span-2">
        <h1>Pull data from ADX</h1>
        <div className="px-[30%]">
          <RangePicker
            style={{
              marginBottom: 0,
              display: "flex",
            }}
            defaultValue={[dayjs(startTime, dateFormat), dayjs(endTime, dateFormat)]}
            format={dateFormat}
            size="large"
            onChange={(date, dateString) => {
              if (!date) return;
              else {
                setStartTime(dayjs(date[0]));
                setEndTime(dayjs(date[1]));
              }
            }}
          />
        </div>
        <div style={{ height: "75vh", overflowY: "hidden", position: "relative" }}>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Spin size="large">
                <div className="p-20 rounded-lg bg-neutral-50" />
              </Spin>
            </div>
          ) : (
            <>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={dataPieChart}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    fill="#8884d8"
                    startAngle={90}
                    endAngle={450}
                  >
                    {dataPieChart?.map((entry, index) => (
                      <Cell cursor={"pointer"} key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {dataPieChart[0]?.value == "-" && (
                <div className="flex absolute top-0 left-0 w-full h-full justify-center items-center">
                  <p className="text-center text-[1.1vw] text-[#000000] pt-4">Không có dữ liệu</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4 col-span-1">
        {dataPieChart?.map((item, index) => (
          <div key={index} className="flex gap-2 ml-4">
            <div className="flex justify-center items-center">
              <div className={`w-4 h-4`} style={{ backgroundColor: COLORS[index] }}></div>
            </div>
            <div className="flex gap-1 text-[1.2vw]">
              <p>{item.name}</p>
            </div>
          </div>
        ))}
        <PullDataADXTable className="w-[50%]" statisticalDataPullDataADX={[dataPullDataADX]} />
      </div>
    </div>
  );
};

export default PullDataADX;
