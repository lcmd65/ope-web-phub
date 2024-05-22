import { DatePicker, Layout, Radio, RadioChangeEvent } from "antd";
import DateTime from "components/date_time";
import ManagementViewContent from "components/management-view/content";
import dayjs from "dayjs";
import { useMixerListHook } from "hooks/dashboard/useMixerList";
import { useManagementViewDataHook } from "hooks/management-view/useManagementData";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import color from "styles/enums/color";

const { Header, Content, Footer, Sider } = Layout;

export default function ManagementView() {
  const { RangePicker } = DatePicker;

  const { mixerList, mixer, setMixer } = useMixerListHook();
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
    dateFormat,
    fromDate,
    setFromDate,
    to_date,
    setToDate,
    BCTLostByShiftList,
    stepLostByShiftList,
  } = useManagementViewDataHook(mixer?.mixer_id);

  const onChange = (e: RadioChangeEvent) => {
    setMixer(e.target.value);
  };
  const xxl = useMediaQuery({ maxWidth: 1536 });

  return (
    <Layout className="relative">
      <Header
        style={{ margin: "0 16px", padding: "6px 6px", background: color.white }}
        className="h-[8vh] flex items-center justify-between"
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
        <div className="flex flex-col items-center">
          <DateTime />
          <RangePicker
            style={{
              marginBottom: 0,
              //transform: "scale(1.3)",
              display: "flex",
            }}
            defaultValue={[dayjs(fromDate, dateFormat), dayjs(to_date, dateFormat)]}
            format={dateFormat}
            size="large"
            onChange={(date, dateString) => {
              if (!date) return;
              else {
                setFromDate(dayjs(date[0]));
                setToDate(dayjs(date[1]));
              }
            }}
          />{" "}
        </div>
      </Header>
      <Content style={{ margin: "16px 16px" }}>
        <ManagementViewContent
          loading={loading}
          CUCLoading={CUCLoading}
          batchNoLoading={batchNoLoading}
          BCTLostList={BCTLostList}
          selectedCUCCode={selectedCUCCode}
          setSelectedCUCCode={setSelectedCUCCode}
          selectedBatchNo={selectedBatchNo}
          setSelectedBatchNo={setSelectedBatchNo}
          BCTLostByCUC={BCTLostByCUC}
          BCTLostListByBatchNo={BCTLostListByBatchNo}
          mixerId={mixer?.mixer_id}
          BCTLostByShiftList={BCTLostByShiftList}
          stepLostByShiftList={stepLostByShiftList}
        />
      </Content>
    </Layout>
  );
}
