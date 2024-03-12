import React, { useEffect, useRef, useState } from "react";
import { https } from "../api/config";
import { Carousel } from "antd";
import SearchBar from "../SearchBar/SearchBar";

export default function Banner() {
  const [banner, setBanner] = useState([]);
  const ref = useRef();
  let getBanner = async () => {
    try {
      let res = await https.get("api/QuanLyPhim/LayDanhSachBanner");
      console.log(res);
      setBanner(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBanner();
  }, []);
  return (
    <div>
      <Carousel autoplay ref={ref} dots={false}>
        <div>
          <img
            loading="lazy"
            className="w-full aspect-auto h-80 sm:h-96 md:h-600"
            src="./image/banner/img1.jpg"
          />
        </div>
        {banner.slice(0, 2).map((ele, index) => {
          return (
            <div key={index}>
              <img
                loading="lazy"
                className=" w-full aspect-auto h-80 sm:h-96 md:h-600"
                src={ele.hinhAnh}
              />
            </div>
          );
        })}
        <div>
          <img
            loading="lazy"
            className="w-full aspect-auto h-80 sm:h-96 md:h-600"
            src="./image/banner/img2.jpg"
          />
        </div>
      </Carousel>
      <SearchBar/>
    </div>
  );
}
