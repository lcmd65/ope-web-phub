import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import LoginForm from "components/form/authForm";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginGetAccessToken } from "services/auth/checkAccount";
import { putUpdateBatch, updateMixerHistory } from "services/history/history";
import color from "styles/enums/color";
import { IBatch, IUpdateBatchRequest } from "types/response/history/Ibatch";
import { roundTo2Digits } from "utilities/function/roundTo2Digits";
import ExpandableMixerHistoryTable from "./expandableMixerHistoryTable";
import { MixerHistoryDetailModal } from "./modal";

enum Status {
  completed = "Hoàn thành",
  missingInfo = "Thiếu dữ liệu",
  waiting = "Đợi nhập Vis thực",
}
let statusToColor = new Map<Status, string>([
  [Status.completed, color.green],
  [Status.missingInfo, color.error],
  [Status.waiting, color.yellow],
]);
interface MixerHistory {
  batchNo?: string;
  cucCode?: string;
  time?: string;
  status?: string;
  batchVisDetail?: BatchDetail;
  batchAdDetail?: BatchDetail;
  batchPHDetail?: BatchDetail;
}
interface BatchDetail {
  batchNo?: string;
  weight?: number;
  temperature?: number;
  pressure?: number;
  pumpSpeed?: number;
  predictedValue?: number;
  actualValue?: number | null;
  regulatedValueRange: (number | undefined)[];
  safeValueRange: (number | undefined)[];
}

