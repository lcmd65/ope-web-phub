import { Button, DatePicker, Layout, Modal, Radio, RadioChangeEvent } from "antd";
import StepProgressBar from "components/common/progressBar";
import DateTime from "components/date_time";
import LossManagementContent from "components/loss-management/content";
import DashboardLoss from "components/loss-management/dashboard";
import Selector from "components/ope-dashboard/selector";
import dayjs from "dayjs";
import { useMixerListHook } from "hooks/dashboard/useMixerList";
import { useMixerStatusHistoryHook } from "hooks/dashboard/useMixerStatusHistoryHook";
import { useLossManagement } from "hooks/loss-management/useLossManagement";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import color from "styles/enums/color";

const { Header, Content, Footer, Sider } = Layout;

export default function LossManagementPage() {
  const { mixerList, mixer, setMixer } = useMixerListHook();
  const onChangeMixer = (e: RadioChangeEvent) => {
    setMixer(e.target.value);
  };
  const xxl = useMediaQuery({ maxWidth: 1536 });
  const { mixerStatusList } = useMixerStatusHistoryHook(mixer?.mixer_id);
  const { RangePicker } = DatePicker;
  const {
    loading,
    isLoadingForm,
    dateFormat,
    endDate,
    startDate,
    areaList,
    level,
    statusLog,
    reasonList,
    mixerLossList,
    currentIdLoss,
    lossNotedDetail,
    disabledForm,
    dataLossAreaChart,
    dataLossReasonChart,
    pageStatus,
    isModalExcelOpen,
    statusList,
    statusLogList,
    isExportExcel,
    countStatus,
    onChangePage,
    setDisabledForm,
    setCurrentIdLoss,
    setStartDate,
    setEndDate,
    setStatusLog,
    setReload,
    setLevel,
    handleCancelModalExcel,
    handleOkModalExcel,
    showModalExcel,
    setAreaExcel,
    setEndDateExcel,
    setStartDateExcel,
    setStatusExcel,
    setStatusLogExcel,
  } = useLossManagement(mixer?.mixer_id);

  return (
    <Layout className="relative">
      <Header
        style={{ margin: "0 16px", padding: "8px 6px", background: color.white }}
        className="flex items-center gap-4 justify-between h-fit"
      >
        <div className="flex items-center">
          <Image src={"/images/webp/Logo-Unilever.webp"} alt={""} width={50} height={50} />
          <div className="w-[12px]"></div>
          <h1 className="text-[1.2vw]">Process Hub Performance</h1>
        </div>
        <Radio.Group value={pageStatus} size="large" onChange={onChangePage}>
          <Radio.Button value="lossList">Loss List</Radio.Button>
          <Radio.Button value="dashboard">Dashboard</Radio.Button>
        </Radio.Group>
        {mixerList && (
          <Radio.Group
            value={mixer}
            onChange={onChangeMixer}
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
        <>
          <Button type="primary" onClick={showModalExcel}>
            Export excel
          </Button>
          <Modal
            title="Export excel"
            open={isModalExcelOpen}
            onOk={handleOkModalExcel}
            onCancel={handleCancelModalExcel}
            width={1000}
            className="relative"
            okText="Export"
            cancelButtonProps={{ style: { display: "none" } }}
          >
            <div className="grid grid-cols-3 gap-2 w-fit z-0">
              <div className="h-full flex flex-col items-center gap-2 min-w-[200px]">
                <h1 className="text-[1.2vw] text-[#000000]">Date</h1>
                <RangePicker
                  style={{
                    marginBottom: 0,
                    display: "flex",
                  }}
                  disabled={isExportExcel}
                  defaultValue={[startDate, endDate]}
                  format={dateFormat}
                  size="large"
                  onChange={(date, dateString) => {
                    if (!date) return;
                    else {
                      setStartDateExcel(dayjs(date[0]));
                      setEndDateExcel(dayjs(date[1]));
                    }
                  }}
                />
              </div>

              <div className="h-full flex flex-col items-center gap-2 min-w-[200px]">
                <h1 className="text-[1.2vw] text-[#000000]">Khu vực</h1>
                <Selector
                  placeholder="Select area"
                  onChange={(area: any) => setAreaExcel(area)}
                  disabled={isExportExcel}
                  options={areaList
                    .map((item) => {
                      return {
                        label: item.name,
                        value: item._id,
                      };
                    })
                    .concat([
                      {
                        label: "All",
                        value: "ALL",
                      },
                    ])
                    .reverse()}
                />
              </div>
              <div className="h-full flex flex-col items-center gap-2 min-w-[200px]">
                <h1 className="text-[1.2vw] text-[#000000]">Trạng thái Mixer</h1>
                <Selector
                  disabled={isExportExcel}
                  placeholder="Select status mixer"
                  onChange={(item: any) => setStatusExcel(item)}
                  options={statusList.map((item) => {
                    return {
                      label: item.label,
                      value: item.value,
                    };
                  })}
                />
              </div>
              <div className="h-full flex flex-col items-center gap-2 min-w-[200px]">
                <h1 className="text-[1.2vw] text-[#000000]">Trạng thái Loss</h1>
                <Selector
                  disabled={isExportExcel}
                  placeholder="Select status loss"
                  onChange={(item: any) => setStatusLogExcel(item)}
                  options={statusLogList.map((item) => {
                    return {
                      label: item.label,
                      value: item.value,
                    };
                  })}
                />
              </div>
            </div>
          </Modal>
        </>
        <div className="text-[1.1vw]">
          <DateTime />
        </div>
      </Header>
      <div className="px-[16px] pt-4">
        <StepProgressBar progressData={mixerStatusList} />
      </div>
      <Content style={{ margin: "0px 16px" }}>
        {pageStatus === "lossList" && mixer?.mixer_id ? (
          <LossManagementContent
            disabledForm={disabledForm}
            setDisabledForm={setDisabledForm}
            areaList={areaList}
            reasonList={reasonList}
            currentIdLoss={currentIdLoss}
            lossNotedDetail={lossNotedDetail}
            statusLog={statusLog}
            setCurrentIdLoss={setCurrentIdLoss}
            mixerLossList={mixerLossList}
            setStatusLog={setStatusLog}
            loading={loading}
            isLoadingForm={isLoadingForm}
            setReload={setReload}
            currentMixerId={mixer?.mixer_id}
            countStatus={countStatus}
          />
        ) : (
          <DashboardLoss
            dataLossAreaChart={dataLossAreaChart}
            dataLossReasonChart={dataLossReasonChart}
            loading={loading}
            level={level}
            setLevel={setLevel}
          />
        )}
      </Content>
    </Layout>
  );
}
