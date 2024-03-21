import React from "react";
import "./footer.scss";
import { NavLink, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="footer ">
      <div
        className="footer__top py-20 mt-20 "
        style={{
          background: `url(./image/footer/footer.jpg) center center / cover no-repeat`,
          height: "100%",
        }}
      >
        <div className="container grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div>
            <img
              style={{ width: 200, height: 200 }}
              src="./image/footer/imgmoviee.png"
              className="mb-4 md:mt-8"
              loading="lazy"
              alt="..."
            />
            <p>
              Business registration certificate: 0377837603, registered for the
              first time on 31/7/2008, registered for the fifth change on
              14/10/2015, issued by HCMC Department of Planning and
              Investment <br/> Address: Floor 2, Rivera Park Saigon - No. 7/28 Thanh
              Thai street, Ward 14, District 10, HCMC <br/>Hotline: 1900
              6017COPYRIGHT 2017 CJ CGV <br/> All RIGHTS RESERVED 
            </p>
          </div>
          <div>
            <h3>Terms and Conditions</h3>
            <p
              onClick={() => {
                navigate("*");
              }}
              className="hover:text-orange-500 duration-300 cursor-pointer text-lg"
            >
              Conditions of Website Use
            </p>
            <p
              onClick={() => {
                navigate("*");
              }}
              className="hover:text-orange-500 duration-300 cursor-pointer text-lg"
            >
              Terms of Use
            </p>
            <p
              onClick={() => {
                navigate("*");
              }}
              className="hover:text-orange-500 duration-300 cursor-pointer text-lg"
            >
              Payment Policy
            </p>
            <p
              onClick={() => {
                navigate("*");
              }}
              className="hover:text-orange-500 duration-300 cursor-pointer text-lg"
            >
              Privacy Policy
            </p>
          </div>
          <div className="space-y-5">
            <h3>Bài viết gần đây</h3>
            <div className="flex space-x-5 ">
              <img src="./image/highschool.jpg" style={{ width: 100 }} />
              <div>
                <p className="uppercase">
                  top 7 cuốn sách được huyển thể thành phim đáng mong đợi vào
                  mùa thu này
                </p>
                <p>April 28, 2023/0 comments</p>
              </div>
            </div>
            <hr />
            <div className="flex space-x-5 ">
              <img src="./image/highschool.jpg" style={{ width: 100 }} />
              <div>
                <p className="uppercase">
                  John Wick: Chapter 4 là một bộ phim hành động neo-noir của Mỹ
                  do Chad Stahelski đạo diễn và Shay Hatten và Michael Finch
                  viết kịch bản.
                </p>
                <p>April 28, 2023/0 comments</p>
              </div>
            </div>
          </div>
          <div>
            <h3>Customer Service</h3>
            <p>Hotline: 1900 6017</p>
            <p>
              Working hours: 8:00 - 22:00 (Monday to Sunday, including Public
              Holidays)
            </p>
            <p>Email support: hoidap@cgv.vn</p>
          </div>
          <div>
            <h3>Follow Us</h3>
            <div className="flex space-x-2">
              <NavLink to={"http://www.facebook.com"}>
                <img
                  src="./image/facebook.png"
                  style={{ width: 50, height: 50, cursor: "pointer" }}
                />
              </NavLink>
              <NavLink to={"http://www.youtube.com"}>
                <img
                  src="./image/youtube.png"
                  style={{ width: 50, height: 50, cursor: "pointer" }}
                />
              </NavLink>
              <NavLink to={"http://www.instagram.com"}>
                <img
                  src="./image/insta.jpg"
                  style={{ width: 50, height: 50, cursor: "pointer" }}
                />
              </NavLink>
              <NavLink to={"http://www.zalo.com"}>
                <img
                  src="./image/zalo.png"
                  style={{ width: 50, height: 50, cursor: "pointer" }}
                />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black py-6 w-full">
        <div className="flex justify-between px-10">
          <p>@copyright</p>
          <p>Contact us : nguyenquocdai2409@gmai.com</p>
        </div>
      </div>
    </div>
  );
}
