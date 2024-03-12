import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { https } from "../api/config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import bgLogin from "./bgLogin.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { loginAction } from "../redux/action/user";
import { localServices } from "../Services/localServices";
import { setUserLogin } from "../redux/reducer/userReducer";
const SignIn = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const onFinishv2 = (values) => {
    console.log("Success:", values);
    https
      .post("api/QuanLyNguoiDung/DangNhap", values)
      .then((res) => {
        console.log(res.data.content);
        message.success("đăng nhập thành công");
        navigate("/");
        dispatch(setUserLogin(res.data.content))
        localServices.set(res.data.content);
      })
      .catch((err) => {
        console.log(err);
        message.error("đăng nhập thất bại");
      });
  };
  const onFinish = (values) => {
    dispatch(loginAction(values, navigate));
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
        className="custom-form space-y-10"
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
        onFinish={onFinishv2}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div
          className="text-center text-red-500 space-y-3 mb-3"
          style={{ fontSize: 30 }}
        >
          <FontAwesomeIcon icon={faUser} />
          <h2 className=""> Sign in</h2>
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
          className="text-right"
          style={{
            fontSize: "20px",
          }}
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <span
            onClick={() => {
              window.location.href = "/register";
            }}
            className=" text-blue-600 font-medium cursor-pointer"
          >
            Bạn chưa có tài khoản? Hãy tạo tài khoản
          </span>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button className="bg-red-500 w-full text-white" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SignIn;