const MixerHistoryContent = (props: {
  batchHistoryList: IBatch[];
  setBatchHistoryList: Function;
  loading: boolean;
}) => {
  const { batchHistoryList, setBatchHistoryList, loading } = props;
  var tableData: MixerHistory[];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [historyData, setHistoryData] = useState<IBatch | null>(null);
  const [editedData, setEditedData] = useState<IBatch | null>(null);
  const [dataUpdate, setDataUpdate] = useState({} as IUpdateBatchRequest);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openLoginFormNew, setOpenLoginFormNew] = useState(false);

  const columns: ColumnsType<MixerHistory> = [
    {
      title: "Batch Number",
      dataIndex: "batchNo",
      key: "batchNo",
      width: "20%",
    },
    {
      title: "CUC Code",
      dataIndex: "cucCode",
      key: "cucCode",
      width: "20%",
    },
    {
      title: "Thời điểm tạo mẻ",
      dataIndex: "time",
      key: "time",
      width: "40%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (text) => {
        return {
          props: {
            style: {
              background: statusToColor.get(text),
            },
          },
          children: (
            <Tag color={statusToColor.get(text)}>
              <h2>{text}</h2>
            </Tag>
          ),
        };
      },
    },
    {
      title: "",
      key: "detail",
      render: (_, record, index) => (
        <a
          onClick={() => {
            handleOpenDetail(batchHistoryList[index]);
          }}
        >
          Mở
        </a>
      ),
    },
  ];

  const handleOpenDetail = (record: IBatch) => {
    setIsModalVisible(true);
    setHistoryData(record);
    setEditedData({ ...record });
  };

  const handleSaveEdit = () => {
    setOpenLoginForm(true);
  };
  const handleSaveEditAfterLogin = (record: IBatch, token: string) => {
    const index = batchHistoryList.findIndex((item) => item._id === record._id);
    if (index !== -1) {
      updateMixerHistory(record, token).then((success: boolean) => {
        if (!success) {
          toast.error("Update Mixer History failed");
          return;
        }
        setBatchHistoryList(
          batchHistoryList.map((item) => {
            if (item._id === record._id) {
              return record;
            } else {
              return item;
            }
          }),
        );
      });
    }
    setIsModalVisible(false);
    setHistoryData(null);
    setEditedData(null);
  };
  if (!batchHistoryList) {
    tableData = [];
  } else {
    tableData = batchHistoryList.map((batch) => ({
      key: batch._id,
      batchNo: batch.batchNo,
      cucCode: batch.productCode,
      time: dayjs(batch.createdAt).format("HH:mm:ss DD/MM/YYYY"),
      status: batch.status,
      batchVisDetail: {
        batchNo: batch.batchNo,
        weight: roundTo2Digits(batch.vis_predict_data.weight),
        temperature: roundTo2Digits(batch.vis_predict_data.temp),
        pressure: roundTo2Digits(batch.vis_predict_data.pressure),
        pumpSpeed: roundTo2Digits(batch.vis_predict_data.speed),
        predictedValue: roundTo2Digits(batch.vis_predict_data.predict_vis),
        actualValue: roundTo2Digits(batch.vis_predict_data.real_vis),
        regulatedValueRange: [
          roundTo2Digits(batch.vis_safe_zone.lower_limit),
          roundTo2Digits(batch.vis_safe_zone.upper_limit),
        ],
        safeValueRange: [
          roundTo2Digits(batch.vis_safe_zone.lower_safezone),
          roundTo2Digits(batch.vis_safe_zone.upper_safezone),
        ],
      },
      batchAdDetail: {
        predictedValue: roundTo2Digits(batch.ad_predict_data.predict_ad),
        actualValue: roundTo2Digits(batch.ad_predict_data.real_ad),
        regulatedValueRange: [
          roundTo2Digits(batch.ad_safe_zone.lower_limit),
          roundTo2Digits(batch.ad_safe_zone.upper_limit),
        ],
        safeValueRange: [
          roundTo2Digits(batch.ad_safe_zone.lower_safezone),
          roundTo2Digits(batch.ad_safe_zone.upper_safezone),
        ],
      },
      batchPHDetail: {
        predictedValue: roundTo2Digits(batch.ph_predict_data.predict_ph),
        actualValue: roundTo2Digits(batch.ph_predict_data.real_ph),
        regulatedValueRange: [
          roundTo2Digits(batch.ph_safe_zone.lower_limit),
          roundTo2Digits(batch.ph_safe_zone.upper_limit),
        ],
        safeValueRange: [
          roundTo2Digits(batch.ph_safe_zone.lower_safezone),
          roundTo2Digits(batch.ph_safe_zone.upper_safezone),
        ],
      },
    }));
  }

  return (
    <div
      style={{
        backgroundColor: color.white,
        width: "100%",
      }}
    >
      <ExpandableMixerHistoryTable columns={columns} data={tableData} loading={loading} />
      {historyData && (
        <MixerHistoryDetailModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          handleSaveEdit={handleSaveEdit}
          editedData={editedData}
          setEditedData={setEditedData}
          mixerHistoryData={historyData}
          setDataUpdate={setDataUpdate}
          setOpenLoginFormNew={setOpenLoginFormNew}
        />
      )}

      <LoginForm
        onSubmitted={(username: string, password: string) => {
          setOpenLoginForm(false);
          loginGetAccessToken(username, password).then((token) => {
            if (token === null) {
              toast.error("Login failed");
              return;
            }
            if (editedData === null) return;
            handleSaveEditAfterLogin(editedData, token);
          });
          return true;
        }}
        open={openLoginForm}
        setModalOpen={setOpenLoginForm}
      />
      <LoginForm
        onSubmitted={(username: string, password: string) => {
          setOpenLoginFormNew(false);
          loginGetAccessToken(username, password).then((token) => {
            if (token === null) {
              toast.error("Login failed");
              return;
            }
            if (historyData?._id) {
              putUpdateBatch(historyData?._id, dataUpdate, token)
                .then((res) => {
                  if (!res.error) {
                    toast.success("Update successfully");
                  } else {
                    toast.error("Update failed");
                  }
                })
                .finally(() => {
                  setIsModalVisible(false);
                });
            } else {
              toast.error("Not found ID Batch");
              return;
            }
          });
          return true;
        }}
        open={openLoginFormNew}
        setModalOpen={setOpenLoginFormNew}
      />
    </div>
  );
};

export default MixerHistoryContent;
export type { BatchDetail, MixerHistory };
