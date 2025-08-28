import { Link, useLocation , useNavigate} from "react-router-dom"
import '../styles/Navbar.css'
import { useState, useEffect} from "react";

function Navbar(){
    const location=useLocation();
    const [quote, setQuote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(()=>{

    },[location])

    const navigate=useNavigate();
    const handleReset=()=>{
        localStorage.clear();
        navigate("/");
    }

    const fetchQuote=async()=>{
        try {
            const response=await fetch('https://quotes-api-self.vercel.app/quote');
            const data=await response.json();
            console.log(data);
            setQuote(data.quote);
            setIsModalOpen(true);
            
        } catch (error) {
            console.log(error);
            
        }
       
    }

    return(
    <nav className="navbar">
        <h1 className="logo">Expense Tracker</h1>
        <ul className="nav-links">
            <li className={location.pathname==="/"? "active":""}>
                <Link to={"/"}>📊Dashboard</Link>
            </li>
            <li className={location.pathname==="/report"? "active":""}>
                <Link to={"/report"}>📒Reports</Link>
            </li>
            <li className={location.pathname==="/transaction"? "active":""}>
                <Link to={"/transaction"}>📜Transaction</Link>
            </li>
            <li>
                <button className="quote-btn" onClick={fetchQuote}>💡Get Quote</button>
            </li>
            <li className={location.pathname==="/"? "active":""}>
                <button onClick={handleReset}>🔄️Reset</button>
            </li>
        </ul>
        {
        isModalOpen &&(
            <div className="modal-overlay">
                <div className="modal-content">
                    <p>{quote}</p>
                    <button className="bg-red-700 text-white px-7 py-2 my-3" onClick={()=>setIsModalOpen(false)}>Close</button>
                </div>
            </div>
        )
      }
    </nav>
    )
}

export default Navbar