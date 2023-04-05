import { NavLink } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';

const Sidebar = () =>{
    return(
        <div className="sidebar">
            <ul>
                <li>
                    <NavLink to="/" activeClassName="active" className="round w-100 d-inline-block px-2">
                        <FaIcons.FaHome className='me-2'/>Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/temp" activeClassName="active" className="round w-100 d-inline-block px-2">
                        <FaIcons.FaThermometerQuarter className='me-2'/>Temperatura
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/hum" activeClassName="active" className="round w-100 d-inline-block px-2">
                        <FaIcons.FaTint className='me-2'/>Humedad
                    </NavLink>
                </li>
            </ul>
        </div>
    )

}

export default Sidebar
