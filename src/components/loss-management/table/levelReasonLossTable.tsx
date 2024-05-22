import { useState } from "react";

type Props = {
  dataReason: any;
};

const LevelReasonLossTable = (props: Props) => {
  const [listLevel, setListLevel] = useState([
    {
      level: "1",
      id: null,
    },
    {
      level: "2",
      id: null,
    },
    {
      level: "3",
      id: null,
    },
  ]);
  return (
    <>
      <table style={{ width: "100%" }}>
        <tr>
          <th className="text-[1.2vw] text-[#000000] bg-slate-400 border-[1px] border-[#000000]">Level 1</th>
          <th className="text-[1.2vw] text-[#000000] bg-slate-400 border-[1px] border-[#000000]">Level 2</th>
          <th className="text-[1.2vw] text-[#000000] bg-slate-400 border-[1px] border-[#000000]">Level 3</th>
        </tr>
        {props.dataReason.map((item: any, index: number) => (
          <tr key={index}>
            <td className="text-[1.2vw] text-[#000000] border-[1px] border-[#000000]">{item.label}</td>
            <td className="text-[1.2vw] text-[#000000] border-[1px] border-[#000000]"></td>
            <td className="text-[1.2vw] text-[#000000] border-[1px] border-[#000000]"></td>
          </tr>
        ))}
        <tr>
          <td className="text-[1.1vw] text-[#000000] border-[1px] border-[#000000] p-4"></td>
          <td className="text-[1.1vw] text-[#000000] border-[1px] border-[#000000]">Tobias</td>
          <td className="text-[1.1vw] text-[#000000] border-[1px] border-[#000000]">Linus</td>
        </tr>
      </table>
    </>
  );
};

export default LevelReasonLossTable;
