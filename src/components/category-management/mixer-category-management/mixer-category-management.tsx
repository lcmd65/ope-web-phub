import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import LoginForm from "components/form/authForm";
import { useMixerCategoryManagement } from "hooks/category-management/useMixerCategoryManagement";
import { loginGetAccessToken } from "services/auth/checkAccount";
import {
  createMixerCategoryManagement,
  deleteMixerCategoryManagement,
  updateMixerCategoryManagement,
} from "services/category-management/mixer_category_management";
import { IMixerCategoryManagement } from "types/response/category-management/mixer_category";
import { formatDateTime } from "utilities/function/formatDateTime";
import MixerCategoryDetailModal from "./modal";

const MixerCategoryManagement = () => {
  const { mixerCategoryList, setMixerCategoryList, loading } = useMixerCategoryManagement();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [mixercategoryData, setMixerCategoryData] = useState<IMixerCategoryManagement | null>(null);
  const [editedData, setEditedData] = useState<IMixerCategoryManagement | null>(null);

  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openLoginFormDelete, setOpenLoginFormDelete] = useState(false);

  const handleNameClick = (mixercategory: IMixerCategoryManagement) => {
    setEditedData({ ...mixercategory });
    setEdit(true);
    setIsModalVisible(true);
    setMixerCategoryData(mixercategory);
  };

  const handleCreateMixerCategory = () => {
    setIsModalVisible(true);
    setEditedData(null);
    setMixerCategoryData(null);
  };

  const handleClickDelete = (mixerCategory: IMixerCategoryManagement) => {
    setOpenLoginFormDelete(true);
    setEditedData({ ...mixerCategory });
    setEdit(true);
    setMixerCategoryData(mixerCategory);
  };

  const handleDeleteMixerCategory = (mixercategory: IMixerCategoryManagement, token: string) => {
    //show confirm dialog
    //     Modal.confirm({
    //       title: "Are you sure you want to delete this mixercategory?",
    //       content: "This action cannot be undone.",
    //       okText: "Yes",
    //       okType: "danger",
    //       cancelText: "No",
    //       onOk() {
    //     },
    // });
    deleteMixerCategoryManagement(mixercategory.id, token).then((success) => {
      if (!success) {
        toast.error("Delete mixercategory failed");
        return;
      }
      setMixerCategoryList(mixerCategoryList.filter((item) => item.id !== mixercategory.id));
    });
  };

  const handleSaveEdit = (mixercategory: IMixerCategoryManagement) => {
    setOpenLoginForm(true);
  };
  const handleSaveEditAfterLogin = (mixercategory: IMixerCategoryManagement, token: string) => {
    //check if mixercategory is in the list
    const mixercategoryIndex = mixerCategoryList.findIndex((item) => item.id === mixercategory.id);
    //if mixercategory is in the list, update it
    if (mixercategoryIndex !== -1) {
      updateMixerCategoryManagement(mixercategory, token).then((success: boolean) => {
        if (!success) {
          toast.error("Update mixercategory failed");
          return;
        }
        setMixerCategoryList(
          mixerCategoryList.map((item) => {
            if (item.id === mixercategory.id) {
              return mixercategory;
            } else {
              return item;
            }
          }),
        );
      });
    } else {
      //if mixercategory is not in the list, create it
      createMixerCategoryManagement(mixercategory, token).then((success) => {
        if (!success) {
          toast.error("Create mixercategory failed");
          return;
        }
        setMixerCategoryList([...mixerCategoryList, mixercategory]);
      });
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!isModalVisible) setEdit(false);
  }, [isModalVisible]);

  const columns: ColumnsType<IMixerCategoryManagement> = [
    {
      title: "Mixer Name",
      dataIndex: "mixer_name",
      fixed: "left",
      render: (text, record) => (
        <a style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => handleNameClick(record)}>
          {text}
        </a>
      ),
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      fixed: "left",
      render: (text, record) => (
        <a style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => handleNameClick(record)}>
          {text}
        </a>
      ),
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (element) => {
        return formatDateTime(element);
      },
    },

    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (element) => {
        return formatDateTime(element);
      },
    },
    {
      title: "Mixer Category Id",
      dataIndex: "id",
    },
    {
      title: "Mixer Id",
      dataIndex: "mixer_id",
    },
    {
      title: "Category Id",
      dataIndex: "category_id",
    },

    {
      title: "Model Path",
      dataIndex: "model_path",
    },
    {
      title: "Product Code Path",
      dataIndex: "product_code_path",
    },
    {
      title: "Result Path",
      dataIndex: "result_path",
    },
    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Action",
      key: "action",
      render: (item: IMixerCategoryManagement) => (
        <a
          onClick={() => {
            handleClickDelete(item);
          }}
        >
          Delete
        </a>
      ),
    },
  ];

  return (
    <div>
      <Button
        className="my-2"
        type="primary"
        onClick={() => {
          handleCreateMixerCategory();
        }}
      >
        + Create MixerCategory
      </Button>
      <Table
        className=""
        columns={columns}
        dataSource={mixerCategoryList}
        bordered
        size="small"
        tableLayout="auto"
        scroll={{ x: "max-content" }}
        loading={loading}
      />
      <MixerCategoryDetailModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleSaveEdit={handleSaveEdit}
        editedData={editedData}
        setEditedData={setEditedData}
        edit={edit}
        mixercategoryData={mixercategoryData}
      />
      <LoginForm
        onSubmitted={(username: string, password: string) => {
          setOpenLoginForm(false);
          loginGetAccessToken(username, password).then((token) => {
            if (token === null) {
              toast.error("Login failed");
              return;
            }
            if (editedData === null) return;
            handleSaveEditAfterLogin(editedData as IMixerCategoryManagement, token);
          });
          return true;
        }}
        open={openLoginForm}
        setModalOpen={setOpenLoginForm}
      />
      <LoginForm
        onSubmitted={(username: string, password: string) => {
          setOpenLoginForm(false);
          loginGetAccessToken(username, password).then((token) => {
            if (token === null) {
              toast.error("Login failed");
              return;
            }
            if (editedData === null) return;
            handleDeleteMixerCategory(editedData as IMixerCategoryManagement, token);
            return;
          });
          return true;
        }}
        open={openLoginFormDelete}
        setModalOpen={setOpenLoginFormDelete}
      />
    </div>
  );
};

export default MixerCategoryManagement;
