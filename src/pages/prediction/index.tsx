import { Layout } from "antd";
import QualityPredictionDashBoardContent from "components/prediction/content";
import Image from "next/image";
import color from "styles/enums/color";

const QualityPredictionDashBoard = () => {
  const { Header, Content, Footer, Sider } = Layout;
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
      <Content style={{ margin: "16px 16px" }}>
        <QualityPredictionDashBoardContent />
      </Content>
    </Layout>
  );
};

export default QualityPredictionDashBoard;
