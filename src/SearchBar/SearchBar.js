import { Popover, Select } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import "./searchbar.scss";
import { https } from "../api/config";

export default function SearchBar() {
  const [movieList, setmovieList] = useState();
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  useEffect(() => {
    fetchData();
  }, []);
  let fetchData = async () => {
    try {
      let res = await https.get("api/QuanLyPhim/LayDanhSachPhim?maNhom=GP03");
      console.log(res);
      setmovieList(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  let renderMovieList = () => { 
    return movieList?.map((ele, index) => { 
        return <Fragment key={index}>
            <Select.Option className="text-xs font-bold" value={ele.maPhim} label={ele.tenPhim}>
                <Popover trigger="hover">
                        <div>{ele.tenPhim}</div>
                </Popover>
            </Select.Option>
        </Fragment>
     })
   }
  return (
    <div
      id="searchBar"
      style={{ zIndex: "10" }}
      className="flex items-center p-5 space-x-5  absolute rounded shadow-xl h-12 bg-white right-[42%] bottom-[50%]  "
    >
      <div>
        <Select id="timPhim" defaultValue={"Tìm phim"} onChange={handleChange} allowClear={true} showSearch={true}>
          <Select.Option value={0}>Phim</Select.Option>
          {renderMovieList()}
        </Select>
      </div>
      <div id="cumRap">
        <Select onChange={handleChange}>
          <Select.Option value={0}>Cụm rạp</Select.Option>
        </Select>
      </div>
      <div id="lichChieu">
        <Select onChange={handleChange}>
          <Select.Option value={0}>Lịch chiếu</Select.Option>
        </Select>
      </div>
      <div>
        <button>Mua vé</button>
      </div>
    </div>
  );
}
