import { ColumnsType } from "antd/es/table";
import color from "styles/enums/color";
import { MaterialSpecData } from "types/response/dashboard/IBatchResultResponse";
import { roundTo2Digits } from "utilities/function/roundTo2Digits";
import TagInTable from "../tagInTable";
import DataTable from "./dataTable";

interface DataType {
  key: string;
  actual?: number | string;
  suggestion?: number | string;
}
const columns: ColumnsType<DataType> = [
  {
    dataIndex: "key",
    rowScope: "row",
    align: "center",
    width: "30%",
  },
  {
    dataIndex: "actual",
    render: (text) => {
      var formattedNumber;
      if (text == "Actual") return <p className="text-[1vw]">{text}</p>;
      if (!isNaN(text)) {
        formattedNumber = roundTo2Digits(text);
      } else {
        formattedNumber = text;
      }
      return text !== null ? <TagInTable color={color.green} value={formattedNumber} /> : null;
    },
    align: "center",
  },
  {
    title: "Suggestion",
    dataIndex: "suggestion",
    align: "center",
    render: (text) => {
      var formattedNumber;
      if (text == "Suggest dosing amount") return <p className="text-[1vw]">{text}</p>;
      if (!isNaN(text)) {
        formattedNumber = roundTo2Digits(text);
      } else {
        formattedNumber = text;
      }
      return text ? <p className="text-[1vw]">{formattedNumber}</p> : <TagInTable color={color.green} value={""} />;
    },
  },
];

const MaterialSpecTable = (props: { materialSpecData?: MaterialSpecData }) => {
  const data: DataType[] = [
    {
      key: "",
      actual: "Actual",
      suggestion: "Suggest dosing amount",
    },
    {
      key: "pH Water",
      actual: props.materialSpecData?.water,
      suggestion: props.materialSpecData?.water_suggested,
    },
    {
      key: "pH NaOH",
      actual: props.materialSpecData?.naoh,
      suggestion: props.materialSpecData?.naoh_suggested,
    },
    {
      key: "pH Las",
      actual: props.materialSpecData?.las,
      suggestion: props.materialSpecData?.las_suggested,
    },
  ];
  return <DataTable columns={columns} data={data} showHeader={false} size="small" />;
};

export default MaterialSpecTable;
