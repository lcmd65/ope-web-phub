import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

const DataTable = (props: { columns: ColumnsType<any>; data: any[]; [key: string]: any }) => {
  const { columns, data, ...rest } = props;
  return (
    <Table
      className="w-full"
      columns={props.columns}
      dataSource={props.data}
      bordered
      pagination={false}
      {...rest}
      size="small"
    />
  );
};

export default DataTable;
