import { Tabs, TabsProps } from "antd";
import PullDataADX from "./dataADX/pullDataADX";

export const StatisticalTabView = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Pull data ADX",
      children: <PullDataADX />,
    },
  ];

  const onChange = (key: string) => {};

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};
