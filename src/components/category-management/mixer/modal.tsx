import { Button, DatePicker, Input, Modal } from "antd";
import dayjs from "dayjs";
import { IMixerManagement } from "types/response/category-management/mixer";
import { addRequiredMark } from "../required";

const MixerDetailModal = (props: {
  isModalVisible: boolean;
  setIsModalVisible: Function;
  handleSaveEdit: Function;
  editedData: IMixerManagement | null;
  mixerData: IMixerManagement | null;
  setEditedData: Function;
  edit?: boolean;
}) => {
  const { isModalVisible, setIsModalVisible, handleSaveEdit, editedData, mixerData, setEditedData, edit } = props;
  return (
    <Modal
      title={edit ? "Edit Mixer Details" : "Create Mixer Details"}
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            if (JSON.stringify(editedData) !== JSON.stringify(mixerData)) {
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
              editedData?.batch_code_adx === undefined ||
              editedData?.batch_name_adx === undefined ||
              editedData?.qc_trigger_adx === undefined ||
              editedData?.start_trigger_adx === undefined
            ) {
              Modal.error({
                title: "Please fill in all required fields",
                content: "Name, Batch Code Adx, Batch Name Adx, QC Trigger Adx, Start Trigger Adx are required",
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
              Mixer Id
              <Input
                value={editedData?.mixer_id}
                onChange={(e) => setEditedData({ ...editedData, mixer_id: e.target.value })}
                disabled
              />
            </div>
          )}
          <div>
            {addRequiredMark("Batch Code Adx")}
            <Input
              value={editedData?.batch_code_adx}
              onChange={(e) => setEditedData({ ...editedData, batch_code_adx: e.target.value })}
            />
          </div>
          <div>
            Batch Code Id
            <Input
              value={editedData?.batch_code_id}
              onChange={(e) => setEditedData({ ...editedData, batch_code_id: e.target.value })}
            />
          </div>
          <div>
            {addRequiredMark("Batch Name Adx")}
            <Input
              value={editedData?.batch_name_adx}
              onChange={(e) => setEditedData({ ...editedData, batch_name_adx: e.target.value })}
            />
          </div>
          <div>
            Batch Name Id
            <Input
              value={editedData?.batch_name_id}
              onChange={(e) => setEditedData({ ...editedData, batch_name_id: e.target.value })}
            />
          </div>
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
          <div>
            QC Trigger
            <Input
              value={editedData?.qc_trigger}
              onChange={(e) => setEditedData({ ...editedData, qc_trigger: e.target.value })}
            />
          </div>
          <div>
            {addRequiredMark("QC Trigger Adx")}
            <Input
              value={editedData?.qc_trigger_adx}
              onChange={(e) => setEditedData({ ...editedData, qc_trigger_adx: e.target.value })}
            />
          </div>
          <div>
            Real PH Adx
            <Input
              value={editedData?.real_ph_adx}
              onChange={(e) => setEditedData({ ...editedData, real_ph_adx: e.target.value })}
            />
          </div>
          <div>
            Sequence
            <Input
              value={editedData?.sequence}
              onChange={(e) => setEditedData({ ...editedData, sequence: e.target.value })}
            />
          </div>
          <div>
            Start Trigger
            <Input
              value={editedData?.start_trigger}
              onChange={(e) => setEditedData({ ...editedData, start_trigger: e.target.value })}
            />
          </div>
          <div>
            {addRequiredMark("Start Trigger Adx")}
            <Input
              value={editedData?.start_trigger_adx}
              onChange={(e) => setEditedData({ ...editedData, start_trigger_adx: e.target.value })}
            />
          </div>
          <div>
            Status
            <Input
              value={editedData?.status}
              onChange={(e) => setEditedData({ ...editedData, status: e.target.value })}
            />
          </div>
          <div>
            Tag
            <Input value={editedData?.tag} onChange={(e) => setEditedData({ ...editedData, tag: e.target.value })} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MixerDetailModal;
