import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { https } from "../api/config";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
const { Meta } = Card;

export default function ListMovie() {
  const [movieArr, setmovieArr] = useState([]);
  console.log("movieArr", movieArr);
  let navigate = useNavigate();
  useEffect(() => {
    https
      .get("api/QuanLyPhim/LayDanhSachPhim?maNhom=GP03")
      .then((res) => {
        console.log(res);
        setmovieArr(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="grid grid-cols-5 gap-3 py-10">
      {movieArr.splice(0, 10).map((ele, index) => {
        return (
          <Card
            onClick={() => {
              navigate(`/detail/${ele.maPhim}`);
            }}
            key={index}
            hoverable
            style={{
              width: 360,
            }}
            cover={<img alt="example" src={ele.hinhAnh} className="h-96" />}
          >
            <Meta
              className="text-center uppercase"
              title={ele.tenPhim}
              description={moment(ele.ngayKhoiChieu).format("DD-MM-YYYY")}
            />
            <button
              onClick={() => {
                navigate(`/detail/${ele.maPhim}`);
              }}
              className="btn bg-red-500 px-5 py-2 w-full text-white mt-2"
            >
              Xem chi tiết
            </button>
          </Card>
        );
      })}
    </div>
  );
}
