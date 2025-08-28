import {useState, useEffect} from "react";
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

function ExpenseChart() {

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
      let highestExpense=0;
      let categoryBreakDown = {};
      categories.forEach((cat) => categoryBreakDown[cat] = 0);
      existingTransactions.forEach((transaction) => {
        if (transaction.type === "Expense") {
          categoryBreakDown[transaction.category]+=transaction.amount;
          if(highestExpense<categoryBreakDown[transaction.category]){
            highestExpense=categoryBreakDown[transaction.category];
          }
        }
      });

    setChartData(categoryBreakDown);
    setMaxExpense(highestExpense);

  }, []);
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: maxExpense === 0 ? 7 : maxExpense * 1.1,
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
  return (
    <div className="h-72 w-full px-10">
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
        options={chartOptions}
      />
    </div>
  );
}

export default ExpenseChart;
