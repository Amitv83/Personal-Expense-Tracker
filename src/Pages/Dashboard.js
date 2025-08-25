import { createStaticHandler, useNavigate } from "react-router-dom";
import TransactionCard from "../Components/TransactionCard";
import { useEffect, useState } from "react";
import RecentTransactions from "../Components/RecentTransaction";
import NoTransaction from "../Components/NoTransaction";
import {Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [chartData, setChartData] = useState({});
  const [maxExpense, setMaxExpense] = useState(0);


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
    let highestExpense=0;
    let categoryBreakDown = {};
    categories.forEach((cat) => categoryBreakDown[cat] = 0);
    existingTransactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
        categoryBreakDown[transaction.category]+=expense;
        if(highestExpense<categoryBreakDown[transaction.category]){
          highestExpense=categoryBreakDown[transaction.category];
        }
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense); 
    setBalance(income - expense);
    setChartData(categoryBreakDown);
    setMaxExpense(highestExpense);

  }, []);
  console.log(balance);
  console.log(transactions.filter((tx)=>(tx.type==="Expense")));

   const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: maxExpense===0? 7 : maxExpense * 1.1,
        grid: {
          display: false, // Hide horizontal grid lines
        },
      },
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

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
      <div className="transactions-chart-row flex space-x-7 my-12 ">
        <div className="transactions w-1/2">
          <h3 className="p-3">Recent Transactions</h3>
          {transactions.length==0?<NoTransaction/>:<RecentTransactions transactions={transactions} />}
          
        </div>
        <div className="flex justify-center items-center w-1/2">
          <Bar
            data={{
              labels: categories.map((cat) => cat),
              datasets: [
                {
                  label: "Amount in ₹",
                  data: categories.map((cat) => chartData[cat]),
                  backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4CAF50",
                    "#9966FF",
                    "#FFA07A",
                  ],
                  borderColor: [
                    "#dc3256ff",
                    "#0489e2ff",
                    "#fdb601ff",
                    "#008004ff",
                    "#7240d5ff",
                    "#ff8b5dff",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options= {chartOptions}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
