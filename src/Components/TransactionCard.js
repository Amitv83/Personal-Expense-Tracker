import React from "react";

function TransactionCard({income,expense,balance}) {
  return (
    <div className="flex flex-col space-y-11  mx-7 -my-5">
      <div className="balance-card p-7 bg-orange-100 rounded-lg shadow-md">
        <p className="font-medium">Current Balance</p>
        <h1 className={balance < 0 ? "expense" : "income"}>₹{balance}</h1>      </div>
      <div className="summary-cards flex space-x-7">
        <div className="income-card flex flex-col justify-center items-center w-1/2 p-12 rounded-sm shadow-md bg-gray-100">
          <p>Total Income</p>
          <h3 className="income">₹{income}</h3>
        </div>
        <div className="expense-card flex flex-col justify-center items-center w-1/2 p-12 rounded-md shadow-sm bg-gray-100">
          <p>Total Expense</p>
          <h3 className="expense">₹{expense}</h3>
        </div>
      </div>
    </div>
  );
}
export default TransactionCard;