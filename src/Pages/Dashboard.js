import { useNavigate } from "react-router-dom";
import TransactionCard from "../Components/TransactionCard";
import { useEffect, useState } from "react";
import RecentTransactions from "../Components/RecentTransaction";
import NoTransaction from "../Components/NoTransaction";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [categoryData, setCategoryData] = useState({});

  const categories = [
    "Salary",
    "Groceries",
    "Dining",
    "Transport",
    "Entertainment",
    "Others",
  ];

  useEffect(() => {
    const existingTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(existingTransactions);
    let income = 0;
    let expense = 0;
    
    existingTransactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense); 
    setBalance(income - expense);
  

  }, []);
  console.log(balance);

  const navigate = useNavigate();
  return (
    <div className="dashboard bg-purple-100">
      <div className="flex flex-row justify-between items-center p-2 m-7">
        <div className="text-2xl font-bold"> Dashboard </div>
        <div>
          <button
            className="p-3 rounded-md border-2 bg-red-500 hover:bg-red-700 hover:text-white transition delay-50"
            onClick={() => navigate("/add-transaction")}
          >
            {" "}
            + Add Transaction{" "}
          </button>
        </div>
      </div>
      <div>
        <TransactionCard
          income={totalIncome}
          expense={totalExpense}
          balance={balance}
        />
      </div>
      <div className="transactions-chart-row flex space-x-7 my-12 bg-slate-300">
        <div className="transactions w-1/2">
          <h3 className="p-3">Recent Transactions</h3>
          {transactions.length==0?<NoTransaction/>:<RecentTransactions transactions={transactions} />}
          
        </div>
        <div className="flex justify-center items-center w-1/2">
          Chart
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
