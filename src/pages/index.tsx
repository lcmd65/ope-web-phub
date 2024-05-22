import { Layout, Radio, RadioChangeEvent } from "antd";
import StepProgressBar from "components/common/progressBar";
import DashBoardContent from "components/dashBoard/content";
import DateTime from "components/date_time";
import { useDashboardDataHook } from "hooks/dashboard/useDashboardDataHook";
import { useMixerListHook } from "hooks/dashboard/useMixerList";
import { useMixerStatusHistoryHook } from "hooks/dashboard/useMixerStatusHistoryHook";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { getPumpStatusByMixer } from "services/pump/pumpService";
import color from "styles/enums/color";
import { IPumpStatus } from "types/response/pump/IPumpStatus";

const { Header, Content, Footer, Sider } = Layout;
const usePumpStatus = (mixer_id?: string) => {
  const [pumpStatus, setPumpStatus] = useState<IPumpStatus>();

  useEffect(() => {
    if (mixer_id) {
      getPumpStatusByMixer(mixer_id).then((value) => {
        setPumpStatus(value.data);
      });
    }
  }, [mixer_id]);

  return { pumpStatus };
};
export default function Home() {
  const { mixerList, mixer, setMixer } = useMixerListHook();
  const { mixerStatusList } = useMixerStatusHistoryHook(mixer?.mixer_id);
  const {
    loading,
    batchResult,
    batchUncertain,
    ope,
    external,
    opeHistory,
    or,
    orHistory,
    thisShiftTopLoss,
    lastShiftTopLoss,
    currentBatchTopLoss,
  } = useDashboardDataHook(mixer?.mixer_id);

  const { pumpStatus } = usePumpStatus(mixer?.mixer_id);
  const onChange = (e: RadioChangeEvent) => {
    setMixer(e.target.value);
  };
  const xxl = useMediaQuery({ maxWidth: 1536 });

  return (
    <Layout className="relative">
      <Header
        style={{ margin: "0 16px", padding: "8px 6px", background: color.white }}
        className="flex items-center justify-between h-fit"
      >
        <div className="flex items-center">
          <Image src={"/images/webp/Logo-Unilever.webp"} alt={""} width={xxl ? 50 : 100} height={50} />
          <div className="w-[12px]"></div>
          <h1 className="text-[1.2vw]">Process Hub Performance</h1>
        </div>

        {mixerList && (
          <Radio.Group
            value={mixer}
            onChange={onChange}
            style={{
              marginBottom: 0,
              display: "flex",
            }}
            size="large"
            buttonStyle="solid"
          >
            {mixerList.map((item, index) => (
              <Radio.Button
                key={index}
                value={item}
                style={{
                  fontSize: "1.2vw",
                  height: xxl ? 30 : "2.4vw",
                  width: xxl ? undefined : "4.3vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.name}
              </Radio.Button>
            ))}
          </Radio.Group>
        )}
        <div className="text-[1.1vw]">
          <DateTime />
        </div>
      </Header>
      <div className="px-[16px] pt-4">
        <StepProgressBar progressData={mixerStatusList} />
      </div>
      {mixer?.mixer_id && (
        <Content style={{ margin: "0px 16px" }}>
          <DashBoardContent
            pumpStatus={pumpStatus}
            mixer_id={mixer.mixer_id}
            loading={loading}
            batchResult={batchResult}
            batchUncertain={batchUncertain}
            ope={ope}
            external={external}
            opeHistory={opeHistory}
            or={or}
            orHistory={orHistory}
            thisShiftTopLoss={thisShiftTopLoss}
            lastShiftTopLoss={lastShiftTopLoss}
            currentBatchTopLoss={currentBatchTopLoss}
          />
        </Content>
      )}
    </Layout>
  );
}
