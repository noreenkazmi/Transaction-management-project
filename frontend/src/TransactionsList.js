import React from "react";

const TransactionsList = ({ transactions, currentBalance }) => {
  return (
    <div>
      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        transactions.map((transaction, index) => (
          <div
            key={index}
            data-type="transaction"
            data-account-id={transaction.account_id}
            data-amount={transaction.amount}
            data-balance={
              index === 0 ? currentBalance : undefined
            }
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <p>
              <strong>Transaction Type:</strong>{" "}
              {transaction.transaction_type.charAt(0).toUpperCase() +
                transaction.transaction_type.slice(1)}
            </p>
            <p>
              <strong>Transaction Amount:</strong> $
              {Math.abs(transaction.amount).toFixed(2)}
            </p>
            <p>
              <strong>Account ID:</strong> {transaction.account_id}
            </p>
            {index === 0 && (
              <p>
                <strong>Current Balance:</strong> ${currentBalance.toFixed(2)}
              </p>
            )}
          </div>
        ))
      )}

      <div>
        <h3>Total Account Balance: ${currentBalance.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default TransactionsList;
