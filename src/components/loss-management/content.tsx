import { Spin } from "antd";
import LossInputForm from "components/common/form/lossInputForm";
import LoadingIndicator from "components/dashBoard/LoadingIndicator";
import { IArea } from "types/response/loss-management/ILossManagement";
import LossListFrame from "./frame/lossListFrame";

type Props = {
  loading?: boolean;
  countStatus: any;
  isLoadingForm: boolean;
  disabledForm: boolean;
  currentIdLoss: string;
  statusLog: string;
  lossNotedDetail: any;
  reasonList: any[];
  areaList: IArea[];
  mixerLossList: any[];
  currentMixerId: string;
  setDisabledForm: (prev: boolean) => void;
  setStatusLog: (value: string) => void;
  setCurrentIdLoss: (value: string) => void;
  setReload: (prev: any) => void;
};

const LossManagementContent = (props: Props) => {
  const {
    loading,
    countStatus,
    isLoadingForm,
    areaList,
    reasonList,
    statusLog,
    mixerLossList,
    currentIdLoss,
    lossNotedDetail,
    disabledForm,
    currentMixerId,
    setDisabledForm,
    setStatusLog,
    setCurrentIdLoss,
    setReload,
  } = props;

  return (
    <div className="w-full">
      {loading && <LoadingIndicator />}
      <div
        className="gap-3 relative grid grid-cols-5 py-4"
        style={
          loading
            ? {
                filter: "blur(3px)",
                pointerEvents: "none",
              }
            : {}
        }
      >
        <div className="col-span-2">
          <LossListFrame
            statusLog={statusLog}
            countStatus={countStatus}
            currentIdLoss={currentIdLoss}
            setCurrentIdLoss={setCurrentIdLoss}
            setStatusLog={setStatusLog}
            areaList={areaList}
            reasonList={reasonList}
            mixerLossList={mixerLossList}
            currentMixerId={currentMixerId}
            setReload={setReload}
          />
        </div>
        <div className="col-span-3">
          {isLoadingForm ? (
            <div className="flex justify-center items-center bg-[#FFFFFF] rounded-2xl p-4 border-[1px] h-full">
              <Spin size="large">
                <div className="p-20 rounded-lg bg-neutral-50" />
              </Spin>
            </div>
          ) : (
            <LossInputForm
              setReload={setReload}
              lossNotedDetail={lossNotedDetail}
              currentIdLoss={currentIdLoss}
              disabled={disabledForm}
              setDisabled={setDisabledForm}
              areaList={areaList}
              reasonList={reasonList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LossManagementContent;
