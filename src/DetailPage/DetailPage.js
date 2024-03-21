import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { https } from "../api/config";
import moment from "moment";
import { Progress, Rate, Tabs, Tooltip } from "antd";
import { Modal } from "react-responsive-modal";
import ReactPlayer from "react-player";
import "react-responsive-modal/styles.css";
import "./info.scss";
import { useSelector } from "react-redux";

export default function DetailPage() {
  const params = useParams();
  console.log("params", params);
  const navigate = useNavigate();
  const [detail, setDetail] = useState([]);
  const [open, setOpen] = useState(false);
  const [heThongRap, setHeThongRap] = useState();
  const user = useSelector((state) => state.userReducer.userLogin);
  console.log("user", user);

  const onOpenModal = () => setOpen(true, console.log("ok"));
  const onCloseModal = () => setOpen(false);
  useEffect(() => {
    https
      .get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${params.idPhim}`)
      .then((res) => {
        console.log(res.data.content);
        setHeThongRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    https
      .get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${params.idPhim}`)
      .then((res) => {
        console.log(res);
        setDetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.idPhim]);
  let renderHeThong = () => {
    return heThongRap?.heThongRapChieu?.map((htr, index) => {
      return {
        key: index,
        label: (
          <img
            src={htr.logo}
            width={100}
            className="hover:animate-pulse duration-1000"
            alt={htr.logo}
          />
        ),
        children: (
          <div>
            {htr.cumRapChieu.map((ele, index) => {
              return (
                <div key={index} className="py-5 pr-5">
                  <div className="md:flex items-center pb-3 border-b-2 border-zinc-200">
                    <img
                      src={ele.hinhAnh}
                      width={100}
                      className="py-3"
                      alt={ele.hinhAnh}
                    />
                    <div className="m-4">
                      <h2 className="text-3xl font-semibold mb-4">
                        {ele.tenCumRap}
                      </h2>
                      <p style={{ color: "#9B9B9B" }}>{ele.diaChi}</p>
                    </div>
                  </div>
                  {ele.lichChieuPhim.slice(0, 10).map((gioChieu, index) => {
                    return (
                      <NavLink
                        key={index}
                        to={
                          user ? `/booking/${gioChieu.maLichChieu}` : `/signin`
                        }
                      >
                        <div
                          id="btnDatVe"
                          style={{
                            borderColor: "#e4e4e4",
                            backgroundColor: `rgba(246,246,246,0.5)`,
                          }}
                          className="font-semibold px-3 py-1 text-center border duration-300 hover:scale-110 cursor-pointer"
                        >
                          <span className="text-gray-400">
                            {moment(detail.ngayChieuGioChieu).format("LL")}
                          </span>
                          <span> - </span>
                          <span className="text-green-500 duration-300 gioChieu">
                            {moment(detail.ngayChieuGioChieu).format("LT")}
                          </span>
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ),
      };
    });
  };
  const onChange = (key) => {
    console.log(key);
  };
  const items = renderHeThong();
  return (
    <div>
      <div
        style={{
          backgroundColor: `rgb(10, 32, 41)`,
        }}
      >
        <div style={{ width: "100%", position: "relative", height: "80vh" }}>
          <div
            className="absolute top-0 left-0 right-0 bottom-0"
            style={{
              background: `url(${detail.hinhAnh}) top center/ cover no-repeat`,
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
        <div className=" pt-40 pb-80 md:pt-80 md:pb-40" style={{ background: "#081418" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10" id="detailMovieDesktop">
            <div>
              <img
                loading="lazy"
                src={detail.hinhAnh}
                style={{ width: "100%", borderRadius: "3%" }}
                className="rounded-md hover:animate-pulse duration-500"
                alt={detail.hinhAnh}
              />
              <div>
                <button
                  className="w-full py-3 mt-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-400 duration-300"
                  onClick={onOpenModal}
                >
                  Trailer
                </button>
                <Modal
                  open={open}
                  styles={{
                    modal: {
                      width: "100%",
                      height: "80%",
                      padding: "0px",
                      background: "transparent",
                      margin: 0,
                      maxWidth: "950px",
                    },
                    overlay: {
                      background: "rgba(0,0,0,0.8)",
                    },
                  }}
                  onClose={onCloseModal}
                  closeIcon={<i className="fa-solid fa-x text-white"></i>}
                  center
                >
                  <ReactPlayer
                    controls={true}
                    url={detail.trailer}
                    width="100%"
                    height="100%"
                  />
                </Modal>
              </div>
            </div>
            <div className="col-span-2 text-white md:flex">
              <div className="space-y-7" style={{ fontSize: "20px" }}>
                <div className="grid grid-cols-3  gap-1">
                  <p> -Tên phim : </p>
                  <p className="col-span-2"> {detail.tenPhim} </p>
                </div>
                <div className="grid grid-cols-3  gap-1">
                  <p>- Ngày Chiếu :</p>
                  <p>{moment(detail.ngayKhoiChieu).format("DD-MM-YYYY")}</p>
                </div>
                <div className="grid grid-cols-3  gap-1">
                  <p>- Giờ Chiếu :</p>
                  <p>{moment(detail.ngayKhoiChieu).format("hh:mm:ss")}</p>
                </div>
                <div>
                  <p>- Tóm tắt : </p>
                  <p className="col-span-2 mt-5"> {detail.moTa}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start">
              <Progress
                strokeColor={"orange"}
                type="circle"
                percent={detail.danhGia * 10}
                format={(percent) => (
                  <span className="text-orange-500">{percent}</span>
                )}
              />
              <Rate className="mt-4" allowHalf value={detail.danhGia / 2} />
            </div>
          </div>
          <div id="tabs">
            <Tabs
            id="cumRapChieu"
              className="container border-2 border-gray-100"
              tabPosition="left"
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
