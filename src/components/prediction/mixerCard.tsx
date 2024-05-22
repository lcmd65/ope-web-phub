import color from "styles/enums/color";

enum MixerStatus {
  Safe = "Safe",
  QCNeeded = "QC Needed",
  Waiting = "Waiting",
}
interface MixerCardInterface {
  name: string;
  code1: string;
  code2: string;
  time: string;
  value: number;
  status: MixerStatus;
  regulatedValueRange: number[];
  safeValueRange: number[];
}

const MixerValueContainer = (props: { children: React.ReactNode; [key: string]: any }) => {
  const { value, ...rest } = props;
  return (
    <div
      style={{
        padding: "0px",
        border: `2px solid ${color.black}`,
        borderRadius: "4px",
        ...rest,
      }}
    >
      {props.children}
    </div>
  );
};

const MixerCard = (props: { mixer: MixerCardInterface }) => {
  const statusColor =
    props.mixer.status === MixerStatus.Safe
      ? color.green
      : props.mixer.status === MixerStatus.QCNeeded
      ? color.error
      : props.mixer.status === MixerStatus.Waiting
      ? color.silver
      : color.silver;
  return (
    <div
      style={{
        width: "100%",
        border: `1px solid ${color.black}`,
        borderRadius: "4px",
        // padding: "12px",
        boxSizing: "border-box",
        // backgroundColor: color.white,
      }}
    >
      <div
        className="flex justify-evenly "
        style={{
          padding: "6px",
          backgroundColor: color.lightGray,
          borderTopRightRadius: "4px",
          borderTopLeftRadius: "4px",
        }}
      >
        <h2>{props.mixer.name}</h2>
        <h2>{props.mixer.code1}</h2>
        <h2>{props.mixer.code2}</h2>
      </div>
      <div className=" flex justify-center" style={{ padding: "6px", backgroundColor: color.gray }}>
        <h2>{props.mixer.time}</h2>
      </div>
      <div className=" flex justify-evenly " style={{ padding: "6px", backgroundColor: color.lightGray }}>
        <MixerValueContainer width="100%" backgroundColor={statusColor}>
          <h2 className="text-center">{props.mixer.value}</h2>
        </MixerValueContainer>
        <h2 className="flex flex-col w-full text-center justify-center" style={{ color: statusColor }}>
          {props.mixer.status}
        </h2>
      </div>
      <div style={{ padding: "6px", backgroundColor: color.gray }}>
        <h2 className="text-center">Giá trị quy định</h2>
      </div>
      <div className="flex justify-evenly" style={{ padding: "6px", backgroundColor: color.lightGray }}>
        {props.mixer.regulatedValueRange.map((item, index) => (
          <h2 key={index}>{item}</h2>
        ))}
      </div>
      <div style={{ padding: "6px", backgroundColor: color.gray }}>
        <h2 className="text-center">Giá trị an toàn</h2>
      </div>
      <div
        className="flex justify-evenly"
        style={{
          padding: "6px",
          backgroundColor: color.lightGray,
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
        }}
      >
        {props.mixer.safeValueRange.map((item, index) => (
          <h2 key={index} style={{ color: statusColor }}>
            {item}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default MixerCard;
export { MixerStatus };
export type { MixerCardInterface };
