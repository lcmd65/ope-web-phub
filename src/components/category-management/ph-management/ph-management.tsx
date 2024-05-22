import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import LoginForm from "components/form/authForm";
import { usePhManagement } from "hooks/category-management/usePHManagement";
import { loginGetAccessToken } from "services/auth/checkAccount";
import { createPhManagement, deletePhManagement, updatePhManagement } from "services/category-management/ph_management";
import { IPHManagement } from "types/response/category-management/ph";
import { formatDateTime } from "utilities/function/formatDateTime";
import PhDetailModal from "./modal";

const PhManagement = () => {
  const { phList, setPhList, loading } = usePhManagement();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [phData, setPhData] = useState<IPHManagement | null>(null);
  const [editedData, setEditedData] = useState<IPHManagement | null>(null);

  const [openLoginForm, setOpenLoginForm] = useState(false);

  const [openLoginFormDelete, setOpenLoginFormDelete] = useState(false);

  const handleNameClick = (ph: IPHManagement) => {
    setEditedData({ ...ph });
    setEdit(true);
    setIsModalVisible(true);
    setPhData(ph);
  };

  const handleCreatePh = () => {
    setIsModalVisible(true);
    setEditedData(null);
    setPhData(null);
  };

  const handleClickDelete = (ph: IPHManagement) => {
    setOpenLoginFormDelete(true);
    setEditedData({ ...ph });
    setEdit(true);
    setPhData(ph);
  };

  const handleDeletePh = (ph: IPHManagement, token: string) => {
    //show confirm dialog
    // Modal.confirm({
    //   title: "Are you sure you want to delete this input PH?",
    //   content: "This action cannot be undone.",
    //   okText: "Yes",
    //   okType: "danger",
    //   cancelText: "No",
    //   onOk() {
    //   },
    // });
    deletePhManagement(ph.id, token).then((success) => {
      if (!success) {
        toast.error("Delete input pH failed");
        return;
      }
    });
    setPhList(phList.filter((item) => item.id !== ph.id));
  };

  const handleSaveEdit = () => {
    setOpenLoginForm(true);
  };

  const handleSaveEditAfterLogin = (ph: IPHManagement, token: string) => {
    //check if ph is in the list
    const phIndex = phList.findIndex((item) => item.id === ph.id);
    //if ph is in the list, update it
    if (phIndex !== -1) {
      updatePhManagement(ph, token).then((success: boolean) => {
        if (!success) {
          toast.error("Update input pH failed");
          return;
        }
        setPhList(
          phList.map((item) => {
            if (item.id === ph.id) {
              return ph;
            } else {
              return item;
            }
          }),
        );
      });
    } else {
      //if ph is not in the list, create it
      createPhManagement(ph, token).then((success) => {
        if (!success) {
          toast.error("Create input pH failed");
          return;
        }
        setPhList([...phList, ph]);
      });
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!isModalVisible) setEdit(false);
  }, [isModalVisible]);

  const columns: ColumnsType<IPHManagement> = [
    {
      title: "Name",
      dataIndex: "name",
      fixed: "left",
      render: (text, record) => (
        <a style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => handleNameClick(record)}>
          {text}
        </a>
      ),
    },
    {
      title: "Input pH Id",
      dataIndex: "id",
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
      title: "Deteled At",
      dataIndex: "deletedAt",
      render: (element) => {
        return formatDateTime(element);
      },
    },
    {
      title: "Input ADX",
      dataIndex: "input_adx",
    },
    {
      title: "Input ID",
      dataIndex: "input_id",
    },
    {
      title: "Mixer Id",
      dataIndex: "mixer_id",
    },
    {
      title: "Is Offline",
      dataIndex: "is_offline",
      render: (element) => {
        return element ? "true" : "false";
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Action",
      key: "action",
      render: (item: IPHManagement) => (
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
          handleCreatePh();
        }}
      >
        + Create Ph
      </Button>
      <Table
        className=""
        columns={columns}
        dataSource={phList}
        bordered
        size="small"
        tableLayout="auto"
        scroll={{ x: "max-content" }}
        loading={loading}
      />
      <PhDetailModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleSaveEdit={handleSaveEdit}
        editedData={editedData}
        setEditedData={setEditedData}
        edit={edit}
        phData={phData}
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
            handleSaveEditAfterLogin(editedData as IPHManagement, token);
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
            handleDeletePh(editedData as IPHManagement, token);
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

export default PhManagement;
