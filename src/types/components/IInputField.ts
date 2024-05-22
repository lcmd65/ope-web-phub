import { FormikErrors } from "formik";

interface IInputField extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  title: string;
  name: string;
  renderItem?: () => any;
  handleChange: any;
  errors: any;
  touched: any;
}

interface ITextAreaField
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  title: string;
  name: string;
  value: string | undefined;
  renderItem?: () => any;
  handleChange: any;
  errors: any;
  touched: any;
}

interface ISelectField
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  title: string;
  name: string;
  value: string | number;
  renderItem: () => any;
  handleChange: any;
  errors: any;
  touched: any;
}

interface ISelectFilterField
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  title: string;
  name: string;
  value: string;
  renderItem: () => any;
  handleChange: any;
  errors: any;
  touched: any;
  default_item: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<any>>;
}

export type { IInputField, ISelectField, ITextAreaField, ISelectFilterField };
