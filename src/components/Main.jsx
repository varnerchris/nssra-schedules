import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import BuildingSchedule from "./buildingSchedule";
import GatorEvents from "./gators";

export const routeData = [
  { path: "/", title: "Home" },
  { path: "/building", title: "Building Schedule" },
  { path: "/gators", title: "NSSRA Gators - Upcoming Games" },
];

const Main = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/building" element={<BuildingSchedule />} />
    <Route path="/gators" element={<GatorEvents />} />
  </Routes>
);

export default Main;
