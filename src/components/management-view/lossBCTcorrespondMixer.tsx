import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import color from "styles/enums/color";
import { IBCTLost } from "types/response/management_view/IBTCLost";
import { roundTo2Digits } from "utilities/function/roundTo2Digits";

const LossBCTcorrespondCUCCode = (props: {
  BCTLostList: IBCTLost[];
  setSelectedCUCCode: Dispatch<SetStateAction<string>>;
  mixerId?: string;
}) => {
  var chartLostBCTData: any[] = [];
  if (!props.BCTLostList) {
    chartLostBCTData = [];
  } else {
    chartLostBCTData = props.BCTLostList.map((item) => {
      return {
        cuc_code: item.cuc_code,
        standard_time: roundTo2Digits(item.standard_time),
        actual:
          item.total_times && item.batch_nos_list?.length > 0
            ? roundTo2Digits(item.total_times / item.batch_nos_list.length)
            : 0,
      };
    });
  }

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  useEffect(() => {
    setSelectedIndex(0);
  }, [props.mixerId]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={400} data={chartLostBCTData} style={{ fontSize: "1vw" }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="cuc_code"
          tick={{ display: "none" }}
          label={{ value: "CUC Code", position: "right", offset: -2 }}
          textAnchor="end"
        />
        <YAxis yAxisId="left" label={{ value: "min", position: "top", offset: 10 }} />
        <YAxis yAxisId="right" label={{ value: "%", position: "top", offset: 10 }} orientation="right" />
        <Tooltip labelStyle={{ color: color.black }} />
        <Legend verticalAlign="top" />
        <Bar
          yAxisId="left"
          dataKey={"actual"}
          maxBarSize={80}
          name="Actual"
          fill={color.darkGreen}
          onClick={(data, index) => {
            props.setSelectedCUCCode(data.cuc_code);
            setSelectedIndex(index);
          }}
        >
          {chartLostBCTData.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === selectedIndex ? color.selectedDarkGreen : color.darkGreen}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
        <Bar
          yAxisId="left"
          dataKey={"standard_time"}
          maxBarSize={80}
          name="Standard"
          fill={color.blue}
          onClick={(data, index) => {
            props.setSelectedCUCCode(data.cuc_code);
            setSelectedIndex(index);
          }}
        >
          {chartLostBCTData.map((entry, index) => (
            <Cell cursor="pointer" fill={index === selectedIndex ? color.darkBlue : color.blue} key={`cell-${index}`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LossBCTcorrespondCUCCode;
