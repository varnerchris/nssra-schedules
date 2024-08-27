import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import BuildingSchedule from "./buildingSchedule";
import GatorEvents from "./gators";
import DisplayEvents from "./events";

export const routeData = [
  { path: "/", title: "Home" },
  { path: "/building", title: "Building Schedule" },
  { path: "/gators", title: "NSSRA Gators - Upcoming Games" },
  { path: "/events", title: "Special Events" },
];

const Main = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/building" element={<BuildingSchedule />} />
    <Route path="/gators" element={<GatorEvents />} />
    <Route path="/events" element={<DisplayEvents />} />
  </Routes>
);

export default Main;
