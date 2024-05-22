import { ColumnsType } from "antd/lib/table";
import color from "styles/enums/color";
import { Predict, PredictData, SpecData } from "types/response/dashboard/IBatchResultResponse";
import { roundTo2Digits } from "utilities/function/roundTo2Digits";
import TagInTable from "../tagInTable";
import DataTable from "./dataTable";

interface DataType {
  key: string;
  predict?: PredictData;
  spec: number[]; // Change to an array of numbers for the range
}

const columns: ColumnsType<DataType> = [
  {
    title: "",
    dataIndex: "key",
    rowScope: "row",
    align: "center",
    width: "20%",
  },
  // {
  //   title: "Predicted Value",
  //   dataIndex: "predict",
  //   render: (text, record) => {
  //     if (text === null) return null;

  //     text = text?.value;

  //     const { predict } = record;

  //     if (predict !== null) {
  //       const colorTag = predict?.status !== "Uncertain" ? color.green : color.error;
  //       var formattedNumber;
  //       if (text === null) {
  //         return <TagInTable color={colorTag} value={""} />;
  //       }
  //       if (!isNaN(text)) {
  //         formattedNumber = roundTo2Digits(text);
  //       } else {
  //         formattedNumber = text;
  //       }
  //       return <TagInTable color={colorTag} value={formattedNumber} />;
  //     }
  //     return <TagInTable color={color.green} value={(roundTo2Digits(text) ?? "").toString()} />;
  //   },
  //   align: "center",
  //   width: "40%",
  // },
  {
    title: "Predicted Value",
    dataIndex: "predict",
    render: (predict, record) => {
      const spec = record.spec;
      const colorTag =
        Number(predict?.value) >= spec[0] && spec[1] >= Number(predict?.value) ? color.green : color.error;
      if (predict?.value && spec?.length === 2) {
        return <TagInTable color={colorTag} value={String(roundTo2Digits(Number(predict.value)))} />;
      } else {
        return <TagInTable color={color.green} value={""} />;
      }
    },
    align: "center",
    width: "40%",
  },
  {
    title: "Spec",
    dataIndex: "spec",
    render: (text) => {
      if (text !== null) {
        const [min, max] = text;
        if (text.length !== 2) return <TagInTable color={color.green} value={``} />;
        return (
          <h2>
            {roundTo2Digits(min)} - {roundTo2Digits(max)}
          </h2>
        );
      }
      return null;
    },
    align: "center",
    width: "40%",
  },
];

const PredictTable = (props: { predict?: Predict; specData?: SpecData }) => {
  const data: DataType[] = [
    {
      key: "pH",
      predict: props.predict?.ph,
      spec: props.specData?.ph ?? [],
    },
    {
      key: "VIS",
      predict: props.predict?.vis,
      spec: props.specData?.vis ?? [],
    },
    {
      key: "AD",
      predict: props.predict?.ad,
      spec: props.specData?.ad ?? [],
    },
  ];

  return <DataTable columns={columns} data={data} />;
};

export default PredictTable;
