import { useEffect, useState } from "react";
import { CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import color from "styles/enums/color";
import { IBCTLostByShift } from "types/response/management_view/IBCTLostShift";
import { roundTo2Digits } from "utilities/function/roundTo2Digits";

const BCTTrendShift = (props: { BCTLostByShiftList: IBCTLostByShift[] }) => {
  const [chartLostBCTData, setChartLostBCTData] = useState({} as any);
  useEffect(() => {
    const bctLostByShiftList = props.BCTLostByShiftList;
    const getChartLostBCTData = bctLostByShiftList.map((item) => {
      const dateShift = item.shift_date.split("/");
      return {
        name: item.shift,
        actual: roundTo2Digits(item.total_times),
        dateShift: dateShift[0] + "/" + dateShift[1] + "-" + item.shift,
      };
    });
    setChartLostBCTData(getChartLostBCTData);
  }, [props.BCTLostByShiftList]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart width={500} height={500} data={chartLostBCTData} style={{ fontSize: "1vw" }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dateShift" textAnchor="end" label={{ value: "Date-Shift", position: "bottom", offset: -8 }} />
        <YAxis label={{ value: "min", position: "top", offset: 10 }} />
        <Tooltip contentStyle={{ color: color.black }} />
        <Legend verticalAlign="top" />
        <Line
          name="Actual"
          type="monotone"
          dataKey="actual"
          stroke={color.blue}
          strokeWidth={3}
          label={{ value: "actual", position: "top", offset: 10 }}
        ></Line>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default BCTTrendShift;
