import { Button, DatePicker, Input, Modal } from "antd";
import dayjs from "dayjs";
import { IMixerCategoryManagement } from "types/response/category-management/mixer_category";
import { addRequiredMark } from "../required";

const MixerCategoryDetailModal = (props: {
  isModalVisible: boolean;
  setIsModalVisible: Function;
  handleSaveEdit: Function;
  editedData: IMixerCategoryManagement | null;
  mixercategoryData: IMixerCategoryManagement | null;
  setEditedData: Function;
  edit?: boolean;
}) => {
  const { isModalVisible, setIsModalVisible, handleSaveEdit, editedData, mixercategoryData, setEditedData, edit } =
    props;
  return (
    <Modal
      title={edit ? "Edit Mixer Category Details" : "Create Mixer Category Details"}
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            if (JSON.stringify(editedData) !== JSON.stringify(mixercategoryData)) {
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
            if (editedData?.mixer_id === undefined || editedData?.category_id === undefined) {
              Modal.error({
                title: "Please fill in all required fields",
                content: "Mixer ID, Category ID are required",
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
          {edit && (
            <div>
              <div>
                Mixer Name
                <Input
                  value={editedData?.mixer_name}
                  onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                />
              </div>
              <div>
                Category Name
                <Input
                  value={editedData?.category_name}
                  onChange={(e) => setEditedData({ ...editedData, category_name: e.target.value })}
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
            </div>
          )}

          {edit && (
            <div>
              Mixer Category Id
              <Input
                value={editedData?.id}
                onChange={(e) => setEditedData({ ...editedData, id: e.target.value })}
                disabled
              />
            </div>
          )}

          {
            <div>
              {addRequiredMark("Mixer Id")}
              <Input
                value={editedData?.mixer_id}
                onChange={(e) => setEditedData({ ...editedData, mixer_id: e.target.value })}
                disabled={edit}
              />
            </div>
          }
          {
            <div>
              {addRequiredMark("Category Id")}
              <Input
                value={editedData?.category_id}
                onChange={(e) => setEditedData({ ...editedData, category_id: e.target.value })}
                disabled={edit}
              />
            </div>
          }

          {edit && (
            <div>
              <div>
                Model Path
                <Input
                  value={editedData?.model_path}
                  onChange={(e) => setEditedData({ ...editedData, model_path: e.target.value })}
                />
              </div>
              <div>
                Product Code Path
                <Input
                  value={editedData?.product_code_path}
                  onChange={(e) => setEditedData({ ...editedData, product_code_path: e.target.value })}
                />
              </div>
              <div>
                Result Path
                <Input
                  value={editedData?.result_path}
                  onChange={(e) => setEditedData({ ...editedData, result_path: e.target.value })}
                />
              </div>
              <div>
                Status
                <Input
                  value={editedData?.status}
                  onChange={(e) => setEditedData({ ...editedData, status: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MixerCategoryDetailModal;
