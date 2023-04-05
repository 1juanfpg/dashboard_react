import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarNav from './components/NavbarNav';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Temperature from './pages/Temperature';
import Humidity from './pages/Humidity';
import './App.scss';

function App() {
  return (
    <Router>
        <NavbarNav />
        <div className='flex'>
          <Sidebar />
          <div className='contentn w-100'>
              <Routes> 
                <Route path="/" exact={true} element={<Home />} />
                <Route path="/temp" exact={true} element={<Temperature />} />
                <Route path="/hum" exact={true} element={<Humidity/>} />
              </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
