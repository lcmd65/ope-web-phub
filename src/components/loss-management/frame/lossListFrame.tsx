import { Divider, Radio, Tabs, TabsProps } from "antd";
import { useDashboardDataHook } from "hooks/dashboard/useDashboardDataHook";
import { IArea, IMixerLoss } from "types/response/loss-management/ILossManagement";
import ImportLossInternalModal from "../modal/importLossInternalModal";
import LossInfoFrame from "./lossInfoFrame";
import OpeExternalInternalPieChart from "./opeExternalInternalPieChart";
import StatusMixerFrame from "./statusMixerFrame";

type Props = {
  currentIdLoss: string;
  reasonList: any[];
  areaList: IArea[];
  mixerLossList: IMixerLoss[];
  statusLog: string;
  currentMixerId: string;
  countStatus: any;
  setStatusLog: (value: string) => void;
  setCurrentIdLoss: (value: string) => void;
  setReload: (prev: any) => void;
};

const LossListFrame = (props: Props) => {
  const {
    currentIdLoss,
    reasonList,
    mixerLossList,
    statusLog,
    currentMixerId,
    countStatus,
    setCurrentIdLoss,
    setStatusLog,
    setReload,
  } = props;
  const { ope, external } = useDashboardDataHook(currentMixerId);
  const onChange = (key: string) => {
    setStatusLog(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "ACTIVE",
      label: "Chưa nhập",
    },
    {
      key: "NOTED",
      label: "Đã nhập",
    },
    {
      key: "ALL",
      label: "Tất cả",
    },
  ];

  return (
    <div className="bg-[#FFFFFF] rounded-2xl p-4 border-[1px]">
      <div className="flex justify-between">
        <StatusMixerFrame status="running" />
        <OpeExternalInternalPieChart
          title={"Shift OPE"}
          data={ope?.ope}
          external={ope?.external}
          internal={ope?.internal}
        />
      </div>
      <Divider orientation="left" plain />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-[1.4vw] text-[#000000]">Nhập Loss</h1>
          <div className="flex gap-2 rounded-xl border-[1px] border-[#BBBBBB] p-2">
            {reasonList.map((level, index) => (
              <div key={index} className="flex justify-center gap-1 items-center w-full h-full">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: `#${level.color}`,
                  }}
                ></div>
                <p className="text-[1.2vw] text-[#000000]">{level.code}</p>{" "}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 justify-between items-center">
          <div className="flex gap-2">
            <p className="text-[1vw] text-[#000000] font-medium">Chưa nhập/Tổng:</p>
            <p className="text-[1vw] text-[#000000]">
              {countStatus.ACTIVE}/{countStatus.ALL}
            </p>
          </div>

          <ImportLossInternalModal currentMixerId={currentMixerId} setReload={setReload} />
        </div>
        {/* <div className="flex gap-2 justify-between">
          <div className="h-full flex flex-col items-center gap-2 min-w-[200px]">
            <h1 className="text-[1.2vw] text-[#000000]">Mã sản phẩm</h1>
            <Selector
              placeholder="Select product code"
              onChange={() => console.log("change")}
              options={productCodeList.map((item) => {
                return {
                  label: item.label,
                  value: item.value,
                };
              })}
            />
          </div>
          <div className="h-full flex flex-col items-center gap-2 min-w-[200px]">
            <h1 className="text-[1.2vw] text-[#000000]">Khu vực</h1>
            <Selector
              placeholder="Select area"
              onChange={() => console.log("change")}
              options={areaList.map((item) => {
                return {
                  label: item.label,
                  value: item.value,
                };
              })}
            />
          </div>
        </div> */}
        <div>
          <Tabs defaultActiveKey="1" type="card" items={items} activeKey={statusLog} onChange={onChange} />
          <div className="flex flex-col gap-2 h-[400px] overflow-y-auto p-2">
            {mixerLossList.length > 0 ? (
              <Radio.Group
                value={currentIdLoss}
                onChange={(e) => setCurrentIdLoss(e.target.value)}
                className="flex flex-col gap-2"
              >
                {mixerLossList.map((item, index: number) => (
                  <LossInfoFrame key={index} currentId={currentIdLoss} onChange={setCurrentIdLoss} lossInfo={item} />
                ))}
              </Radio.Group>
            ) : (
              <div className="h-full w-full flex justify-center items-center">
                <p className="text-[1.2vw] text-[#000000]">No data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LossListFrame;
