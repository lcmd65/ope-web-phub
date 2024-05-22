import { Form, Input, Modal } from "antd";
import { useState } from "react";

interface Props {
  onSubmitted: (username: string, password: string) => boolean;
  open: boolean;
  setModalOpen: Function;
}

type FieldType = {
  username?: string;
  password?: string;
};

const LoginForm = (props: Props) => {
  const onFinish = (values: any) => {
    props.onSubmitted(values.username, values.password);
    props.setModalOpen(false);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Modal
      open={props.open}
      closeIcon={null}
      onCancel={() => props.setModalOpen(false)}
      onOk={() => onFinish({ username, password })}
      style={{
        maxWidth: "80vw",
        maxHeight: "80vh",
      }}
      okText="Login"
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: "100%" }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginForm;
