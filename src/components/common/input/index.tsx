import { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import { IInputField, ISelectField, ISelectFilterField, ITextAreaField } from "types/components/IInputField";

const InputField = (props: IInputField) => (
  <>
    <label htmlFor={props.name} className="font-medium text-neutral">
      {props.title}
    </label>
    <input
      {...props}
      type={props.type}
      className="pl-2.5 py-2 pr-2 flex text-sm text-gray-500 transition-all duration-300 bg-white border border-gray-300 rounded shadow-sm focus:outline-none hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
      name={props.name}
      id={props.name}
      value={props.value}
      onChange={props.handleChange}
    />
    {props.errors && props.touched && <p className="px-2 text-sm text-red-500">{props.errors}</p>}
  </>
);

const TextAreaField = (props: ITextAreaField) => (
  <>
    <label htmlFor={props.name} className="text-[#000000]">
      {props.title}
    </label>
    <textarea
      {...props}
      className=" pl-2.5 py-2 min-h-[100px] pr-2 flex text-sm text-gray-500 transition-all duration-300 bg-white border border-gray-300 rounded shadow-sm focus:outline-none hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
    />

    {props.errors && props.touched && <p className="px-2 text-sm text-red-500">{props.errors}</p>}
  </>
);

const SelectField = (props: ISelectField) => (
  <>
    <label htmlFor={props.name} className="text-[#000000]">
      {props.title}
    </label>
    <select
      {...props}
      name={props.name}
      className="pl-2.5 py-2 pr-2 flex text-sm text-gray-500 transition-all duration-300 bg-white border border-gray-300 rounded shadow-sm focus:outline-none hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
      value={props.value}
      onChange={props.handleChange}
    >
      {props.renderItem()}
    </select>
    {props.errors && props.touched && <p className="px-2 text-sm text-red-500">{props.errors}</p>}
  </>
);

const SelectFilterField = (props: ISelectFilterField) => {
  const [value, setValue] = useState(null);
  const options = props.renderItem();

  useEffect(
    () => {
      if (Array.isArray(props.default_item)) setValue(props.default_item[0]);
    },
    // eslint-disable-next-line
    [props.default_item],
  );
  const handleChange = (value: { label: string; value: string; disabled: boolean } | any) => {
    props.setFieldValue(props.name, value.value);
    setValue(value);
  };

  return (
    <>
      <label htmlFor={props.name} className="font-medium text-neutral">
        {props.title}
      </label>
      <Select
        primaryColor="blue"
        searchInputPlaceholder="Tìm kiếm"
        placeholder={props.placeholder}
        isSearchable={true}
        value={value}
        onChange={handleChange}
        options={options}
      />
      {props.errors && props.touched && <p className="px-2 text-sm text-red-500">{props.errors}</p>}
    </>
  );
};

export { InputField, SelectField, SelectFilterField, TextAreaField };
