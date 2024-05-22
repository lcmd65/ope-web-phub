import { Select } from "antd";

const Selector = (props: {
  mode?: "multiple" | "tags" | undefined;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  value?: any;
  defaultValue?: any;
  onSearch?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) => {
  const { options, onChange, placeholder, onSearch } = props;

  return (
    <Select
      disabled={props.disabled}
      style={{ width: "100%" }}
      mode={props.mode}
      showSearch
      placeholder={placeholder ?? "Select a item"}
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch ?? undefined}
      filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
      options={options}
      size="large"
      value={props.value}
      defaultValue={props.defaultValue}
    />
  );
};

export default Selector;
