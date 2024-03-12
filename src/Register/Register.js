import { https } from "../api/config";
import { Button, Checkbox, Form, Input, message } from "antd";
import bgLogin from "./bgLogin.jpg";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();
  const onFinish = (values) => {
    https
      .post("api/QuanLyNguoiDung/DangKy", values)
      .then((res) => {
        console.log(res.data.content);
        message.success("Đăng ký thành công");
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
        message.error("Tên tài khoản đã tồn tại");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        width: "100%",
        backgroundImage: `url(${bgLogin})`,
        position: "fixed",
        backgroundSize: "100%",
        height: "100%",
      }}
    >
      <Form
        className="custom-form"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div
          className="text-center text-red-500 space-y-3 mb-5"
          style={{ fontSize: 30 }}
        >
          <FontAwesomeIcon icon={faUser} />
          <h2 className=""> Register</h2>
        </div>
        <Form.Item
          label="Username"
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên tài khoản!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="matKhau"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="soDT"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Họ tên"
          name="hoTen"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ tên!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button className="bg-red-500 text-white" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
