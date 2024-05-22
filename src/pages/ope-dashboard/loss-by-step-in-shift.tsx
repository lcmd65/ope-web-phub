import { DatePicker, Layout, RadioChangeEvent } from "antd";
import LostByStepInShiftContent from "components/ope-dashboard/loss_by_step_in_shift/loss_by_step_in_shift_content";
import Selector from "components/ope-dashboard/selector";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllMixerList } from "services/dashboard/dashboard";
import color from "styles/enums/color";
import { IMixerResponse } from "types/response/dashboard/IMixerResponse";
const { Header, Content, Footer, Sider } = Layout;

const LossByStepInShift = () => {
  const dateFormat = "YYYY/MM/DD";

  const { RangePicker } = DatePicker;

  const [mixer, setMixer] = useState<IMixerResponse>();

  const [mixerList, setMixerList] = useState<IMixerResponse[]>([]);

  const onChange = (e: RadioChangeEvent) => {
    setMixer(e.target.value);
  };

  const onSelectorChange = (item: string) => {
    setMixer(mixerList.find((mixer) => mixer.name === item));
  };

  const onShiftChange = (item: string) => {};

  useEffect(() => {
    callAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callAPI = () => {
    getAllMixerList().then((res) => {
      const sortedMixerList = res.data.sort((a, b) => {
        return parseInt(a.name) - parseInt(b.name);
      });
      setMixerList(sortedMixerList);
      if ((mixer === undefined || mixer === null) && res.data.length > 0) {
        setMixer(sortedMixerList[sortedMixerList.length - 1] ?? "");
      }
    });
  };

  const today = dayjs();
  const sevenDaysAgo = today.subtract(7, "day");

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
              //transform: "scale(1.3)",
              display: "flex",
            }}
            defaultValue={[dayjs(sevenDaysAgo, dateFormat), dayjs(today, dateFormat)]}
            format={dateFormat}
            size="large"
          />
        </div>

        <div className="h-full flex items-center gap-2">
          <h1>Mixer</h1>
          <Selector
            onChange={onSelectorChange}
            options={mixerList.map((item) => {
              return {
                label: item.name,
                value: item.mixer_id,
              };
            })}
          />
        </div>

        <div className="h-full flex items-center gap-2">
          <h1>Shift</h1>
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
        </div>
      </Header>
      <Content style={{ margin: "16px 16px" }}>
        <LostByStepInShiftContent />
      </Content>
    </Layout>
  );
};

export default LossByStepInShift;
