import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Spin } from "antd";
import { InputField, SelectField } from "components/common/input";
import { useFormik } from "formik";
import { useMixerListHook } from "hooks/dashboard/useMixerList";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { postImportCUCSchedule } from "services/status-CUC/statusCUCService";
import { IImportCUCScheduleRequest } from "types/request/status-CUC/IStatusCUCRequest";
import { IImportCUCScheduleForm } from "types/response/info-CUC/IInfoCUC";
import { object, string } from "yup";

type Props = {
  currentMixerId: string;
  setReload: Dispatch<SetStateAction<boolean>>;
};

const ImportCUCScheduleModal = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mixerList } = useMixerListHook();

  const formik = useFormik({
    initialValues: {
      CUCCode: "",
      mixerId: props.currentMixerId,
      scheduleDate: new Date().toISOString().split("T")[0] as any,
      shift: "",
    },
    validationSchema: object({
      CUCCode: string().required("Code CUC is required"),
      mixerId: string().required("Mixer is required"),
      scheduleDate: string().required("Schedule Date is required"),
      shift: string().required("Shift is required"),
    }),
    onSubmit: async (values: IImportCUCScheduleForm) => {
      setIsLoading(true);
      const dataImport = {
        CUCCode: values.CUCCode,
        MixerID: values.mixerId,
        MixerName: mixerList.find((item) => item.mixer_id === values.mixerId)
          ? mixerList.find((item) => item.mixer_id === values.mixerId)?.name
          : null,
        schedule_date: values.scheduleDate.split("-").reverse().join("/"),
        shift: values.shift,
      } as IImportCUCScheduleRequest;
      await postImportCUCSchedule(dataImport)
        .then((res) => {
          if (!res.error == true) {
            setIsModalOpen(false);
            formik.resetForm();
            toast.success("Thêm mới CUC Schedule thành công");
            props.setReload((prev: boolean) => !prev);
          } else {
            toast.error("Thêm mới thất bại!");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    formik.resetForm();
  };

  return (
    <div>
      <Button
        icon={<PlusOutlined rev={""} />}
        className="flex justify-center items-center"
        type="primary"
        onClick={showModal}
        size={"middle"}
      >
        CUC Schedule
      </Button>
      <Modal
        title="Add CUC Schedule"
        open={isModalOpen}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        width={"80%"}
        maskClosable={!isLoading}
      >
        <form
          noValidate
          autoComplete="off"
          id={"addCUCScheduleForm"}
          className="relative flex flex-col gap-4 w-full h-full text-[1.8vw]"
        >
          <fieldset className="flex flex-col" disabled={isLoading}>
            <div className="w-full h-full grid grid-cols-3 gap-4">
              <div className="flex flex-col col-span-1">
                <div className="relative flex flex-col gap-2 justify-between">
                  <SelectField
                    style={{ width: "100%", fontSize: "1.8vw" }}
                    title="Mixer"
                    name="mixerId"
                    id="mixerId"
                    defaultValue={formik.values.mixerId}
                    value={formik.values.mixerId}
                    errors={formik.errors.mixerId}
                    touched={formik.touched.mixerId}
                    handleChange={formik.handleChange}
                    renderItem={() => (
                      <>
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
                <p>Batch date</p>
                <div className="relative flex flex-col gap-2 justify-between">
                  <InputField
                    type={"date"}
                    style={{ width: "100%", fontSize: "2.2vw" }}
                    placeholder="Batch date"
                    title={""}
                    name="scheduleDate"
                    id="scheduleDate"
                    value={formik.values.scheduleDate}
                    errors={formik.errors.scheduleDate}
                    handleChange={formik.handleChange}
                    touched={formik.touched.scheduleDate}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p>CUC code</p>
                <div className="relative flex flex-col gap-2 justify-between">
                  <InputField
                    type={"text"}
                    style={{ width: "100%", fontSize: "2vw" }}
                    placeholder="CUC code"
                    title={""}
                    name="CUCCode"
                    id="CUCCode"
                    value={formik.values.CUCCode}
                    errors={formik.errors.CUCCode}
                    handleChange={formik.handleChange}
                    touched={formik.touched.CUCCode}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p>Shift</p>
                <div className="relative flex flex-col gap-2 justify-between">
                  <InputField
                    type={"text"}
                    style={{ width: "100%", fontSize: "2vw" }}
                    placeholder="Shift"
                    title={""}
                    name="shift"
                    id="shift"
                    value={formik.values.shift}
                    errors={formik.errors.shift}
                    handleChange={formik.handleChange}
                    touched={formik.touched.shift}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end w-full gap-2">
              <Button
                type="primary"
                disabled={isLoading}
                onClick={() => {
                  formik.handleSubmit();
                }}
                className="h-fit text-[2vw]"
              >
                Add
              </Button>
            </div>
          </fieldset>
          {isLoading && (
            <div className="absolute flex justify-center items-center w-full h-full top-0 left-0 right-0 bottom-0">
              <Spin />
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default ImportCUCScheduleModal;
