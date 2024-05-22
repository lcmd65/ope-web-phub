import { Radio, Space } from "antd";

type Props = {
  dataReason: any;
  dataLevel2: any;
  dataLevel3: any;
  valueLevel1: any;
  valueLevel2: any;
  valueLevel3: any;
  setValueLevel1: (value: any) => void;
  setValueLevel2: (value: any) => void;
  setValueLevel3: (value: any) => void;
};

const LevelLossReasonFrame = (props: Props) => {
  const {
    dataReason,
    dataLevel2,
    dataLevel3,
    valueLevel1,
    valueLevel2,
    valueLevel3,
    setValueLevel1,
    setValueLevel2,
    setValueLevel3,
  } = props;

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col border-[1px]">
          <div className="flex justify-center bg-slate-200">
            <p className="text-[1vw] font-medium text- text-[#000000]">Level 1</p>
          </div>
          <div className="p-2">
            <Space direction="vertical">
              {dataReason.map((item: any, index: number) => (
                <Radio
                  key={index}
                  value={item._id}
                  onChange={(e) => {
                    setValueLevel1(e.target.value);
                    setValueLevel2(null);
                    setValueLevel3(null);
                  }}
                  checked={valueLevel1 === item._id}
                  className="text-[1vw]"
                >
                  {item.name}
                </Radio>
              ))}
              <Radio
                value={4}
                checked={valueLevel1 == 4}
                onChange={(e) => setValueLevel1(e.target.value)}
                className="text-[1vw]"
              >
                Lý do khác
              </Radio>
            </Space>
          </div>
        </div>
        <div className="flex flex-col border-[1px]">
          <div className="flex justify-center bg-slate-200">
            <p className="text-[1vw] font-medium text- text-[#000000]">Level 2</p>
          </div>
          {dataLevel2.length > 0 && (
            <div className="p-2">
              <Space direction="vertical">
                {dataLevel2.map((item: any, index: number) => (
                  <Radio
                    key={index}
                    value={item._id}
                    onChange={(e) => {
                      setValueLevel2(e.target.value);
                      setValueLevel3(null);
                    }}
                    checked={valueLevel2 === item._id}
                    className="text-[1vw]"
                  >
                    {item.name}
                  </Radio>
                ))}
              </Space>
            </div>
          )}
        </div>
        <div className="flex flex-col border-[1px]">
          <div className="flex justify-center bg-slate-200">
            <p className="text-[1vw] font-medium text- text-[#000000]">Level 3</p>
          </div>
          {dataLevel3.length > 0 && (
            <div className="p-2">
              <Space direction="vertical">
                {dataLevel3.map((item: any, index: number) => (
                  <Radio
                    key={index}
                    value={item._id}
                    checked={valueLevel3 === item._id}
                    onChange={(e) => setValueLevel3(e.target.value)}
                    className="text-[1vw]"
                  >
                    {item.name}
                  </Radio>
                ))}
              </Space>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LevelLossReasonFrame;
