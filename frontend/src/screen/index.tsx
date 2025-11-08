import { Route, Routes } from "react-router";
import Header from "../component/header";
import Landing from "./landing";
import Login from "../layout/login";
import SignUp from "../layout/register";
import MapView from "../screen/map";
import Report from "./report";

export default function Screen() {
  return (
    <div className="flex flex-col w-dvw h-dvh overflow-hidden">
      <Header />
      <div className="flex flex-col w-full h-full">
        <Routes>
          <Route element={<Landing />} path="/" />
          <Route element={<MapView />} path="/map" />
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />
          <Route element={<Report />} path="/report" />
        </Routes>
      </div>
    </div>
  );
}
