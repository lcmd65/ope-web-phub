import { Button, DatePicker, Input, Modal } from "antd";
import dayjs from "dayjs";
import { ICategoryManagement } from "types/response/category-management/category";
import { addRequiredMark } from "../required";

const CategoryDetailModal = (props: {
  isModalVisible: boolean;
  setIsModalVisible: Function;
  handleSaveEdit: Function;
  editedData: ICategoryManagement | null;
  categoryData: ICategoryManagement | null;
  setEditedData: Function;
  edit?: boolean;
}) => {
  const { isModalVisible, setIsModalVisible, handleSaveEdit, editedData, categoryData, setEditedData, edit } = props;
  return (
    <Modal
      title={edit ? "Edit Category Details" : "Create Category Details"}
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            if (JSON.stringify(editedData) !== JSON.stringify(categoryData)) {
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
            if (editedData?.name === undefined) {
              Modal.error({
                title: "Please fill in all required fields",
                content: "Name is required",
              });
              return;
            }
            //     Modal.confirm({
            //       title: "Are you sure you want to save?",
            //       okText: "Yes",
            //       okType: "primary",
            //       cancelText: "No",
            //       onOk() {
            //     },
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
              Category Id
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

export default CategoryDetailModal;
