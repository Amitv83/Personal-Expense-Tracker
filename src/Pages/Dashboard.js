import { useNavigate} from "react-router-dom"

function Dashboard() {
    const navigate = useNavigate();
    return (
        <>
        <div> Dashboard Page </div>
        <button className="add-transaction" onClick={()=>navigate("/add-transaction")}> + Add Transaction </button>
        </>
    )
}

export default Dashboard