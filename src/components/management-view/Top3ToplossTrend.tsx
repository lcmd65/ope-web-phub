import { Dispatch, SetStateAction } from "react";
import { CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import color from "styles/enums/color";
import { IStepLostByShift, StepLossList } from "types/response/management_view/IStepLossByShift";

const Top3ToplossTrend = (props: {
  stepLostByShiftList: IStepLostByShift[];
  setSelectedStepLostList: Dispatch<SetStateAction<StepLossList[]>>;
  selectedStepLostList: StepLossList[];
}) => {
  var chartDataList: any[] = [];
  if (!props.stepLostByShiftList || props.stepLostByShiftList.length === 0) {
    chartDataList = [];
  } else {
    chartDataList = props.stepLostByShiftList.map((item) => {
      return {
        name: item.name,
        data: item.shift_step_loss_list.map((step) => {
          return {
            "Date - Shift": step.shift_date + "." + step.shift,
            "Total Loss Percent": parseFloat((step.total_loss_percent * 100 ?? 0).toFixed(1)),
            data: step.step_loss_list,
          };
        }),
      };
    });
  }

  return (
    <div className="w-full h-[45vh]">
      {chartDataList.map((item, index) => (
        <div className="flex  w-full h-1/3 " key={index}>
          <div
            style={{
              width: "20%",
              paddingTop: "10px",
            }}
          >
            <h2 style={{ overflowWrap: "break-word" }}>{item.name}</h2>
          </div>
          <ResponsiveContainer width="80%" height="100%" key={index}>
            <ComposedChart
              width={600}
              height={180}
              data={item.data}
              margin={{ top: 20, left: 10 }}
              style={{ fontSize: "0.8vw" }}
            >
              <Legend />
              <Tooltip content={<div></div>} />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date - Shift" type="category" padding={{ left: 25, right: 25 }} />
              <YAxis
                label={{
                  value: "%",
                  position: "top",
                  offset: 10,
                }}
              />
              <Line
                dataKey="Total Loss Percent"
                type="monotone"
                stroke={color.blue}
                yAxisId={0}
                label={{ dy: -15, fontSize: "12px", fontWeight: 500 }}
                strokeWidth={3}
                activeDot={{
                  stroke: color.black,
                  r: 8,
                  onClick: (_, data) => {
                    const payload = (data as any).payload;
                    if (payload.data) {
                      props.setSelectedStepLostList(payload.data);
                    }
                  },
                }}
                dot={
                  props.selectedStepLostList === item.data.data
                    ? {
                        stroke: color.black,
                        r: 4,
                      }
                    : true
                }
              />
            </ComposedChart>
            {/* </ResponsiveContainer> */}
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default Top3ToplossTrend;
