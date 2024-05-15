// Navigation.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { routeData } from "./Main"; // Importing routeData from Main.jsx

const Navigation = () => (
  <nav>
    <ul>
      {routeData.map((item, index) => (
        <li key={index}>
          <NavLink to={item.path}>{item.title}</NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;
