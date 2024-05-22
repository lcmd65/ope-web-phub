import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCategoryManagement } from "hooks/category-management/useCategoryManagement";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import LoginForm from "components/form/authForm";
import { loginGetAccessToken } from "services/auth/checkAccount";
import {
  createCategoryManagement,
  deleteCategoryManagement,
  updateCategoryManagement,
} from "services/category-management/category_management";
import { ICategoryManagement } from "types/response/category-management/category";
import { formatDateTime } from "utilities/function/formatDateTime";
import CategoryDetailModal from "./modal";

const CategoryManagement = () => {
  const { categoryList, setCategoryList, loading } = useCategoryManagement();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [categoryData, setCategoryData] = useState<ICategoryManagement | null>(null);
  const [editedData, setEditedData] = useState<ICategoryManagement | null>(null);

  const [openLoginForm, setOpenLoginForm] = useState(false);

  const [openLoginFormDelete, setOpenLoginFormDelete] = useState(false);

  const handleNameClick = (category: ICategoryManagement) => {
    setEditedData({ ...category });
    setEdit(true);
    setIsModalVisible(true);
    setCategoryData(category);
  };

  const handleCreateCategory = () => {
    setIsModalVisible(true);
    setEditedData(null);
    setCategoryData(null);
  };

  const handleClickDelete = (category: ICategoryManagement) => {
    setOpenLoginFormDelete(true);
    setEditedData({ ...category });
    setEdit(true);
    setCategoryData(category);
  };

  const handleDeleteCategory = (category: ICategoryManagement, token: string) => {
    //show confirm dialog
    // Modal.confirm({
    //   title: "Are you sure you want to delete this category?",
    //   content: "This action cannot be undone.",
    //   okText: "Yes",
    //   okType: "danger",
    //   cancelText: "No",
    //   onOk() {
    //   },
    // });
    deleteCategoryManagement(category.id, token).then((success) => {
      if (!success) {
        toast.error("Delete category failed");
        return;
      }
    });
    setCategoryList(categoryList.filter((item) => item.id !== category.id));
  };

  const handleSaveEdit = (category: ICategoryManagement) => {
    setOpenLoginForm(true);
  };
  const handleSaveEditAfterLogin = (category: ICategoryManagement, token: string) => {
    //check if category is in the list
    const categoryIndex = categoryList.findIndex((item) => item.id === category.id);
    //if category is in the list, update it
    if (categoryIndex !== -1) {
      updateCategoryManagement(category, token).then((success: boolean) => {
        if (!success) {
          toast.error("Update category failed");
          return;
        }
        setCategoryList(
          categoryList.map((item) => {
            if (item.id === category.id) {
              return category;
            } else {
              return item;
            }
          }),
        );
      });
    } else {
      //if category is not in the list, create it
      createCategoryManagement(category, token).then((success) => {
        if (!success) {
          toast.error("Create category failed");
          return;
        }
        setCategoryList([...categoryList, category]);
      });
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!isModalVisible) setEdit(false);
  }, [isModalVisible]);

  const columns: ColumnsType<ICategoryManagement> = [
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
      title: "Category Id",
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
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Action",
      key: "action",
      render: (item: ICategoryManagement) => (
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
          handleCreateCategory();
        }}
      >
        + Create Category
      </Button>
      <Table
        className=""
        columns={columns}
        dataSource={categoryList}
        bordered
        size="small"
        tableLayout="auto"
        scroll={{ x: "max-content" }}
        loading={loading}
      />
      <CategoryDetailModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleSaveEdit={handleSaveEdit}
        editedData={editedData}
        setEditedData={setEditedData}
        edit={edit}
        categoryData={categoryData}
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
            handleSaveEditAfterLogin(editedData as ICategoryManagement, token);
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
            handleDeleteCategory(editedData, token);
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

export default CategoryManagement;
