import { Checkbox, Divider } from "antd";

type Props = {
  keyStepInfoList: any[];
  selectStepList: any[];
  onSelectStep: (e: any) => void;
  onCheckAllChange: (e: any) => void;
};

const CheckboxBox = (props: Props) => {
  const { keyStepInfoList, selectStepList, onSelectStep, onCheckAllChange } = props;
  const checkAll = keyStepInfoList.length === selectStepList.length;
  const indeterminate = selectStepList.length > 0 && selectStepList.length < keyStepInfoList.length;

  return (
    <div className="p-4 h-[80vh] min-w-[12vw] overflow-y-scroll border-2 ">
      {keyStepInfoList.length === 0 ? (
        <div className="flex justify-center items-center h-full w-full">
          <p className="text-center text-[#000000]">No data</p>
        </div>
      ) : (
        <div>
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            All step
          </Checkbox>
          <Divider className="m-2" />
          {keyStepInfoList.map((item) => (
            <Checkbox
              key={item.key}
              onChange={(e) => onSelectStep(e)}
              value={item.key}
              checked={selectStepList.includes(item.key)}
            >
              {item.value}
            </Checkbox>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxBox;
