import React, { useState } from "react";
import TransactionForm from "./TransactionForm";
import TransactionsList from "./TransactionsList";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);

  const handleTransactionSubmit = (transaction) => {

    const newBalance = currentBalance + transaction.amount;


    const updatedTransaction = {
      ...transaction,
      balance: newBalance,
    };


    setTransactions([updatedTransaction, ...transactions]);


    setCurrentBalance(newBalance);
  };

  return (
    <div>
      <h1>Transaction Management</h1>
      <TransactionForm onTransactionSubmit={handleTransactionSubmit} />
      <TransactionsList
        transactions={transactions}
        currentBalance={currentBalance}
      />
    </div>
  );
};

export default App;
