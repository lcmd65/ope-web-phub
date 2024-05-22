import { Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { ILayoutAttributes } from "types/response/base/ILayoutResponse";
import { getImageUrl } from "utilities/function/getImageUrl";

type Props = {
  data: ILayoutAttributes["nav_bar"];
};

const MenuInline = (props: Props) => {
  const items = props.data.filter((item) => item.status);

  return (
    <div className="h-full w-80">
      <Menu mode="inline" className="h-full" theme="light">
        {items.map((item, index) => (
          <Menu.SubMenu key={item.title} title={item.title}>
            {item.childs
              .filter((item) => item.status)
              .map((item) => (
                <>
                  <Menu.Item
                    key={item.href}
                    icon={
                      item.icon?.data && (
                        <div className="w-[60px] m-2">
                          <Image height={60} width={60} src={getImageUrl(item.icon?.data?.attributes?.url)} alt="" />
                        </div>
                      )
                    }
                  >
                    <Link href={item.href}>
                      <p>{item.title}</p>
                    </Link>
                  </Menu.Item>
                </>
              ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    </div>
  );
};

export default MenuInline;
