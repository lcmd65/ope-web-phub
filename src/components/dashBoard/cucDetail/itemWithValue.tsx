import { Tag } from "antd";
import color from "styles/enums/color";
import { CUCInfo } from "./cucDetailCard";
import TextCard from "./textCard";

const ItemWithValue = (props: { item: CUCInfo; key: any }) => {
  return (
    <div>
      <p
        style={{
          color: color.black,
        }}
      >
        {props.item.category}
      </p>
      {props.item.type === "text" ? (
        <TextCard value={props.item.value} />
      ) : (
        <Tag className="my-[12px]" color="blue">
          {props.item.value}
        </Tag>
      )}
    </div>
  );
};

export default ItemWithValue;
