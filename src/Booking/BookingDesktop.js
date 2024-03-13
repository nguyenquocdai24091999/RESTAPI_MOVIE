import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../api/config";
import clsx from "clsx";
import "./booking.scss";
import { useSelector } from "react-redux";
import { message } from "antd";
import { localServices } from "../Services/localServices";

export default function BookingDesktop() {
  const params = useParams();
  const [thongTinDatVe, setThongTinDatVe] = useState([]);
  const [gheDuocChon, setgheDuocChon] = useState([]);
  //   console.log(params);
  console.log("=>>>>", gheDuocChon);
  const fetchAPI = async () => {
    try {
      let result = await https.get(
        `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${params.maLichChieu}`
      );
      console.log(result);
      setThongTinDatVe(result.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  //===> process booking <===//
  const handleBooking = async (payload) => {
    try {
      const response = await https.post("api/QuanLyDatVe/DatVe", payload);
      if (response.status === 200) {
        message.success("booking successfully!");
        //** do some thing else here EXAMPLE: navigate to thank you page or home blabla .... */
        setgheDuocChon([]);
        fetchAPI();
      }
    } catch (err) {
      message.error("booking faild please try again!");
    }
  };

  const handleSelected = (chair) => {
    const findChair = gheDuocChon.find((ele) => ele.maGhe === chair.maGhe);
    if (findChair) {
      const filterData = gheDuocChon.filter((ele) => ele.maGhe !== chair.maGhe);
      setgheDuocChon(filterData);
    } else {
      setgheDuocChon([...gheDuocChon, chair]);
    }
  };

  let renderGhe = () => {
    return thongTinDatVe.danhSachGhe?.map((ghe, index) => {
      //   console.log(ghe);
      return (
        <button
          onClick={() => {
            handleSelected(ghe);
          }}
          key={index}
          className={clsx("ghe", {
            gheVip: ghe.loaiGhe === "Vip",
            gheDuocChon: ghe.daDat,
            gheDangChon: gheDuocChon.some((ele) => ele.maGhe === ghe.maGhe),
          })}
        >
          {ghe.tenGhe}
        </button>
      );
    });
  };

  let user = useSelector((state) => state.userReducer.userLogin);
  if (!localServices.get()) {
    return (window.location.href = "/signin");
  }
  return (
    <div
      style={{
        backgroundColor: `rgb(10, 32, 41)`,
      }}
    >
      <div style={{ width: "100%", position: "relative", height: "80vh" }}>
        <div
          className="absolute top-0 left-0 right-0 bottom-0"
          style={{
            background: `url(${thongTinDatVe?.thongTinPhim?.hinhAnh}) top center/ cover no-repeat`
          }}
        ></div>
        <div
          className="absolute top-0 left-0 right-0 bottom-0"
          style={{
            background:
              "linear-gradient(to top, rgb(6, 18, 30), transparent 100%)",
          }}
        ></div>
      </div>
      <div className="" style={{ background: "#081418",}}>
        <div className="container py-10">
          <div className="grid grid-cols-12">
            <div
              className="col-span-8"
              style={{
                width: "90%",
                boxSizing: "border-box",
                display: "block",
              }}
            >
              <div
                style={{
                  width: "79.9%",
                  boxSizing: "border-box",
                  margin: "auto",
                  display: "block",
                }}
              >
                {renderGhe()}
              </div>
            </div>
            <div className="col-span-4 space-y-5">
              <h3 className="text-center text-green-500 text-2xl">
                {gheDuocChon
                  .reduce((tongTien, ghe, index) => {
                    return (tongTien += ghe.giaVe);
                  }, 0)
                  .toLocaleString()}{" "}
                đồng
              </h3>
              <hr />
              <div className="flex justify-between">
                <h3 className="text-xl">Địa chỉ</h3>
                <h3 className="text-xl text-green-500">
                  {thongTinDatVe.thongTinPhim?.diaChi}
                </h3>
              </div>
              <hr />
              <div className="flex justify-between">
                <h3 className="text-xl">Rạp</h3>
                <h3 className="text-xl text-green-500">
                  {thongTinDatVe.thongTinPhim?.tenRap}
                </h3>
              </div>
              <hr />
              <div className="flex justify-between">
                <h3 className="text-xl">Ngày giờ chiếu: </h3>
                <h3 className="text-xl text-green-500">
                  {thongTinDatVe.thongTinPhim?.ngayChieu} ~{" "}
                  <span className="text-red-500">
                    {thongTinDatVe.thongTinPhim?.gioChieu}
                  </span>
                </h3>
              </div>
              <hr />
              <div className="flex justify-between">
                <h3 className="text-xl">Tên phim: </h3>
                <h3 className="text-xl text-green-500">
                  {thongTinDatVe.thongTinPhim?.tenPhim}
                </h3>
              </div>
              <hr />
              <div className="flex justify-between">
                <h3 className="text-xl">Chọn: </h3>
                <div className="text-xl">
                  {gheDuocChon.map((ghe, index) => {
                    return (
                      <span
                        key={index}
                        style={{ fontSize: "20px" }}
                        className={`ghe gheDangChon`}
                      >
                        {" "}
                        Ghế {ghe.tenGhe}
                      </span>
                    );
                  })}
                </div>
              </div>
              <hr />
              <div className="text-green-500">
                <i>Email : </i>
                {user.email}
              </div>
              <div className="text-green-500">
                <i>Phone : </i>
                {user.soDT}
              </div>
              <div>
                <button
                  onClick={() => {
                    const payload = {
                      maLichChieu: thongTinDatVe?.thongTinPhim?.maLichChieu,
                      danhSachGhe: gheDuocChon.map((chair) => ({
                        maGhe: chair.maGhe,
                        giaVe: chair.giaVe,
                      })),
                    };
                    handleBooking(payload);
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white py-5 w-full"
                >
                  ĐẶT VÉ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
