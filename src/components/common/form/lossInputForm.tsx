import { Button, Input, Popconfirm } from "antd";
import LevelLossReasonFrame from "components/loss-management/frame/levelLossReasonFrame";
import HistoryLossReasonModal from "components/loss-management/modal/historyLossReasonModal";
import { useFormik } from "formik";
import useLossInputForm from "hooks/loss-management/useLossInputForm";
import { toast } from "react-toastify";
import { postCreateLossLog } from "services/loss-management/lossManagementService";
import { IArea } from "types/response/loss-management/ILossManagement";
import { object, string } from "yup";
import { SelectField, TextAreaField } from "../input";

const { Search } = Input;

type Props = {
  currentIdLoss: string;
  lossNotedDetail: any;
  disabled: boolean;
  areaList: IArea[];
  reasonList: any[];
  setDisabled: (prev: any) => void;
  setReload: (prev: any) => void;
};

const LossInputForm = (props: Props) => {
  const currentLossDetail = props.lossNotedDetail?.find((item: any) => item.status === "ACTIVE");

  const {
    dataLevel2,
    dataLevel3,
    nameSearch,
    valueLevel1,
    valueLevel2,
    valueLevel3,
    setNameSearch,
    setValueLevel1,
    setValueLevel2,
    setValueLevel3,
    setReturnData,
  } = useLossInputForm(props.reasonList, currentLossDetail);

  const formik = useFormik({
    initialValues: {
      area: currentLossDetail ? currentLossDetail.Area[0]._id : "",
      note: currentLossDetail ? currentLossDetail.note : "",
    },
    validationSchema: object({
      note: string().test("note", "Vui lòng nhập nội dung lý do khác", (value) => {
        if (!value && valueLevel1 == 4) {
          return false;
        } else return true;
      }),
    }),
    onSubmit: async (values) => {
      const data = {
        MixerLogID: props.currentIdLoss,
        AreaID: values.area != "" ? values.area : props.areaList[0]?._id,
        ReasonLevel1ID: valueLevel1 != 4 ? valueLevel1 : null,
        ReasonLevel2ID: valueLevel1 != 4 ? valueLevel2 : null,
        ReasonLevel3ID: valueLevel1 != 4 ? valueLevel3 : null,
        note: values.note,
      };
      if (valueLevel1) {
        await postCreateLossLog(data).then((res) => {
          if (!res.error) {
            toast.success("Lưu lý do thành công");
            props.setReload((prev: boolean) => !prev);
          } else {
            toast.error("Đã có lỗi xảy ra, lưu lý do không thành công");
          }
        });
      } else {
        toast.error("Vui lòng chọn lý do level 1");
      }
    },
  });

  return (
    <div className="bg-[#FFFFFF] rounded-2xl p-4 border-[1px]">
      {props.currentIdLoss ? (
        <form
          noValidate
          autoComplete="off"
          id={"lossInputForm"}
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4"
        >
          <fieldset disabled={props.disabled} className="w-full h-full flex flex-col gap-4">
            <h1 className="text-[1.1vw] text-[#000000]">ID: {props.currentIdLoss}</h1>
            <div className="relative flex gap-4 items-center justify-center">
              <SelectField
                style={{ width: "60%" }}
                title="Khu vực"
                name="area"
                id="area"
                defaultValue={formik.values.area}
                value={formik.values.area}
                errors={formik.errors.area}
                touched={formik.touched.area}
                handleChange={formik.handleChange}
                renderItem={() => (
                  <>
                    {props.areaList.map((item, index) => (
                      <option key={index} value={item._id}>
                        <div className="flex">{item.name}</div>
                      </option>
                    ))}
                  </>
                )}
              />
              {props.lossNotedDetail.length > 0 && (
                <div className="absolute right-0">
                  <HistoryLossReasonModal dataHistory={props.lossNotedDetail} />
                </div>
              )}
            </div>
            <div className="flex justify-end">
              {/* <div className="max-w-sm">
                <Search
                  value={nameSearch}
                  enterButton="Tìm"
                  onChange={(e) => setNameSearch(e.target.value)}
                  onSearch={() => {
                    console.log(nameSearch);
                  }}
                  addonBefore={
                    <div className="flex gap-1">
                      <p>Tên lý do</p>
                    </div>
                  }
                  placeholder="Tìm tên lý do"
                />
              </div> */}
              <Button
                onClick={() => {
                  setValueLevel1(null);
                  setValueLevel2(null);
                  setValueLevel3(null);
                }}
              >
                Bỏ chọn
              </Button>
            </div>
            <LevelLossReasonFrame
              dataReason={props.reasonList}
              dataLevel2={dataLevel2}
              dataLevel3={dataLevel3}
              valueLevel1={valueLevel1}
              valueLevel2={valueLevel2}
              valueLevel3={valueLevel3}
              setValueLevel1={setValueLevel1}
              setValueLevel2={setValueLevel2}
              setValueLevel3={setValueLevel3}
            />
            <div className="flex flex-col gap-4 justify-start">
              <TextAreaField
                style={{ width: "100%" }}
                placeholder="Ghi chú hoặc lý do khác"
                title={valueLevel1 != 4 ? "Ghi chú" : "Nội dung lý do khác"}
                name="note"
                id="note"
                value={formik.values.note}
                errors={formik.errors.note}
                handleChange={formik.handleChange}
                touched={formik.touched.note}
              />
            </div>
            {!props.disabled && (
              <div className="flex justify-end w-full gap-2">
                <Button htmlType="submit" form="lossInputForm" type="primary">
                  Xác nhận
                </Button>
                <Button
                  onClick={() => {
                    formik.resetForm();
                    setReturnData((prev) => !prev);
                  }}
                  type="default"
                  danger
                >
                  Hoàn tác
                </Button>
              </div>
            )}
          </fieldset>
          {props.disabled && (
            <div className="flex justify-end w-full gap-2">
              <Popconfirm
                title={props.disabled ? "Chỉnh sửa loss" : "Hủy thay đổi"}
                description={props.disabled ? "Xác nhận chỉnh sửa loss?" : "Xác nhận hủy thay đổi?"}
                onConfirm={() => props.setDisabled((prev: any) => !prev)}
                okText="Xác nhận"
                cancelText="Hủy"
              >
                <Button type="primary" danger={!props.disabled}>
                  {props.disabled ? "Chỉnh sửa" : "Hủy thay đổi"}
                </Button>
              </Popconfirm>
            </div>
          )}
        </form>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-[1.2vw] text-[#000000]">Chosse a loss</p>
        </div>
      )}
    </div>
  );
};

export default LossInputForm;
