import { Route, Routes } from "react-router";
import Header from "../component/header";
import Landing from "./landing";
import Login from "../layout/login";
import SignUp from "../layout/register";
import Map from "../screen/map";
import Report from "./report";
import About from "./about";

export default function Screen() {
  return (
    <div className="flex flex-col w-dvw min-h-dvh">
      <Header />
      <div className="flex flex-col w-full flex-1">
        <Routes>
          <Route element={<Landing />} path="/" />
          <Route element={<Map />} path="/map" />
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />
          <Route element={<Report />} path="/report" />
          <Route element={<About />} path="/about" />
        </Routes>
      </div>
    </div>
  );
}
