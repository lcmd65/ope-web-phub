import { DatabaseOutlined } from "@ant-design/icons";
import { Layout, Select } from "antd";
import MixerHistoryContent from "components/history/content";
import { useMixerListHook } from "hooks/dashboard/useMixerList";
import { useBatchHistory } from "hooks/history/useBatchHistory";
import Image from "next/image";
import color from "styles/enums/color";

const MixerHistory = () => {
  const { Header, Content } = Layout;
  const { mixerList, mixer, setMixer } = useMixerListHook();
  const { batchHistoryList, setBatchHistoryList, loading } = useBatchHistory(mixer?.mixer_id ?? "");

  return (
    <Layout>
      <Header
        style={{ margin: "0 16px", padding: "12px 24px", background: color.white }}
        className="flex items-center justify-between h-fit"
      >
        <div className="flex items-center">
          <Image src={"/images/webp/Logo-Unilever.webp"} alt={""} width={50} height={50} />
          <div className="w-[12px]"></div>
          <h1>Quality Prediction</h1>
        </div>
      </Header>
      <Header
        style={{ margin: "0 16px", padding: "12px 24px", background: color.white }}
        className="flex items-center justify-between h-fit"
      >
        <div className="flex gap-[12px]">
          <DatabaseOutlined
            rev={undefined}
            style={{
              fontSize: "2rem",
            }}
          />
          <h1>Dữ liệu lịch sử</h1>
        </div>
        <Select
          showSearch
          options={
            mixerList?.map((mixer) => ({
              value: mixer.mixer_id,
              label: mixer.name,
            })) ?? [
              {
                value: "",
                label: "",
              },
            ]
          }
          placeholder={mixer?.name ?? ""}
          filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
          className="w-fit min-w-[120px] h-[36px] m-2"
          size="large"
          onChange={(value) => {
            setMixer(mixerList?.find((mixer) => mixer.mixer_id === value));
          }}
        />
      </Header>
      <Content style={{ margin: "16px 16px" }}>
        <MixerHistoryContent
          batchHistoryList={batchHistoryList}
          setBatchHistoryList={setBatchHistoryList}
          loading={loading}
        />
      </Content>
    </Layout>
  );
};

export default MixerHistory;
