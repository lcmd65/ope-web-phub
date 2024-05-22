import MixerCard, { MixerCardInterface, MixerStatus } from "./mixerCard";

const dataList: MixerCardInterface[] = Array.from({ length: 9 }).map((item, index) => {
  return {
    name: `Mixer ${index + 1}`,
    code1: `${(index + 1) * 736}`,
    code2: `${(index + 1) * 823}`,
    time: "04/07/23 09:42 +0700",
    value: 0.5,
    status: index % 3 === 0 ? MixerStatus.Safe : index % 3 === 1 ? MixerStatus.QCNeeded : MixerStatus.Waiting,
    regulatedValueRange: [0.4, 0.6],
    safeValueRange: [0.3, 0.55],
  };
});
const QualityPredictionDashBoardContent = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-[12px]">
        {dataList.map((item, index) => (
          <div key={index}>
            <MixerCard mixer={dataList[index]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QualityPredictionDashBoardContent;
