import { Route, Routes } from "react-router";
import Header from "../component/header";
import Landing from "./landing";
import Login from "../layout/login";
import SignUp from "../layout/register";
import Map from "../screen/map";
export default function Screen() {
  return (
    <div className="flex flex-col w-full h-dvh box-border">
      <Header />
      <div className="flex flex-col w-full h-full">
        <Routes>
          <Route element={<Landing />} path="/" />
          <Route element={<Map />} path="/map" />
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />
        </Routes>
      </div>
    </div>
  );
}
