import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { AnyObject } from "antd/es/_util/type";
import SubBatchDetailTable from "./subTable";
import "./table.module.css";

const ExpandableMixerHistoryTable = (props: {
  columns: ColumnsType<any>;
  data: readonly AnyObject[];
  loading: boolean;
}) => {
  return (
    <Table
      size="small"
      bordered
      columns={props.columns}
      expandable={{
        expandedRowRender: (record) => (
          <div
            style={{
              margin: 0,
            }}
          >
            <SubBatchDetailTable
              batchVisDetail={record.batchVisDetail}
              batchAdDetail={record.batchAdDetail}
              batchPHDetail={record.batchPHDetail}
            />
          </div>
        ),
        rowExpandable: (record) => record.batchDetail !== null,
        expandIcon: ({ expanded, onExpand, record }) =>
          expanded ? (
            <UpOutlined rev={undefined} style={{ fontSize: "20px" }} onClick={(e) => onExpand(record, e)} />
          ) : (
            <DownOutlined rev={undefined} style={{ fontSize: "20px" }} onClick={(e) => onExpand(record, e)} />
          ),
      }}
      dataSource={props.data}
      rowClassName={(record, index) => (index % 2 === 0 ? "bg-white" : "bg-[#f5f5f5]")}
      expandIconColumnIndex={props.columns.length}
      loading={props.loading}
    />
  );
};

export default ExpandableMixerHistoryTable;
