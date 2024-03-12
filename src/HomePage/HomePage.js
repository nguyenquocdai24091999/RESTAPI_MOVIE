import React from "react";
import ListMovie from "./ListMovie";
import TabMovie from "./TabMovie/TabMovie";
import Banner from "../Banner/Banner";
import Footer from "../components/Footer/Footer";

export default function HomePage() {
  return (
    <div>
      <Banner/>
      <ListMovie />
      <TabMovie />
      <Footer/>
    </div>
  );
}
