import { Spin } from "antd";
import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { handleDataListKeyStepAverageChart } from "services/ope-dashboard/opeDashboardComparisonService";
import color from "styles/enums/color";
import { IDataOPEStepMixerAverage } from "types/response/ope-dashboard/IOPEDashboard";

type Props = {
  dataOPEStepMixerAverage: IDataOPEStepMixerAverage;
  isLoading: boolean;
};

const AverageOfLossByShift = (props: Props) => {
  const dataAverageChart = handleDataListKeyStepAverageChart(props.dataOPEStepMixerAverage);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      {props.isLoading ? (
        <Spin size="large">
          <div className="p-20 rounded-lg bg-[#f0f2f5]" />
        </Spin>
      ) : (
        <>
          {dataAverageChart.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={1000}
                data={dataAverageChart}
                layout="vertical"
                style={{ fontSize: "1.2vw" }}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <Legend layout="horizontal" verticalAlign="top" align="center" />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" unit={" %"} tick={{ fontWeight: 500, fontSize: 18 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  minTickGap={10}
                  tickSize={10}
                  width={120}
                  tick={{ fontWeight: 700, fontSize: "1.3vw", wordSpacing: 0 }}
                />
                <Tooltip contentStyle={{ color: "#000000" }} />
                <Bar dataKey="value" fill={color.yellow} name="Loss">
                  <LabelList dataKey="value" position="right" angle={360} offset={20} fill="black" dx={-10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-center text-[#000000]">Không có dữ liệu</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AverageOfLossByShift;
