import { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { IToploss } from "types/response/dashboard/IToploss";
import { roundTo2Digits } from "utilities/function/roundTo2Digits";
import DataTable from "../spec/dataTable";

interface DataType {
  key: string;
  spec: string | null;
}
const columns: ColumnsType<DataType> = [
  {
    dataIndex: "key",
    rowScope: "row",
    align: "center",
  },

  {
    dataIndex: "spec",
    align: "center",
  },
];

const TopLoss = (props: { lastShiftTopLoss?: IToploss; thisShiftTopLoss?: IToploss }) => {
  const { lastShiftTopLoss, thisShiftTopLoss } = props;
  const lastShiftLossData: DataType[] =
    lastShiftTopLoss?.toploss.map((item, index) => ({
      key: item.key ?? "",
      spec: `${roundTo2Digits(item.value)} min`,
    })) ?? [];

  const currentShiftLossData: DataType[] =
    thisShiftTopLoss?.toploss.map((item, index) => ({
      key: item.key ?? "",
      spec: `${roundTo2Digits(item.value)} min`,
    })) ?? [];

  return (
    <div className="flex gap-[6px] w-full">
      <div className="w-full flex flex-col items-center gap-[8px] h-full">
        <h1>Top 3 Loss Previous Shift</h1>
        {lastShiftTopLoss && lastShiftTopLoss.toploss.length > 0 ? (
          <DataTable columns={columns} data={lastShiftLossData} showHeader={false} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Image src="/images/png/checkmark.png" alt="" width={100} height={100} />
          </div>
        )}
      </div>
      <div className="w-full flex flex-col items-center gap-[8px]">
        <h1>Top 3 Loss Current Shift</h1>
        {thisShiftTopLoss && thisShiftTopLoss.toploss.length > 0 ? (
          <DataTable columns={columns} data={currentShiftLossData} showHeader={false} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Image src="/images/png/checkmark.png" alt="" width={100} height={100} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopLoss;
