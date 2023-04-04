import { Link } from 'react-router-dom'
const Sidebar = () =>{
    return(
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/temp">
                        Temperatura
                    </Link>
                </li>
                <li>
                    <Link to="/hum">
                        Humedad
                    </Link>
                </li>
            </ul>
        </div>
    )

}

export default Sidebar
