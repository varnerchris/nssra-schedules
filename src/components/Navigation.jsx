import { NavLink } from 'react-router-dom';


const Navigation = () => (
    <nav>
        <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/building'>Building Schedule</NavLink></li>
            <li><NavLink to='/gators'>NSSRA Gators - Upcoming Games</NavLink></li>
        </ul>
    </nav>
);

export default Navigation;
