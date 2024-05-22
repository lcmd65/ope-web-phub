import { DatePicker, Layout } from "antd";
import OPEDashboardContent from "components/ope-dashboard/dashboard/content";
import Selector from "components/ope-dashboard/selector";
import dayjs from "dayjs";
import useOPEDashboard from "hooks/ope-dashboard/useOPEDashboard";
import Image from "next/image";
import color from "styles/enums/color";

const { Header, Content, Footer, Sider } = Layout;

export default function OPEDashboard() {
  const { RangePicker } = DatePicker;
  const {
    dateFormat,
    startDate,
    endDate,
    mixerList,
    shiftList,
    dataChartOPEByShift,
    dataChartCIPByShift,
    dataOPEByShift,
    dataLossBCTInternal,
    dataLossBCTExternal,
    isLoading,
    onChange,
    onSelectorChangeMixer,
    onShiftChange,
    setStartDate,
    setEndDate,
  } = useOPEDashboard();

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
          <RangePicker
            style={{
              marginBottom: 0,
              display: "flex",
            }}
            defaultValue={[startDate, endDate]}
            format={dateFormat}
            size="large"
            onChange={(date, dateString) => {
              if (!date) return;
              else {
                setStartDate(dayjs(date[0]));
                setEndDate(dayjs(date[1]));
              }
            }}
          />
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
            options={mixerList.map((item) => {
              return {
                label: item.name,
                value: item.mixer_id,
              };
            })}
          />
        </div>

        <div className="h-full flex items-center gap-2">
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
        <OPEDashboardContent
          isLoading={isLoading}
          dataChartOPEByShift={dataChartOPEByShift}
          dataChartCIPByShift={dataChartCIPByShift}
          dataOPEByShift={dataOPEByShift}
          dataLossBCTInternal={dataLossBCTInternal}
          dataLossBCTExternal={dataLossBCTExternal}
        />
      </Content>
    </Layout>
  );
}
