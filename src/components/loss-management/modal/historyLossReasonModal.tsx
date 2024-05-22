import { Modal, Table } from "antd";
import useModalUtils from "hooks/common/useModalUtils";
import { formatDateTimeDetail } from "utilities/function/formatDateTime";

type Props = {
  dataHistory: any[];
};

const HistoryLossReasonModal = (props: Props) => {
  const { open, confirmLoading, setConfirmLoading, showModal, handleCancel } = useModalUtils();

  const columns = [
    {
      title: "Thời gian",

      key: "createdAt",
      render: (value: any) => {
        return <p>{formatDateTimeDetail(value.createdAt)}</p>;
      },
    },
    {
      title: "Khu vực",
      key: "Area",
      render: (value: any) => {
        return <p>{value.Area[0].name}</p>;
      },
    },
    {
      title: "Lý do",
      key: "reason",
      render: (value: any) => {
        const reasonLevel1 = value.ReasonLevel1.length > 0 ? value.ReasonLevel1[0].name : "";
        const reasonLevel2 = value.ReasonLevel2.length > 0 ? " - " + value.ReasonLevel2[0].name : "";
        const reasonLevel3 = value.ReasonLevel3.length > 0 ? " - " + value.ReasonLevel3[0].name : "";
        if (!reasonLevel1 && !reasonLevel2 && !reasonLevel3) {
          return <p>Lý do khác</p>;
        } else {
          return <p>{value.ReasonLevel1[0].name + reasonLevel2 + reasonLevel3}</p>;
        }
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
  ];
  return (
    <>
      <p onClick={showModal} className="text-[1.2vw] font-medium text-[#1677FF] hover:cursor-pointer">
        Lịch sử
      </p>
      <Modal
        title={`Lịch sử chỉnh sửa`}
        open={open}
        centered
        width="70vw"
        okText="Xác nhận"
        cancelText="Hủy bỏ"
        cancelButtonProps={{
          style: { display: "none" },
        }}
        onOk={handleCancel}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="w-full">
          <Table dataSource={props.dataHistory} columns={columns} />;
        </div>
      </Modal>
    </>
  );
};

export default HistoryLossReasonModal;
