import { Siren } from "@phosphor-icons/react";
import Clock from "components/common/frame/clock";
import { useMediaQuery } from "react-responsive";

type Props = {
  status: string;
};

const StatusMixerFrame = (props: Props) => {
  const xxl = useMediaQuery({ maxWidth: 1536 });
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[1.2vw] text-[#000000]">Trạng thái Mixer</p>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <Siren size={xxl ? 32 : 100} color={props.status == "running" ? "#00FF00" : "#FF0000"} weight="fill" />
          </div>
          <p className={props.status == "running" ? "text-[#00FF00] text-[1.1vw]" : "text-[#FF0000] text-[1.1vw]"}>
            {props.status == "running" ? "Running" : "Stopped"}
          </p>
        </div>
        <Clock />
      </div>
    </div>
  );
};

export default StatusMixerFrame;
