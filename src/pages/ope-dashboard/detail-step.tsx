import { DatePicker, Layout } from "antd";
import DetailStepContent from "components/ope-dashboard/detail-step/content";
import Selector from "components/ope-dashboard/selector";
import dayjs from "dayjs";
import useOPEStepMixer from "hooks/ope-dashboard/useOPEStepMixer";
import Image from "next/image";
import color from "styles/enums/color";

const { Header, Content, Footer, Sider } = Layout;

const LostByStepInShift = () => {
  const {
    mixer,
    mixerList,
    dateFormat,
    shiftList,
    endDate,
    startDate,
    keyStepInfoList,
    dataOPEbyDateStepChart,
    dataOPEbyDate,
    isLoading,
    modeTime,
    weekList,
    selectStepDay,
    endWeek,
    startWeek,
    selectStepWeek,
    modeTimeChange,
    onShiftChange,
    onSelectStep,
    onSelectorChangeMixer,
    setStartDate,
    setEndDate,
    setEndWeek,
    setStartWeek,
    onCheckAllChange,
  } = useOPEStepMixer();

  const { RangePicker } = DatePicker;

  return (
    <Layout className="relative">
      <Header
        style={{ margin: "0 16px", padding: "6px 6px", background: color.white }}
        className="h-[8vh] flex items-center justify-between"
      >
        <div className="flex gap-[64px]">
          <div className="flex items-center">
            <Image src={"/images/webp/Logo-Unilever.webp"} alt={""} width={50} height={50} />
            <div className="w-[12px]"></div>
            <h1>OPE Dashboard</h1>
          </div>
          {modeTime == "day" ? (
            <RangePicker
              style={{
                marginBottom: 0,
                display: "flex",
              }}
              defaultValue={[startDate, endDate]}
              format={dateFormat}
              onChange={(date, dateString) => {
                if (!date) return;
                else {
                  setStartDate(dayjs(date[0]));
                  setEndDate(dayjs(date[1]));
                }
              }}
              size="large"
            />
          ) : (
            <>
              <div className="h-full flex items-center gap-2 min-w-[200px]">
                <h1>Start week</h1>
                <Selector
                  placeholder="Select start week"
                  onChange={(e) => setStartWeek(Number(e))}
                  options={weekList}
                  defaultValue={weekList.find((item) => item.value == String(startWeek))?.label}
                />
              </div>
              <div className="h-full flex items-center gap-2 min-w-[200px]">
                <h1>End week</h1>
                <Selector
                  placeholder="Select end week"
                  onChange={(e) => setEndWeek(Number(e))}
                  options={weekList}
                  defaultValue={weekList.find((item) => item.value == String(endWeek))?.label}
                />
              </div>
            </>
          )}
        </div>

        <div className="h-full flex items-center gap-2 min-w-[200px]">
          <h1>Mixer</h1>
          <Selector
            placeholder="Select mixer"
            mode="multiple"
            onChange={onSelectorChangeMixer}
            options={mixerList.map((item) => {
              return {
                label: item.name,
                value: item.mixer_id,
              };
            })}
            defaultValue={mixerList[0]?.mixer_id}
          />
        </div>
        <div className="h-full flex items-center gap-2 min-w-[200px]">
          <h1>Shift</h1>
          <Selector
            mode="multiple"
            placeholder="Select shift"
            onChange={onShiftChange}
            options={shiftList.map((item) => {
              return {
                label: item.label,
                value: item.value,
              };
            })}
            defaultValue={shiftList[0].value}
          />
        </div>

        {/* <div className="h-full flex items-center gap-2">
          <h1>Product code</h1>
          <Selector
            onChange={onShiftChange}
            options={shiftList.map((item) => {
              return {
                label: item.label,
                value: item.value,
              };
            })}
          />
        </div> */}

        {/* <div className="h-full flex items-center gap-2">
          <h1>Batch ID</h1>
          <Selector
            onChange={onShiftChange}
            options={mixerList.map((item) => {
              return {
                label: item.name,
                value: item.mixer_id,
              };
            })}
          />
        </div> */}
      </Header>
      <Content style={{ margin: "16px 16px" }}>
        <DetailStepContent
          keyStepInfoList={keyStepInfoList}
          onSelectStep={onSelectStep}
          dataOPEbyDateStepChart={dataOPEbyDateStepChart}
          dataOPEbyDate={dataOPEbyDate}
          modeTime={modeTime}
          modeTimeChange={modeTimeChange}
          isLoading={isLoading}
          selectStepDay={selectStepDay}
          selectStepWeek={selectStepWeek}
          onCheckAllChange={onCheckAllChange}
        />
      </Content>
    </Layout>
  );
};

export default LostByStepInShift;
