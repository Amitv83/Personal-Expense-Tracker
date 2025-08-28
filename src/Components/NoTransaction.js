import {useNavigate} from "react-router-dom";
import { HiDocumentCurrencyRupee } from "react-icons/hi2";

function NoTransaction() {

  const navigate=useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-center m-20 p-10 bg-white rounded-2xl shadow-lg border border-gray-200">
      <HiDocumentCurrencyRupee className="text-green-500 text-6xl mb-4 animate-bounce" />
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        No Transactions Yet
      </h1>
      <p className="text-gray-500 max-w-sm">
        Start by adding your income and expenses to keep track of your financial
        activities.
      </p>
      <button onClick={()=>navigate("/add-transaction")} className="mt-6 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition">
        + Add Transaction
      </button>
    </div>
  );
}

export default NoTransaction;
