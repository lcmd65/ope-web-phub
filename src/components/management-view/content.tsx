import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IBCTLostByCUC } from "types/response/management_view/IBCTLostByCUC";
import { IBCTLostByStep } from "types/response/management_view/IBCTLostByStep";
import { IBCTLostByShift } from "types/response/management_view/IBCTLostShift";
import { IBCTLost } from "types/response/management_view/IBTCLost";
import { IStepLostByShift, StepLossList } from "types/response/management_view/IStepLossByShift";
import BCTTrendShift from "./BCTTrendInShift";
import LossBCTcorrespondBatchNo from "./lossBCTcorrespondBatchNo";
import LossBCTcorrespondCUCCode from "./lossBCTcorrespondCUCCode";
import LossBCTcorrespondMixer from "./lossBCTcorrespondMixer";

const ManagementViewContent = (props: {
  loading: boolean;
  CUCLoading: boolean;
  batchNoLoading: boolean;
  BCTLostList: IBCTLost[];
  selectedCUCCode: string;
  setSelectedCUCCode: Dispatch<SetStateAction<string>>;
  selectedBatchNo: string;
  setSelectedBatchNo: Dispatch<SetStateAction<string>>;
  BCTLostByCUC: IBCTLostByCUC | undefined;
  BCTLostListByBatchNo: IBCTLostByStep[];
  mixerId?: string;
  BCTLostByShiftList: IBCTLostByShift[];
  stepLostByShiftList: IStepLostByShift[];
}) => {
  const {
    loading,
    CUCLoading,
    batchNoLoading,
    BCTLostList,
    selectedCUCCode,
    setSelectedCUCCode,
    selectedBatchNo,
    setSelectedBatchNo,
    BCTLostByCUC,
    BCTLostListByBatchNo,
    mixerId,
    BCTLostByShiftList,
    stepLostByShiftList,
  } = props;

  const [selectedStepLostList, setSelectedStepLostList] = useState<StepLossList[]>([]);

  useEffect(() => {
    if (
      stepLostByShiftList.length === 0 ||
      stepLostByShiftList[0].shift_step_loss_list.length === 0 ||
      stepLostByShiftList[0].shift_step_loss_list[0].step_loss_list.length === 0
    )
      return;
    else setSelectedStepLostList(stepLostByShiftList[0].shift_step_loss_list[0].step_loss_list);
  }, [stepLostByShiftList]);

  return (
    <div className="w-full h-[90vh]">
      {loading && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 99 }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin rev={undefined} />} />
        </div>
      )}
      <div
        className="grid grid-cols-3 gap-[12px] w-full h-1/2"
        style={
          loading
            ? {
                filter: "blur(3px)",
                pointerEvents: "none",
              }
            : {}
        }
      >
        <div className="h-full">
          <LossBCTcorrespondMixer BCTLostList={BCTLostList} setSelectedCUCCode={setSelectedCUCCode} mixerId={mixerId} />
        </div>
        <div
          className="h-full"
          style={
            CUCLoading
              ? {
                  filter: "blur(3px)",
                  pointerEvents: "none",
                }
              : {}
          }
        >
          <LossBCTcorrespondCUCCode
            BCTLostByCUC={BCTLostByCUC}
            setSelectedBatchNo={setSelectedBatchNo}
            selectedCUCCode={selectedCUCCode}
          />
        </div>
        <div
          className="h-full"
          style={
            batchNoLoading
              ? {
                  filter: "blur(3px)",
                  pointerEvents: "none",
                }
              : {}
          }
        >
          <LossBCTcorrespondBatchNo BCTLostListByBatchNo={BCTLostListByBatchNo} />
        </div>
      </div>
      <div className="gap-[12px] w-full h-1/2">
        <div className="h-full w-full">
          <BCTTrendShift BCTLostByShiftList={BCTLostByShiftList} />
        </div>
        {/* <div className="h-full w-full">
          <Top3ToplossTrend
            stepLostByShiftList={stepLostByShiftList}
            setSelectedStepLostList={setSelectedStepLostList}
            selectedStepLostList={selectedStepLostList}
          />
        </div>
        <div className="h-full w-full">
          <BatchDetail selectedStepLostList={selectedStepLostList} />
        </div> */}
      </div>
    </div>
  );
};

export default ManagementViewContent;
