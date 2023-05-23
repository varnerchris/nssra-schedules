import { NavLink } from 'react-router-dom';


const Navigation = () => (
    <nav>
        <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/building'>Building Schedule</NavLink></li>
        </ul>
    </nav>
);

export default Navigation;
