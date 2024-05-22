import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Spin } from "antd";
import { InputField, SelectField } from "components/common/input";
import { useFormik } from "formik";
import { useMixerListHook } from "hooks/dashboard/useMixerList";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { postImportMixerWeight } from "services/status-CUC/statusCUCService";
import { IImportMixerWeightRequest } from "types/request/status-CUC/IStatusCUCRequest";
import { IImportMixerWeightForm } from "types/response/info-CUC/IInfoCUC";
import { object, string } from "yup";

type Props = {
  currentMixerId: string;
  setReload: Dispatch<SetStateAction<boolean>>;
};

const ImportMixerWeightModal = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mixerList } = useMixerListHook();

  const formik = useFormik({
    initialValues: {
      value: "",
      mixerId: props.currentMixerId,
      shiftDate: new Date().toISOString().split("T")[0] as any,
      shift: "",
    },
    validationSchema: object({
      value: string().required("Code CUC is required"),
      mixerId: string().required("Mixer is required"),
      shiftDate: string().required("Schedule Date is required"),
      shift: string().required("Shift is required"),
    }),
    onSubmit: async (values: IImportMixerWeightForm) => {
      setIsLoading(true);
      const dataImport = {
        mixer: mixerList.find((item) => item.mixer_id === values.mixerId)
          ? mixerList.find((item) => item.mixer_id === values.mixerId)?.name
          : null,
        value: values.value,
        shift_date: values.shiftDate.split("-").reverse().join("/"),
        shift: values.shift,
      } as IImportMixerWeightRequest;
      await postImportMixerWeight(dataImport)
        .then((res) => {
          if (!res.error == true) {
            setIsModalOpen(false);
            formik.resetForm();
            toast.success("Thêm mới Mixer Weight thành công");
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
        className="flex justify-center items-center bg-yellow-500"
        type="primary"
        onClick={showModal}
        size={"middle"}
      >
        Mixer Weight
      </Button>
      <Modal
        title="Add Mixer Weight"
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
                    name="shiftDate"
                    id="shiftDate"
                    value={formik.values.shiftDate}
                    errors={formik.errors.shiftDate}
                    handleChange={formik.handleChange}
                    touched={formik.touched.shiftDate}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p>Value</p>
                <div className="relative flex flex-col gap-2 justify-between">
                  <InputField
                    type={"text"}
                    style={{ width: "100%", fontSize: "2vw" }}
                    placeholder="Value"
                    title={""}
                    name="value"
                    id="value"
                    value={formik.values.value}
                    errors={formik.errors.value}
                    handleChange={formik.handleChange}
                    touched={formik.touched.value}
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

export default ImportMixerWeightModal;
