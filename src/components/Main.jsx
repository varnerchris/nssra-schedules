import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';  
import BuildingSchedule from './buildingSchedule';


const Main = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/building" element={<BuildingSchedule />} />
    </Routes>
  );
  

  export default Main;
