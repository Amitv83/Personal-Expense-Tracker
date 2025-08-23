import React from "react";
import categoryEmojis from "./categoryEmojis.js";

function RecentTransactions({ transactions }) {
  return (
    <>
      <ul className="flex flex-col space-y-2 mx-3 mb-3">
        {transactions
          .slice(-7)
          .reverse()
          .map((tx, index) => (
            <li key={index} className="transaction-item flex justify-between p-2 px-5 bg-white">
              <span className="transaction-category">
                {categoryEmojis[tx.category]} {tx.category}
              </span>
              <span
                className={`transaction-amount ${
                  tx.type === "Income" ? "income" : "expense"
                }`}
              >
                ₹{tx.amount.toLocaleString()}
              </span>
            </li>
          ))}
      </ul>
    </>
  );
}
export default RecentTransactions;