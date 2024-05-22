import {
  BarChartOutlined,
  ContainerOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  EditOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  FundOutlined,
  LineChartOutlined,
  PieChartOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import color from "styles/enums/color";
import { ISeo } from "types/response/base/IBaseResponse";
import { ILayoutAttributes } from "types/response/base/ILayoutResponse";

type Props = {
  layout?: ILayoutAttributes;
  seoProps?: ISeo;
  children: React.ReactNode;
};

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("DashBoard", "", <PieChartOutlined rev={undefined} />),
  getItem("Management View", "management-view", <LineChartOutlined rev={undefined} />),
  // getItem("Prediction", "prediction", <HomeOutlined rev={undefined} />),
  getItem("History", "history", <DatabaseOutlined rev={undefined} />),
  getItem("Master Data", "data", <FileTextOutlined rev={undefined} />),
  getItem("OPE DashBoard", "ope-dashboard", <DashboardOutlined rev={undefined} />),
  getItem("Comparison", "ope-dashboard/comparison", <BarChartOutlined rev={undefined} />),
  // getItem("Loss By Step In Shift", "ope-dashboard/loss-by-step-in-shift", <ProjectOutlined rev={undefined} />),
  getItem("Detail Step", "ope-dashboard/detail-step", <FileSearchOutlined rev={undefined} />),
  getItem("Category Management", "category-management", <EditOutlined rev={undefined} />),
  getItem("Statistical", "statistical", <FundOutlined rev={undefined} />),
  getItem("Training Model", "training-model", <ContainerOutlined rev={undefined} />),
  getItem("Status CUC", "status-CUC", <ProjectOutlined rev={undefined} />),
  getItem("Loss Management", "loss-management", <DatabaseOutlined rev={undefined} />),
  getItem("Other", "other", <FileTextOutlined rev={undefined} />),
];
const PageLayout = (props: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
  const currentPath = router.pathname.split("/").slice(1).join("/");
  return (
    <>
      <Layout style={{ minHeight: "100vh", color: color.background }}>
        <title>MLTech Soft</title>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={[currentPath]}
            mode="inline"
            items={items}
            onClick={(e) => {
              router.push(`/${e.key}`);
            }}
          />
        </Sider>
        {props.children}
      </Layout>
    </>
  );
};

export default PageLayout;
