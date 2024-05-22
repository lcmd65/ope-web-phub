import { DatePicker, Layout } from "antd";
import OtherContent from "components/export-batch/content";
import useExportBatchPage from "hooks/export-batch/useExportBatch";
import Image from "next/image";
import color from "styles/enums/color";

const { Header, Content, Footer, Sider } = Layout;

export default function ExportBatchPage() {
  const { RangePicker } = DatePicker;
  const {
    dateFormat,
    startDate,
    endDate,
    mixer,
    category,
    mixerList,
    categoryList,
    isLoading,
    onSelectorChangeMixer,
    onSelectorChangeCategory,
    setStartDate,
    setEndDate,
    setIsLoading,
  } = useExportBatchPage();

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
        </div>
      </Header>
      <Content className="p-10">
        <OtherContent isLoading={isLoading} setIsLoading={setIsLoading} />
      </Content>
    </Layout>
  );
}
