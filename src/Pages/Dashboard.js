import { useNavigate} from "react-router-dom"

function Dashboard() {
    const navigate = useNavigate();
    return (
        <>
        <div className="flex flex-row justify-between items-center p-2 m-7"> 
            <div className="text-2xl font-bold"> Dashboard </div>
            <div>
               <button className="p-3 rounded-md border-2 bg-red-500 hover:bg-red-700 hover:text-white transition delay-50" onClick={()=>navigate("/add-transaction")}> + Add Transaction </button>
            </div>
        </div>
        <div>
            
        </div>
        </>
    )
}

export default Dashboard