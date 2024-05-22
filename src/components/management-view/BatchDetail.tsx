import { ColumnsType } from "antd/es/table";
import DataTable from "components/dashBoard/spec/dataTable";
import { StepLossList } from "types/response/management_view/IStepLossByShift";
import { decimalToPercent, roundTo2Digits } from "utilities/function/roundTo2Digits";

interface DataType {
  batchNo: string;
  CUCCode: string;
  lossTime: string;
}
const BatchDetail = (props: { selectedStepLostList: StepLossList[] }) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Batch No.",
      dataIndex: "batchNo",
      align: "center",
      // width: "33%",
    },
    {
      title: "CUC Code",
      dataIndex: "CUCCode",
      align: "center",
      // width: "33%",
    },
    {
      title: "Actual Time",
      dataIndex: "actualTime",
      align: "center",
    },
    {
      title: "Standard",
      dataIndex: "standard",
      align: "center",
    },
    {
      title: "Loss Percent",
      dataIndex: "lossPercent",
      align: "center",
      // width: "33%",
    },
  ];
  const data = props.selectedStepLostList.map((item) => {
    return {
      batchNo: item.batch_no,
      CUCCode: item.cuc_code,
      actualTime: roundTo2Digits(item.actual),
      standard: roundTo2Digits(item.standard),
      lossPercent: decimalToPercent(item.loss_percent),
    };
  });

  return (
    <div className="justify-center items-center px-4">
      {props.selectedStepLostList.length > 0 && props.selectedStepLostList[0].name && (
        <h1 className="text-center">
          {props.selectedStepLostList[0].name} - {props.selectedStepLostList[0].shift_date}.
          {props.selectedStepLostList[0].shift}
        </h1>
      )}
      <DataTable
        columns={columns}
        data={data}
        locale={{
          emptyText: " - ",
        }}
        scroll={{ y: "25vh" }}
        size={"large"}
      ></DataTable>
    </div>
  );
};

export default BatchDetail;
