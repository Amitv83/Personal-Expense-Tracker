
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard.js';
import Transaction from './Pages/Transaction.js';
import Reports from './Pages/Reports.js';
import Navbar from './Components/Navbar.js';
import Notfound from './Pages/NotFound.js';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element = {<Dashboard/>}/>
          <Route path="/report" element = {<Reports/>}/>
          <Route path="/transaction" element = {<Transaction/>}/>
          <Route path="*" element = {<Notfound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
