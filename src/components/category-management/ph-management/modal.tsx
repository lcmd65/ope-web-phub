import { Button, Checkbox, DatePicker, Input, Modal } from "antd";
import dayjs from "dayjs";
import { IPHManagement } from "types/response/category-management/ph";
import { addRequiredMark } from "../required";

const PhDetailModal = (props: {
  isModalVisible: boolean;
  setIsModalVisible: Function;
  handleSaveEdit: Function;
  editedData: IPHManagement | null;
  phData: IPHManagement | null;
  setEditedData: Function;
  edit?: boolean;
}) => {
  const { isModalVisible, setIsModalVisible, handleSaveEdit, editedData, phData, setEditedData, edit } = props;
  return (
    <Modal
      title={edit ? "Edit Ph Details" : "Create Ph Details"}
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            if (JSON.stringify(editedData) !== JSON.stringify(phData)) {
              Modal.confirm({
                title: "Are you sure you want to leave?",
                content: "You have unsaved changes.",
                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                onOk() {
                  setIsModalVisible(false);
                },
              });
            } else setIsModalVisible(false);
          }}
        >
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={() => {
            if (
              editedData?.name === undefined ||
              editedData?.mixer_id === undefined ||
              editedData?.input_adx === undefined
            ) {
              Modal.error({
                title: "Please fill in all required fields",
                content: "Name, Mixer Id, Input ADX are required",
              });
              return;
            }
            // Modal.confirm({
            //   title: "Are you sure you want to save?",
            //   okText: "Yes",
            //   okType: "primary",
            //   cancelText: "No",
            //   onOk() {
            //   },
            // });
            handleSaveEdit(editedData);
          }}
        >
          Save
        </Button>,
      ]}
    >
      <div className="scrollable-modal-content px-2" style={{ maxHeight: "60vh", overflowY: "auto" }}>
        <div className="flex flex-col gap-1">
          <div>
            {addRequiredMark("Name")}
            <Input value={editedData?.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} />
          </div>
          {edit && (
            <div>
              Input pH Id
              <Input
                value={editedData?.id}
                onChange={(e) => setEditedData({ ...editedData, id: e.target.value })}
                disabled
              />
            </div>
          )}

          <div className="flex flex-col">
            Created At
            <DatePicker
              showTime
              value={editedData?.createdAt ? dayjs(editedData.createdAt) : null}
              onChange={(date, dateString) => setEditedData({ ...editedData, createdAt: date?.toISOString() })}
            />
          </div>
          <div className="flex flex-col">
            Updated At
            <DatePicker
              showTime
              value={editedData?.updatedAt ? dayjs(editedData.updatedAt) : null}
              onChange={(date, dateString) => setEditedData({ ...editedData, updatedAt: date?.toISOString() })}
            />
          </div>
          <div className="flex flex-col">
            Deleted At
            <DatePicker
              showTime
              value={editedData?.updatedAt ? dayjs(editedData.deletedAt) : null}
              onChange={(date, dateString) => setEditedData({ ...editedData, deletedAt: date?.toISOString() })}
            />
          </div>
          <div>
            {addRequiredMark("Input ADX")}
            <Input
              value={editedData?.input_adx}
              onChange={(e) => setEditedData({ ...editedData, input_adx: e.target.value })}
            />
          </div>
          <div>
            Input ID
            <Input
              value={editedData?.input_id}
              onChange={(e) => setEditedData({ ...editedData, input_id: e.target.value })}
            />
          </div>
          <div>
            {addRequiredMark("Mixer Id")}
            <Input
              value={editedData?.mixer_id}
              onChange={(e) => setEditedData({ ...editedData, mixer_id: e.target.value })}
            />
          </div>

          <Checkbox
            defaultChecked={editedData?.is_offline}
            onChange={(e) => {
              setEditedData({ ...editedData, is_offline: e.target.checked });
            }}
          >
            Is Offline
          </Checkbox>

          <div>
            Status
            <Input
              value={editedData?.status}
              onChange={(e) => setEditedData({ ...editedData, status: e.target.value })}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PhDetailModal;
