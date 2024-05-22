import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import ITrainingModelResponse from "types/response/training-model/ITrainingModelResponse";
import TrainingModelHistoryExpendedTable from "./trainingModelHistoryExpendedTable";

type Props = {
  columns: ColumnsType<ITrainingModelResponse>;
  data: ITrainingModelResponse[];
  loading: boolean;
  openDetailSampleModal: boolean;
  setOpenDetailSampleModal: (value: boolean) => void;
};

const HistoryTrainingModelTable = (props: Props) => {
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
            <TrainingModelHistoryExpendedTable dataSource={record.signal_train_infos} />
          </div>
        ),
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

export default HistoryTrainingModelTable;
