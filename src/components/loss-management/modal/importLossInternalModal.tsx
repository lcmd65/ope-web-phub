import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Spin } from "antd";
import { InputField, SelectField } from "components/common/input";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useMixerListHook } from "hooks/dashboard/useMixerList";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { postImportLossInternal } from "services/loss-management/lossManagementService";
import { IImportLossInternalForm, IImportLossInternalRequest } from "types/response/loss-management/ILossManagement";
import { object, string } from "yup";

type Props = {
  currentMixerId: string;
  setReload: Dispatch<SetStateAction<boolean>>;
};

const ImportLossInternalModal = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mixerList } = useMixerListHook();

  const formik = useFormik({
    initialValues: {
      mixerId: props.currentMixerId,
      startDate: dayjs(new Date())
        .format("DD/MM/YYYY HH:mm:ss UTC+7")
        .split(" ")[0]
        .split("/")
        .reverse()
        .join("-") as any,
      startTime: dayjs(new Date()).format("DD/MM/YYYY HH:mm:ss UTC+7").split(" ")[1] as any,
      endDate: dayjs(new Date())
        .format("DD/MM/YYYY HH:mm:ss UTC+7")
        .split(" ")[0]
        .split("/")
        .reverse()
        .join("-") as any,
      endTime: dayjs(new Date()).format("DD/MM/YYYY HH:mm:ss UTC+7").split(" ")[1] as any,
    },
    validationSchema: object({
      mixerId: string().required("Mixer is required"),
      startDate: string().required("Start Date is required"),
      startTime: string().required("Start Time is required"),
      endDate: string().required("End Date is required"),
      endTime: string().required("End Time is required"),
    }),
    onSubmit: async (values: IImportLossInternalForm) => {
      setIsLoading(true);
      const dataImport = {
        mixer_id: values.mixerId,
        duration_start: values.startDate.split("-").join("-") + "T" + values.startTime,
        duration_end: values.endDate.split("-").join("-") + "T" + values.endTime,
      } as IImportLossInternalRequest;
      await postImportLossInternal(dataImport).then((res) => {
        if (!res.error) {
          setIsLoading(false);
          setIsModalOpen(false);
          props.setReload((prev) => !prev);
          toast.success("Add loss internal success");
        } else {
          setIsLoading(false);
          toast.error("Add loss internal failed");
        }
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
        className="flex justify-center items-center bg-yellow-500 text-[0.8vw] text-white p-4"
        type="primary"
        onClick={showModal}
        size={"middle"}
      >
        Import Loss Internal
      </Button>
      <Modal
        title="Import Loss Internal"
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
          id={"addLossInternal"}
          className="relative flex flex-col gap-4 w-full h-full text-[1.8vw]"
        >
          <fieldset className="flex flex-col" disabled={isLoading}>
            <div className="w-full h-full grid grid-cols-3 gap-4">
              <div className="flex flex-col col-span-1">
                <div className="relative flex flex-col gap-2 justify-between">
                  <SelectField
                    style={{ width: "100%", fontSize: "2vw" }}
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
                <p>Start date</p>
                <div className="relative flex flex-col gap-2 justify-between">
                  <InputField
                    type={"date"}
                    style={{ width: "100%", fontSize: "2.2vw" }}
                    placeholder="Start date"
                    title={""}
                    name="startDate"
                    id="startDate"
                    value={formik.values.startDate}
                    errors={formik.errors.startDate}
                    handleChange={formik.handleChange}
                    touched={formik.touched.startDate}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p>Start time</p>
                <div className="relative flex flex-col gap-2 justify-between">
                  <InputField
                    step={2}
                    type={"time"}
                    style={{ width: "100%", fontSize: "2vw" }}
                    placeholder="Start time"
                    title={""}
                    name="startTime"
                    id="startTime"
                    value={formik.values.startTime}
                    errors={formik.errors.startTime}
                    handleChange={formik.handleChange}
                    touched={formik.touched.startTime}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p>End date</p>
                <div className="relative flex flex-col gap-2 justify-between">
                  <InputField
                    type={"date"}
                    style={{ width: "100%", fontSize: "2vw" }}
                    placeholder="End date"
                    title={""}
                    name="endDate"
                    id="endDate"
                    value={formik.values.endDate}
                    errors={formik.errors.endDate}
                    handleChange={formik.handleChange}
                    touched={formik.touched.endDate}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p>End time</p>
                <div className="relative flex flex-col gap-2 justify-between">
                  <InputField
                    type={"time"}
                    style={{ width: "100%", fontSize: "2vw" }}
                    placeholder="End time"
                    title={""}
                    name="endTime"
                    id="endTime"
                    value={formik.values.endTime}
                    errors={formik.errors.endTime}
                    handleChange={formik.handleChange}
                    touched={formik.touched.endTime}
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

export default ImportLossInternalModal;
