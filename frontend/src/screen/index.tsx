import { Route, Routes } from "react-router";
import Header from "../component/header";
import Landing from "./landing";
import Login from "../layout/login";
import SignUp from "../layout/register";
import Map from "../screen/map";
import Index from "./dashboard";
import Analytics from "./dashboard/analytics";
import Earthquakes from "./dashboard/earthquakes";
import Reports from "./dashboard/reports";
import Notification from "./dashboard/notification";

import MapView from "../screen/map";
import Report from "./report";
import About from "./about";

export default function Screen() {
  return (
    <div className="flex flex-col w-full h-dvh box-border">
      <Header />
      <div className="flex flex-col w-full overflow-y-scroll overflow-x-hidden">
        <Routes>
          <Route element={<Landing />} path="/" />
          <Route element={<MapView />} path="/map" />
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />
          <Route element={<Report />} path="/report" />
          <Route element={<About />} path="/about" />



          <Route path="dashboard">
            <Route index element={<Index/>}/>
            <Route path="analytics" element={<Analytics/>}/>
            <Route path="earthquakes" element={<Earthquakes/>}/>
            <Route path="reports" element={<Reports/>}/>
            <Route path="notifications" element={<Notification/>}/>
          </Route>
        </Routes>
      </div>
    </div>
  );
}
