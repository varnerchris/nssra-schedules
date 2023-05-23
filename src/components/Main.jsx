import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import BuildingSchedule from './buildingSchedule';
import GatorEvents from './gators';


const Main = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/building" element={<BuildingSchedule />} />
      <Route path="/gators" element={<GatorEvents />} />
    </Routes>
  );
  
  export default Main;
