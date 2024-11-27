import React, { useState } from "react";

const TransactionForm = ({ onTransactionSubmit }) => {
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("deposit");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!accountId || !amount) {
      alert("Please fill in all fields");
      return;
    }

    // Create a new transaction object
    const transaction = {
      account_id: accountId,
      transaction_type: transactionType,
      amount:
        transactionType === "withdrawal"
          ? -Math.abs(parseFloat(amount)) // Negative for withdrawals
          : Math.abs(parseFloat(amount)), // Positive for deposits
    };

    // Pass the transaction to the parent component
    onTransactionSubmit(transaction);

    // Clear the form
    setAccountId("");
    setAmount("");
  };

  return (
    <div className="form-container">
      <h2>Submit New Transaction</h2>
      <form onSubmit={handleSubmit} data-type="transaction-form">
        <div className="form-group">
          <label htmlFor="account-id">Account ID:</label>
          <input
            data-type="account-id"
            type="text"
            id="account-id"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            placeholder="Enter Account ID"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            data-type="amount"
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="transaction-type">Transaction Type:</label>
          <select
            id="transaction-type"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="form-select"
          >
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
          </select>
        </div>

        <button
          data-type="transaction-submit"
          type="submit"
          className="form-button"
        >
          Submit Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
