import React from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { localServices } from "../../Services/localServices";
import "./header.scss"

export default function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.userLogin);
  console.log(user);
  let renderMenu = () => {
    if (user) {
      return (
        <>
          <span className="btn-theme font-medium text-dark hover:text-orange-500 cursor-pointer">
            {user.taiKhoan}
          </span>
          <button
            onClick={() => {
              window.location.href = "/signin";
              localServices.remove();
            }}
            className="btn-theme hover:text-orange-500"
          >
            Sign Out
          </button>
        </>
      );
    } else {
      return (
        <>
          <div>
            <button
              onClick={() => {
                window.location.href = "/signin";
              }}
              className="btn-theme hover:text-orange-500"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                window.location.href = "/signin";
              }}
              className="btn-theme hover:text-orange-500"
            >
              Sign Out
            </button>
          </div>
        </>
      );
    }
  };
  return (
    <div className="flex justify-between shadow-md space-y-5 items-center">
      <span
        onClick={() => {
          navigate("/");
        }}
        style={{ fontSize: "30px", cursor: "pointer" }}
        className="text-red-500 font-medium ml-10"
      >
        {" "}
        Movie Theater{" "}
      </span>
      <div className="uppercase space-x-5 font-bold" id="header">
        <ul className="flex space-x-8 navbar">
          <li className="hover:text-orange-500 cursor-pointer">
            <a href="">lịch chiếu</a>
          </li>
          <li className="hover:text-orange-500 cursor-pointer">
            <a href="">cụm rạp</a>
          </li>
          <li className="hover:text-orange-500 cursor-pointer">
            <a>tin tức</a>
          </li>
          <li className="hover:text-orange-500 cursor-pointer">
            <a href="">liên hệ</a>
          </li>
        </ul>
      </div>
      <div className="mb-10 mr-10 space-x-5 uppercase">{renderMenu()}</div>
    </div>
  );
}
