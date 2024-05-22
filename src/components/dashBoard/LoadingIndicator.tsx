import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const LoadingIndicator = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 99,
      }}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin rev={undefined} />} />
    </div>
  );
};

export default LoadingIndicator;
