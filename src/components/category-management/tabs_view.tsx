import { Tabs, TabsProps } from "antd";
import CategoryManagement from "./category/category-management";
import MixerCategoryManagement from "./mixer-category-management/mixer-category-management";
import MixerManagement from "./mixer/mixer-management";
import PhManagement from "./ph-management/ph-management";

export const CategoryManagementTabView = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Mixer Management",
      children: <MixerManagement />,
    },
    {
      key: "2",
      label: "Category Management",
      children: <CategoryManagement />,
    },
    {
      key: "3",
      label: "Mixer Category Management",
      children: <MixerCategoryManagement />,
    },
    {
      key: "4",
      label: "pH Management",
      children: <PhManagement />,
    },
  ];

  const onChange = (key: string) => {};

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};
