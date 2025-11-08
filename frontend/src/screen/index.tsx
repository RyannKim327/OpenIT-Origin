import { Route, Routes } from "react-router";
import Header from "../component/header";
import Landing from "./landing";

export default function Screen() {
  return (
    <div className="flex flex-col w-dvw h-dvh box-border">
      <Header />
      <div className="flex flex-col w-full h-full px-2">
        <Routes>
          <Route element={<Landing />} path="/" />
        </Routes>
      </div>
    </div>
  );
}
