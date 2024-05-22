import { Button, Modal } from "antd";
import { useState } from "react";
import color from "styles/enums/color";
import { BatchNoUncertain } from "types/response/dashboard/IBatchUncertain";

const BatchNoUncertainTextWithModal = (props: { item: BatchNoUncertain }) => {
  const { item } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      {item && (
        <a
          style={{
            color: color.black,
            fontSize: "1.1rem",
          }}
          onClick={showModal}
        >
          {`${item.batchNo}`}{" "}
        </a>
      )}
      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        footer={
          <Button onClick={handleClose} size="large">
            Close
          </Button>
        }
        centered
      >
        <TooltipContent batchNoUncertain={item} />
      </Modal>
    </div>
  );
};

const TooltipContent = (props: { batchNoUncertain?: BatchNoUncertain }) => {
  const { batchNoUncertain } = props;
  const uncertainStatus = "Uncertain";
  if (
    !batchNoUncertain ||
    (batchNoUncertain.ph_status !== uncertainStatus &&
      batchNoUncertain.ad_status !== uncertainStatus &&
      batchNoUncertain.vis_status !== uncertainStatus)
  )
    return <></>;
  return (
    <div>
      <h2
        style={{
          color: color.black,
        }}
      >
        Batch {batchNoUncertain.batchNo} cần chỉnh sửa:
      </h2>
      {batchNoUncertain.ph_status === uncertainStatus && (
        <h2
          style={{
            color: color.black,
          }}
        >
          - Chỉnh sửa về pH
        </h2>
      )}
      {batchNoUncertain.vis_status === uncertainStatus && (
        <h2
          style={{
            color: color.black,
          }}
        >
          - Chỉnh sửa về VIS
        </h2>
      )}
      {batchNoUncertain.ad_status === uncertainStatus && (
        <h2
          style={{
            color: color.black,
          }}
        >
          - Chỉnh sửa về AD
        </h2>
      )}
    </div>
  );
};

export default BatchNoUncertainTextWithModal;
