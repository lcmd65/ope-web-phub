import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import color from "styles/enums/color";
import { IBCTLostByCUC } from "types/response/management_view/IBCTLostByCUC";
import { roundTo2Digits } from "utilities/function/roundTo2Digits";

const LossBCTcorrespondCUCCode = (props: {
  BCTLostByCUC?: IBCTLostByCUC;
  setSelectedBatchNo: Dispatch<SetStateAction<string>>;
  selectedCUCCode?: string;
}) => {
  var chartLostBCTData: any[] = [];
  if (!props.BCTLostByCUC) {
    chartLostBCTData = [];
  } else {
    chartLostBCTData = props.BCTLostByCUC?.ope_data_detail.map((item) => {
      return {
        name: item.BatchID,
        actual: roundTo2Digits(item.ActualBCT),
        standard: props.BCTLostByCUC?.standard_time ? roundTo2Digits(props.BCTLostByCUC?.standard_time) : 0,
      };
    });
  }

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  useEffect(() => {
    setSelectedIndex(0);
  }, [props.selectedCUCCode]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={400} data={chartLostBCTData} style={{ fontSize: "1vw" }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ display: "none" }}
          label={{ value: "Batch No", position: "right", offset: -2 }}
          textAnchor="end"
        />
        <YAxis yAxisId="left" label={{ value: "min", position: "top", offset: 10 }} />
        <YAxis yAxisId="right" label={{ value: "%", position: "top", offset: 10 }} orientation="right" />
        <Tooltip labelStyle={{ color: color.black }} />
        <Legend verticalAlign="top" />
        <Bar
          yAxisId="left"
          dataKey="actual"
          maxBarSize={80}
          name="Actual"
          fill={color.darkGreen}
          onClick={(data, index) => {
            props.setSelectedBatchNo(data.name);
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
          dataKey={"standard"}
          maxBarSize={80}
          name="Standard"
          fill={color.blue}
          onClick={(data, index) => {
            props.setSelectedBatchNo(data.name);
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
