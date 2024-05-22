import { Tag } from "antd";
import color from "styles/enums/color";

const TagInTable = (props: { value: string; [key: string]: any }) => {
  const { value, ...rest } = props;

  return (
    <Tag {...rest}>
      <h1
        style={{
          color: color.white,
        }}
      >
        {props.value}
      </h1>
    </Tag>
  );
};

export default TagInTable;
