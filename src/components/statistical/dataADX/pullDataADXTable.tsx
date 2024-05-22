import { ColumnsType } from "antd/es/table";
import DataTable from "components/dashBoard/spec/dataTable";
import IStatisticalPullDataADXResponse from "types/response/statistical/IPullDataADXResponse";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  statisticalDataPullDataADX: IStatisticalPullDataADXResponse[];
}

const PullDataADXTable = (props: Props) => {
  const columns: ColumnsType<IStatisticalPullDataADXResponse> = [
    {
      title: "Pull success",
      dataIndex: "success",
      align: "center",
    },
    {
      title: "Pull fail",
      dataIndex: "fail",
      align: "center",
    },
    {
      title: "Pull response null",
      dataIndex: "null",
      align: "center",
    },
    {
      title: "Total",
      dataIndex: "total",
      align: "center",
    },
  ];

  const data = props.statisticalDataPullDataADX;
  data.map((item, index) => {
    if (typeof item?.success == "number" && typeof item?.fail == "number" && typeof item?.null == "number") {
      item.total = item.success + item.fail + item.null;
    }
  });

  return (
    <div className="justify-center items-center px-4">
      <h1>Pull data from ADX</h1>
      <div style={{ fontSize: "1.2vw" }}>
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
    </div>
  );
};

export default PullDataADXTable;
