import { Modal, Table, TableColumnsType } from "antd";
import { INumberSampleByCUC } from "types/response/training-model/ITrainingModelResponse";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  dataSource: INumberSampleByCUC[];
};

const DetailNumberSampleByCUCModal = (props: Props) => {
  const { open, dataSource, setOpen } = props;

  const columns: TableColumnsType<INumberSampleByCUC> = [
    { title: "Train", dataIndex: "train" },
    { title: "Test", dataIndex: "test" },
    { title: "CUC", dataIndex: "cuc" },
    { title: "RMSE", dataIndex: "rmse" },
  ];
  return (
    <Modal
      title={`Detail number sample by CUC`}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      cancelButtonProps={{ disabled: true, className: "hidden" }}
    >
      <div className="scrollable-modal-content px-2" style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </div>
    </Modal>
  );
};

export default DetailNumberSampleByCUCModal;
