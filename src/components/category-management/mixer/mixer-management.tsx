import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import LoginForm from "components/form/authForm";
import { useMixerManagement } from "hooks/category-management/useMixerManagement";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginGetAccessToken } from "services/auth/checkAccount";
import {
  createMixerManagement,
  deleteMixerManagement,
  updateMixerManagement,
} from "services/category-management/mixer_management";
import { IMixerManagement } from "types/response/category-management/mixer";
import { formatDateTime } from "utilities/function/formatDateTime";
import MixerDetailModal from "./modal";

const MixerManagement = () => {
  const { mixerList, setMixerList, loading } = useMixerManagement();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [mixerData, setMixerData] = useState<IMixerManagement | null>(null);
  const [editedData, setEditedData] = useState<IMixerManagement | null>(null);

  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openLoginFormDelete, setOpenLoginFormDelete] = useState(false);

  const handleNameClick = (mixer: IMixerManagement) => {
    setEditedData({ ...mixer });
    setMixerData(mixer);
    setEdit(true);
    setIsModalVisible(true);
  };

  const handleCreateMixer = () => {
    setIsModalVisible(true);
    setMixerData(null);
    setEditedData(null);
  };

  const handleClickDelete = (mixer: IMixerManagement) => {
    setOpenLoginFormDelete(true);
    setEditedData({ ...mixer });
    setEdit(true);
    setMixerData(mixer);
  };

  const handleDeleteMixer = (mixer: IMixerManagement, token: string) => {
    //show confirm dialog
    // Modal.confirm({
    //   title: "Are you sure you want to delete this mixer?",
    //   content: "This action cannot be undone.",
    //   okText: "Yes",
    //   okType: "danger",
    //   cancelText: "No",
    //   onOk() {
    //   },
    // });
    deleteMixerManagement(mixer.mixer_id, token).then((success) => {
      if (!success) {
        toast.error("Delete mixer failed");
        return;
      }
      setMixerList(mixerList.filter((item) => item.mixer_id !== mixer.mixer_id));
    });
  };

  const handleSaveEdit = (mixerData: IMixerManagement) => {
    setOpenLoginForm(true);
  };
  const handleSaveEditAfterLogin = (mixerData: IMixerManagement, token: string) => {
    //check if mixer is in the list
    const mixerIndex = mixerList.findIndex((mixer) => mixer.mixer_id === mixerData.mixer_id);
    //if mixer is in the list, update it
    if (mixerIndex !== -1) {
      updateMixerManagement(mixerData, token).then((success: boolean) => {
        if (!success) {
          toast.error("Update mixer failed");
          return;
        }
        setMixerList(
          mixerList.map((mixer) => {
            if (mixer.mixer_id === mixerData.mixer_id) {
              return mixerData;
            } else {
              return mixer;
            }
          }),
        );
      });
    } else {
      //if mixer is not in the list, create it
      createMixerManagement(mixerData, token).then((success) => {
        if (!success) {
          toast.error("Create mixer failed");
          return;
        }
        setMixerList([...mixerList, mixerData]);
      });
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!isModalVisible) setEdit(false);
  }, [isModalVisible]);

  const columns: ColumnsType<IMixerManagement> = [
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
      title: "Mixer Id",
      dataIndex: "mixer_id",
    },
    {
      title: "Batch Code Adx",
      dataIndex: "batch_code_adx",
    },
    {
      title: "Batch Code Id",
      dataIndex: "batch_code_id",
    },
    {
      title: "Batch Name Adx",
      dataIndex: "batch_name_adx",
    },
    {
      title: "Batch Name Id",
      dataIndex: "batch_name_id",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (element) => {
        return formatDateTime(element);
      },
    },

    {
      title: "QC Trigger",
      dataIndex: "qc_trigger",
    },
    {
      title: "QC Trigger Adx",
      dataIndex: "qc_trigger_adx",
    },
    {
      title: "Real PH Adx",
      dataIndex: "real_ph_adx",
    },
    {
      title: "Sequence",
      dataIndex: "sequence",
    },
    {
      title: "Start Trigger",
      dataIndex: "start_trigger",
    },
    {
      title: "Start Trigger Adx",
      dataIndex: "start_trigger_adx",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Tag",
      dataIndex: "tag",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (element) => {
        return formatDateTime(element);
      },
    },
    {
      title: "Action",
      key: "action",
      render: (item: IMixerManagement) => (
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
          handleCreateMixer();
        }}
      >
        + Create Mixer
      </Button>
      <Table
        className=""
        columns={columns}
        dataSource={mixerList}
        bordered
        size="small"
        tableLayout="auto"
        scroll={{ x: "max-content" }}
        loading={loading}
      />
      <MixerDetailModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleSaveEdit={handleSaveEdit}
        editedData={editedData}
        setEditedData={setEditedData}
        edit={edit}
        mixerData={mixerData}
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
            handleSaveEditAfterLogin(editedData as IMixerManagement, token);
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
            handleDeleteMixer(editedData as IMixerManagement, token);
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

export default MixerManagement;
