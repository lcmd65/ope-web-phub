import { Button, DatePicker, Divider, Input, Modal, Select, Tag } from "antd";
import { addRequiredMark } from "components/category-management/required";
import { InputField } from "components/common/input";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { IBatch, Inputs, IUpdateBatchForm, IUpdateBatchRequest } from "types/response/history/Ibatch";

export const MixerHistoryDetailModal = (props: {
  isModalVisible: boolean;
  setIsModalVisible: Function;
  handleSaveEdit: Function;
  editedData: IBatch | null;
  mixerHistoryData: IBatch | null;
  setEditedData: Function;
  setDataUpdate: Dispatch<SetStateAction<IUpdateBatchRequest>>;
  setOpenLoginFormNew: Dispatch<SetStateAction<boolean>>;
  edit?: boolean;
}) => {
  const {
    isModalVisible,
    setIsModalVisible,
    handleSaveEdit,
    editedData,
    mixerHistoryData,
    setEditedData,
    edit,
    setDataUpdate,
    setOpenLoginFormNew,
  } = props;

  const formikUpdateBatch = useFormik({
    initialValues: {
      axit: mixerHistoryData?.Axit,
      muoi: mixerHistoryData?.Muoi,
      naOH: mixerHistoryData?.NaOH,
      phSauChinh: mixerHistoryData?.Ph_SauChinh,
      visSauChinh: mixerHistoryData?.Vis_SauChinh,
      adSauChinh: mixerHistoryData?.Ad_SauChinh,
    },
    onSubmit: async (values: IUpdateBatchForm) => {
      const data = {
        Axit: values.axit ? Number(values.axit) : null,
        Muoi: values.muoi ? Number(values.muoi) : null,
        NaOH: values.naOH ? Number(values.naOH) : null,
        Ph_SauChinh: values.phSauChinh ? Number(values.phSauChinh) : null,
        Vis_SauChinh: values.visSauChinh ? Number(values.visSauChinh) : null,
        Ad_SauChinh: values.adSauChinh ? Number(values.adSauChinh) : null,
      } as IUpdateBatchRequest;
      if (
        data.Axit == null &&
        data.Muoi == null &&
        data.NaOH == null &&
        data.Ph_SauChinh == null &&
        data.Vis_SauChinh == null &&
        data.Ad_SauChinh == null
      ) {
        toast.error("Vui lòng điền ít nhất 1 đại lượng");
        return;
      } else {
        setDataUpdate(data);
        setOpenLoginFormNew(true);
      }
    },
  });

  return (
    <Modal
      style={{
        maxWidth: "80vw",
      }}
      centered
      title={edit ? "Edit MixerHistory Details" : "Create MixerHistory Details"}
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            if (JSON.stringify(editedData) !== JSON.stringify(mixerHistoryData)) {
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
        // <Button
        //   key="save"
        //   type="primary"
        //   onClick={() => {
        //     if (
        //       editedData?.batchNo === undefined ||
        //       editedData?.status === undefined ||
        //       editedData?.start_time === undefined ||
        //       editedData?.end_time === undefined
        //     ) {
        //       Modal.error({
        //         title: "Please fill in all required fields",
        //         content: "Name, Mixer Id, Input ADX are required",
        //       });
        //       return;
        //     }
        //     // Modal.confirm({
        //     //   title: "Are you sure you want to save?",
        //     //   okText: "Yes",
        //     //   okType: "primary",
        //     //   cancelText: "No",
        //     //   onOk() {
        //     //   },
        //     // });
        //     handleSaveEdit(editedData);
        //   }}
        // >
        //   Save
        // </Button>,
      ]}
    >
      <div className="px-2 flex flex-col gap-4" style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <div className="flex flex-col gap-4 rounded-2xl border-solid border p-4 bg-[#f5f5f5]">
          <Divider orientation="left" plain>
            <h2>Info</h2>
          </Divider>
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="w-full">
              {addRequiredMark("Batch No")}
              <Input
                value={editedData?.batchNo}
                onChange={(e) => setEditedData({ ...editedData, batchNo: e.target.value })}
              />
            </div>
            <div className="w-full">
              {"Product Code"}
              <Input value={editedData?.productCode} disabled />
            </div>
            <div className="w-full">
              Mixer Category
              <Input
                value={`${editedData?.mixer_category.mixer_name} - ${editedData?.mixer_category.category_name}`}
                disabled
              />
            </div>
            <div className="w-full">
              {addRequiredMark("Status")}
              <Select
                value={editedData?.status}
                onChange={(e) => setEditedData({ ...editedData, status: e })}
                options={[
                  { label: "PULLED", value: "PULLED" },
                  { label: "ACTIVE", value: "ACTIVE" },
                ]}
                style={{
                  width: "100%",
                }}
              />
            </div>
            <div className="w-full">
              {addRequiredMark("Start Time")}
              <DatePicker
                showTime
                value={editedData?.start_time ? dayjs(editedData.start_time) : null}
                onChange={(date, dateString) => setEditedData({ ...editedData, start_time: date?.toISOString() })}
              />
            </div>
            <div className="w-full">
              {addRequiredMark("End Time")}
              <DatePicker
                showTime
                value={editedData?.end_time ? dayjs(editedData.end_time) : null}
                onChange={(date, dateString) => setEditedData({ ...editedData, end_time: date?.toISOString() })}
              />
            </div>
          </div>
          <Divider orientation="left" plain>
            <h2>Input</h2>
          </Divider>
          <div className="grid grid-cols-2 gap-2 w-full">
            {convertInputsToKeyValueArray(editedData?.ph_predict_data.inputs || {}).map((input, index) => (
              <div className="w-full" key={index}>
                {input.key}
                <Input
                  type="number"
                  value={input.value}
                  onChange={(e) => {
                    setEditedData({
                      ...editedData,
                      ph_predict_data: {
                        ...editedData?.ph_predict_data,
                        inputs: {
                          ...editedData?.ph_predict_data.inputs,
                          [input.key]: e.target.value,
                        },
                      },
                    });
                  }}
                />
              </div>
            ))}
          </div>
          <Divider orientation="left" plain>
            {/* <h2>Output</h2> */}
          </Divider>
          <div className="gap-2 w-full">
            {editedData?.ph_predict_data.predict && <Tag>{editedData?.ph_predict_data.predict}</Tag>}
            <h2 className="m-2">pH</h2>
            <div className="flex gap-2">
              <div className="w-full">
                {"Predict"}
                <Input type="number" value={editedData?.ph_predict_data?.predict_ph} disabled />
              </div>
              <div className="w-full">
                {"Actual pH"}
                <Input
                  type="number"
                  value={editedData?.ph_predict_data?.real_ph}
                  onChange={(e) => {
                    setEditedData({
                      ...editedData,
                      ph_predict_data: {
                        ...editedData?.ph_predict_data,
                        real_ph: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <h2 className="m-2">Vis</h2>
            <div className="flex gap-2">
              <div className="w-full">
                {"Predict"}
                <Input type="number" value={editedData?.vis_predict_data?.predict_vis} disabled />
              </div>
              <div className="w-full">
                {"Actual Vis"}
                <Input
                  type="number"
                  value={editedData?.vis_predict_data?.real_vis}
                  onChange={(e) => {
                    setEditedData({
                      ...editedData,
                      vis_predict_data: {
                        ...editedData?.vis_predict_data,
                        real_vis: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <h2 className="m-2">AD</h2>
            <div className="flex gap-2">
              <div className="w-full">
                {"Predict"}
                <Input type="number" value={editedData?.ad_predict_data?.predict_ad} disabled />
              </div>
              <div className="w-full">
                {"Actual AD"}
                <Input
                  type="number"
                  value={editedData?.ad_predict_data?.real_ad}
                  onChange={(e) => {
                    setEditedData({
                      ...editedData,
                      ad_predict_data: {
                        ...editedData?.ad_predict_data,
                        real_ad: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              key="save"
              type="primary"
              onClick={() => {
                if (
                  editedData?.batchNo === undefined ||
                  editedData?.status === undefined ||
                  editedData?.start_time === undefined ||
                  editedData?.end_time === undefined
                ) {
                  Modal.error({
                    title: "Please fill in all required fields",
                    content: "Name, Mixer Id, Input ADX are required",
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
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full rounded-2xl border-solid border p-4 bg-[#f5f5f5]">
          <div className="flex flex-col gap-1 w-full">
            <p>Axit</p>
            <InputField
              step={2}
              type={"number"}
              style={{ width: "100%", fontSize: "0.8vw" }}
              placeholder="Axit"
              title={""}
              name="axit"
              id="axit"
              value={formikUpdateBatch.values.axit}
              errors={formikUpdateBatch.errors.axit}
              handleChange={formikUpdateBatch.handleChange}
              touched={formikUpdateBatch.touched.axit}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p>Muối</p>
            <InputField
              step={2}
              type={"number"}
              style={{ width: "100%", fontSize: "0.8vw" }}
              placeholder="Muối"
              title={""}
              name="muoi"
              id="muoi"
              value={formikUpdateBatch.values.muoi}
              errors={formikUpdateBatch.errors.muoi}
              handleChange={formikUpdateBatch.handleChange}
              touched={formikUpdateBatch.touched.muoi}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p>NaOH</p>
            <InputField
              type={"number"}
              style={{ width: "100%", fontSize: "0.8vw" }}
              placeholder="NaOH"
              title={""}
              name="naOH"
              id="naOH"
              value={formikUpdateBatch.values.naOH}
              errors={formikUpdateBatch.errors.naOH}
              handleChange={formikUpdateBatch.handleChange}
              touched={formikUpdateBatch.touched.naOH}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p>PH sau chỉnh</p>
            <InputField
              type={"number"}
              style={{ width: "100%", fontSize: "0.8vw" }}
              placeholder="PH sau chỉnh"
              title={""}
              name="phSauChinh"
              id="phSauChinh"
              value={formikUpdateBatch.values.phSauChinh}
              errors={formikUpdateBatch.errors.phSauChinh}
              handleChange={formikUpdateBatch.handleChange}
              touched={formikUpdateBatch.touched.phSauChinh}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p>Vis sau chỉnh</p>
            <InputField
              type={"number"}
              style={{ width: "100%", fontSize: "0.8vw" }}
              placeholder="Vis sau chỉnh"
              title={""}
              name="visSauChinh"
              id="visSauChinh"
              value={formikUpdateBatch.values.visSauChinh}
              errors={formikUpdateBatch.errors.visSauChinh}
              handleChange={formikUpdateBatch.handleChange}
              touched={formikUpdateBatch.touched.visSauChinh}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p>AD sau chỉnh</p>
            <InputField
              type={"number"}
              style={{ width: "100%", fontSize: "0.8vw" }}
              placeholder="AD sau chỉnh"
              title={""}
              name="adSauChinh"
              id="adSauChinh"
              value={formikUpdateBatch.values.adSauChinh}
              errors={formikUpdateBatch.errors.adSauChinh}
              handleChange={formikUpdateBatch.handleChange}
              touched={formikUpdateBatch.touched.adSauChinh}
            />
          </div>
          <div className="flex col-span-2 justify-end">
            <Button
              type="primary"
              onClick={() => {
                formikUpdateBatch.submitForm();
              }}
              disabled={!formikUpdateBatch.isValid}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

function convertInputsToKeyValueArray(inputs: Inputs): { key: string; value: number | undefined }[] {
  return Object.keys(inputs).map((key) => ({ key, value: inputs[key] }));
}
