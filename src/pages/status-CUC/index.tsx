import { DatePicker, Layout } from "antd";
import DateTime from "components/date_time";
import Selector from "components/ope-dashboard/selector";
import CUCStatusContent from "components/status-CUC/content";
import dayjs from "dayjs";
import { useMixerListHook } from "hooks/dashboard/useMixerList";
import useCUCMixerStatus from "hooks/status-CUC/useCUCMixerStatus";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import "react-toastify/dist/ReactToastify.css";
import color from "styles/enums/color";

const { Header, Content, Footer, Sider } = Layout;

export default function CUCStatusPage() {
  const { mixerList, mixer, setMixer } = useMixerListHook();
  const {
    loading,
    dateFormat,
    startDate,
    endDate,
    dataInfoCUCMixer,
    listCUCStatusDelete,
    shiftList,
    onDeleteCUCSchedule,
    onShiftChange,
    setListCUCStatusDelete,
    setStartDate,
    setEndDate,
    setReload,
  } = useCUCMixerStatus(mixerList);

  const { RangePicker } = DatePicker;
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
        <div className="h-full flex items-center gap-2 min-w-[200px]">
          <h1>Shift</h1>
          <Selector
            placeholder="Select shift"
            onChange={onShiftChange}
            defaultValue={shiftList[0].value}
            options={shiftList.map((item) => {
              return {
                label: item.label,
                value: item.value,
              };
            })}
          />
        </div>
        <div className="text-[1.1vw]">
          <DateTime />
        </div>
      </Header>
      <Content style={{ margin: "0px 16px" }}>
        {dataInfoCUCMixer && (
          <CUCStatusContent
            loading={loading}
            dataInfoCUCMixer={dataInfoCUCMixer}
            startDate={startDate}
            listCUCStatusDelete={listCUCStatusDelete}
            setListCUCStatusDelete={setListCUCStatusDelete}
            onDeleteCUCSchedule={onDeleteCUCSchedule}
            setReload={setReload}
          />
        )}
      </Content>
    </Layout>
  );
}
