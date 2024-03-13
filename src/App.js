import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import DetailPage from "./DetailPage/DetailPage";

import SignPage from "./SignIn/SignPage";
import Register from "./Register/Register";
import Layout from "./template/Layout";
import Booking from "./Booking/Booking";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/detail/:idPhim"
            element={
              <Layout>
                <DetailPage />
              </Layout>
            }
          />
          <Route
            path="/signin"
            element={
              <Layout>
                <SignPage />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/booking/:maLichChieu"
            element={
              <Layout>
                <Booking />
                
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
