import React, { useEffect, useState } from "react";
import { https } from "../../api/config";
import { Tabs, Tooltip } from "antd";
import ItemMovie from "./ItemMovie";

export default function TabMovie() {
  const [heThongRap, setHeThongRap] = useState([]);
  useEffect(() => {
    https
      .get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP03`)
      .then((res) => {
        console.log(res);
        setHeThongRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let renderHeThong = () => {
    return heThongRap.map((ele, index) => {
      return {
        key: index,
        label: <img src={ele.logo} style={{ width: 50 }} />,
        children: (
          <Tabs
            style={{
              height: 500,
              border: 2,
            }}
            tabPosition="left"
            items={ele.lstCumRap.map((cumRap, indexCumRap) => {
              return {
                key: indexCumRap,
                label: (
                  <div className="w-96 truncate text-left">
                    <Tooltip>
                      <p className="text-green-500 uppercase">
                        {cumRap.tenCumRap}
                      </p>
                      <p>{cumRap.diaChi}</p>
                    </Tooltip>
                  </div>
                ),
                children: (
                  <div className="space-x-5"
                  style={{height: 500, overflow: "scroll"}}>
                    {cumRap.danhSachPhim.map((phim) => {
                      return <ItemMovie data={phim} key={phim.maPhim} />;
                    })}
                  </div>
                ),
              };
            })}
          />
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
      <Tabs
        className="container border-2 border-gray-100"
        tabPosition="left"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
}
