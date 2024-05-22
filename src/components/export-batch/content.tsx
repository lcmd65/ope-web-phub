import { DownloadOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, DatePicker, Modal } from "antd";
import { InputField, SelectField } from "components/common/input";
import LoadingIndicator from "components/dashBoard/LoadingIndicator";
import dayjs from "dayjs";
import { useFormik } from "formik";
import useExportBatchPage from "hooks/export-batch/useExportBatch";
import { useState } from "react";
import { toast } from "react-toastify";
import apiPutClient from "services/axios/apiClient/put";
import { exportMasterData } from "services/excel/excel_services";
import color from "styles/enums/color";
import Endpoints from "utilities/enums/Endpoint";
import { object, ref, string } from "yup";

type Props = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

const OtherContent = (props: Props) => {
  const { RangePicker } = DatePicker;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOPEModalOpen, setIsOPEModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isShowOldPassword, setIsShowOldPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const isEnglishText = (text: string) => {
    // Regular expression to match only English letters and spaces
    const englishRegex = /^[A-Za-z0-9!@#$%^&*()_+,\-./:;<=>?@[\\\]^_`{|}~]*$/;
    return englishRegex.test(text);
  };

  const {
    dateFormat,
    startDate,
    endDate,
    mixer,
    category,
    mixerList,
    categoryList,
    isLoading,
    onSelectorChangeMixer,
    onSelectorChangeCategory,
    setStartDate,
    setEndDate,
    setIsLoading,
    setMixer,
  } = useExportBatchPage();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: object({
      oldPassword: string()
        .required("Vui lòng nhập mật khẩu cũ")
        .test("no-space", "Mật khẩu không được chứa khoảng trắng", (value) => !/\s/.test(value)),
      newPassword: string()
        .required("Vui lòng nhập mật khẩu mới")
        .test("english-text", "Mật khẩu không được chứa kí tự có dấu", (value: string) => isEnglishText(value))
        .test("no-space", "Mật khẩu không được chứa khoảng trắng", (value) => !/\s/.test(value)),
      confirmPassword: string()
        .oneOf([ref("newPassword"), ""], "Mật khẩu nhập lại không đúng")
        .required("Vui lòng nhập lại mật khẩu mới"),
    }),
    onSubmit: async (values: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
      const data = {
        old_password: values.oldPassword,
        new_password: values.confirmPassword,
      };
      props.setIsLoading(true);
      await apiPutClient(Endpoints.AUTH.CHANGE_PASSWORD, data)
        .then((res) => {
          if (!res.error == true) {
            toast.success("Đổi mật khẩu thành công");
            formik.resetForm();
            setIsModalOpen(false);
          } else {
            toast.error("Đổi mật khẩu thất bại");
          }
        })
        .finally(() => {
          props.setIsLoading(false);
        });
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    formik.resetForm();
    setIsShowOldPassword(false);
    setIsShowNewPassword(false);
    setIsShowConfirmPassword(false);
  };

  const formikOPE = useFormik({
    initialValues: {
      mixer_id: "",
      start_date: "",
      end_date: "",
    },
    validationSchema: object({
      mixer_id: string(),
      start_date: string(),
      end_date: string(),
    }),
    onSubmit: async (values: { mixer_id: string; start_date: string; end_date: string }) => {
      const data = {
        mixer_id: values.mixer_id,
        start_date: startDate.toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
      };
      let mixerOPE = "all";
      mixerList.forEach((item) => {
        if (item.mixer_id === values.mixer_id) {
          mixerOPE = item.name;
          return;
        }
      });
      props.setIsLoading(true);
      await exportMasterData(
        Endpoints.EXCEL.EXPORT_DATA_OPE_CONVERTED,
        `Data OPE Converted mixer ${mixerOPE} ${data.start_date} ${data.end_date}`,
        data,
      ).finally(() => {
        props.setIsLoading(false);
      });
    },
  });

  const showOPEModal = () => {
    setIsOPEModalOpen(true);
  };

  const handleOPECancel = () => {
    setIsOPEModalOpen(false);
    formikOPE.resetForm();
  };

  const formikBatch = useFormik({
    initialValues: {
      mixer_id: "",
      category_id: "",
      start_date: "",
      end_date: "",
    },
    validationSchema: object({
      mixer_id: string(),
      category_id: string(),
      start_date: string(),
      end_date: string(),
    }),
    onSubmit: async (values: { mixer_id: string; category_id: string; start_date: string; end_date: string }) => {
      const data = {
        mixer_id: values.mixer_id,
        category_id: values.category_id,
        start_date: startDate.toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
      };
      let mixerBatch = "all";
      mixerList.forEach((item) => {
        if (item.mixer_id === values.mixer_id) {
          mixerBatch = item.name;
          return;
        }
      });
      let categoryBatch = "all";
      categoryList.forEach((item) => {
        if (item.id === values.category_id) {
          categoryBatch = item.name;
          return;
        }
      });
      props.setIsLoading(true);
      await exportMasterData(
        Endpoints.EXCEL.EXPORT_BATCH_PREDICT,
        `Batch Predict mixer ${mixerBatch} category ${categoryBatch} ${data.start_date} ${data.end_date}`,
        data,
      ).finally(() => {
        props.setIsLoading(false);
      });
    },
  });

  const showBatchModal = () => {
    setIsBatchModalOpen(true);
  };

  const handleBatchCancel = () => {
    setIsBatchModalOpen(false);
    formikBatch.resetForm();
  };

  return (
    <div className="relative flex w-full h-full gap-4" style={{ filter: props.isLoading ? "blur(3px)" : "none" }}>
      {props.isLoading && <LoadingIndicator />}
      <div>
        <Button
          size="large"
          icon={<DownloadOutlined rev={undefined} />}
          style={{ backgroundColor: color.green }}
          onClick={showBatchModal}
        >
          Export Batch Predict
        </Button>
        <Modal
          title="Export Batch Predict"
          open={isBatchModalOpen}
          onCancel={handleBatchCancel}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          maskClosable={!props.isLoading}
        >
          <form
            noValidate
            autoComplete="off"
            id={"exportBatchForm"}
            onSubmit={formikBatch.handleSubmit}
            className="flex flex-col gap-4 w-full h-full"
          >
            <fieldset className="w-full h-full flex flex-col gap-4">
              <div className="flex flex-col">
                <p>Mixer</p>
                <div className="relative flex flex-col gap-4 justify-between">
                  <SelectField
                    title={""}
                    placeholder="Select mixer"
                    name="mixer_id"
                    id="mixer_id"
                    value={formikBatch.values.mixer_id}
                    errors={formikBatch.errors.mixer_id}
                    handleChange={formikBatch.handleChange}
                    touched={formikBatch.touched.mixer_id}
                    renderItem={() => (
                      <>
                        <option key="all-mixer" value="">
                          <div className="flex">All</div>
                        </option>
                        {mixerList.map((item, index) => (
                          <option key={index} value={item.mixer_id}>
                            <div className="flex">{item.name}</div>
                          </option>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p>Category</p>
                <div className="relative flex flex-col gap-4 justify-between">
                  <SelectField
                    title={""}
                    placeholder="Select category"
                    name="category_id"
                    id="category_id"
                    value={formikBatch.values.category_id}
                    errors={formikBatch.errors.category_id}
                    handleChange={formikBatch.handleChange}
                    touched={formikBatch.touched.category_id}
                    renderItem={() => (
                      <>
                        <option key="all-category" value="">
                          <div className="flex">All</div>
                        </option>
                        {categoryList.map((item, index) => (
                          <option key={index} value={item.id}>
                            <div className="flex">{item.name}</div>
                          </option>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p>From - To</p>
                <div className="relative flex flex-col gap-4 justify-between">
                  <RangePicker
                    style={{
                      marginBottom: 0,
                      display: "flex",
                    }}
                    disabled={isLoading}
                    defaultValue={[startDate, endDate]}
                    format={dateFormat}
                    size="large"
                    onChange={(date, dateString) => {
                      if (!date) return;
                      else {
                        setStartDate(dayjs(date[0]));
                        setEndDate(dayjs(date[1]));
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-end w-full gap-2">
                <Button htmlType="submit" form="exportBatchForm" type="primary">
                  Export
                </Button>
              </div>
            </fieldset>
          </form>
        </Modal>
      </div>
      <div>
        <Button
          size="large"
          icon={<DownloadOutlined rev={undefined} />}
          style={{ backgroundColor: color.peachOrange }}
          onClick={showOPEModal}
        >
          Export Data OPE Converted
        </Button>
        <Modal
          title="Export Data OPE"
          open={isOPEModalOpen}
          onCancel={handleOPECancel}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          maskClosable={!props.isLoading}
        >
          <form
            noValidate
            autoComplete="off"
            id={"exportDataOPEForm"}
            onSubmit={formikOPE.handleSubmit}
            className="flex flex-col gap-4 w-full h-full"
          >
            <fieldset className="w-full h-full flex flex-col gap-4">
              <div className="flex flex-col">
                <p>Mixer</p>
                <div className="relative flex flex-col gap-4 justify-between">
                  <SelectField
                    title={""}
                    placeholder="Select mixer"
                    name="mixer_id"
                    id="mixer_id"
                    value={formikOPE.values.mixer_id}
                    errors={formikOPE.errors.mixer_id}
                    handleChange={formikOPE.handleChange}
                    touched={formikOPE.touched.mixer_id}
                    renderItem={() => (
                      <>
                        <option key="all" value="">
                          <div className="flex">All</div>
                        </option>
                        {mixerList.map((item, index) => (
                          <option key={index} value={item.mixer_id}>
                            <div className="flex">{item.name}</div>
                          </option>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p>From - To</p>
                <div className="relative flex flex-col gap-4 justify-between">
                  <RangePicker
                    style={{
                      marginBottom: 0,
                      display: "flex",
                    }}
                    disabled={isLoading}
                    defaultValue={[startDate, endDate]}
                    format={dateFormat}
                    size="large"
                    onChange={(date, dateString) => {
                      if (!date) return;
                      else {
                        setStartDate(dayjs(date[0]));
                        setEndDate(dayjs(date[1]));
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-end w-full gap-2">
                <Button htmlType="submit" form="exportDataOPEForm" type="primary">
                  Export
                </Button>
              </div>
            </fieldset>
          </form>
        </Modal>
      </div>
      <div>
        <Button type="primary" onClick={showModal} size="large">
          Change password
        </Button>
        <Modal
          title="Change password"
          open={isModalOpen}
          onCancel={handleCancel}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          maskClosable={!props.isLoading}
        >
          <form
            noValidate
            autoComplete="off"
            id={"changePasswordForm"}
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 w-full h-full"
          >
            <fieldset className="w-full h-full flex flex-col gap-4">
              <div className="flex flex-col">
                <p>Nhập mật khẩu cũ</p>
                <div className="relative flex flex-col gap-4 justify-between">
                  <InputField
                    type={isShowOldPassword ? "text" : "password"}
                    style={{ width: "100%" }}
                    placeholder="Mật khẩu cũ"
                    title={""}
                    name="oldPassword"
                    id="oldPassword"
                    value={formik.values.oldPassword}
                    errors={formik.errors.oldPassword}
                    handleChange={formik.handleChange}
                    touched={formik.touched.oldPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setIsShowOldPassword(!isShowOldPassword)}
                    className="absolute right-2 top-6 btn btn-ghost btn-sm"
                  >
                    {isShowOldPassword ? (
                      <EyeTwoTone rev={undefined} size={100} />
                    ) : (
                      <EyeInvisibleOutlined rev={undefined} size={100} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <p>Nhập mật khẩu mới</p>
                <div className="relative flex flex-col gap-4 justify-between">
                  <InputField
                    type={isShowNewPassword ? "text" : "password"}
                    style={{ width: "100%" }}
                    placeholder="Mật khẩu mới"
                    title={""}
                    name="newPassword"
                    id="newPassword"
                    value={formik.values.newPassword}
                    errors={formik.errors.newPassword}
                    handleChange={formik.handleChange}
                    touched={formik.touched.newPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setIsShowNewPassword(!isShowNewPassword)}
                    className="absolute right-2 top-6 btn btn-ghost btn-sm"
                  >
                    {isShowNewPassword ? (
                      <EyeTwoTone rev={undefined} size={100} />
                    ) : (
                      <EyeInvisibleOutlined rev={undefined} size={100} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <p>Nhập lại mật khẩu mới</p>
                <div className="relative flex flex-col gap-4 justify-between">
                  <InputField
                    type={isShowConfirmPassword ? "text" : "password"}
                    style={{ width: "100%" }}
                    placeholder="Nhập lại mật khẩu mới"
                    title={""}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formik.values.confirmPassword}
                    errors={formik.errors.confirmPassword}
                    handleChange={formik.handleChange}
                    touched={formik.touched.confirmPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                    className="absolute right-2 top-6 btn btn-ghost btn-sm"
                  >
                    {isShowConfirmPassword ? (
                      <EyeTwoTone rev={undefined} size={100} />
                    ) : (
                      <EyeInvisibleOutlined rev={undefined} size={100} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-end w-full gap-2">
                <Button
                  type="primary"
                  onClick={() => {
                    Modal.confirm({
                      title: "Bạn có chắc muốn thay đổi mật khẩu?",
                      okText: "Đồng ý",
                      okType: "primary",
                      cancelText: "Hủy bỏ",
                      onOk() {
                        if (formik.errors.confirmPassword || formik.errors.newPassword || formik.errors.oldPassword) {
                          toast.error("Vui lòng nhập đúng thông tin");
                        }
                        formik.handleSubmit();
                      },
                    });
                  }}
                >
                  Xác nhận
                </Button>
              </div>
            </fieldset>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default OtherContent;
