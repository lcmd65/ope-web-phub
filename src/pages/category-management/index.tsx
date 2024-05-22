import { Layout } from "antd";
import { CategoryManagementTabView } from "components/category-management/tabs_view";
import DateTime from "components/date_time";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import color from "styles/enums/color";

const { Header, Content } = Layout;

export default function CategoryManagementView() {
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

        <div className="flex flex-col items-center">
          <DateTime />
        </div>
      </Header>
      <Content style={{ margin: "16px 16px" }}>
        <CategoryManagementTabView />
      </Content>
    </Layout>
  );
}
