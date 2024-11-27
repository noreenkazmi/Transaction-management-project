
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors());

let transactions = [];
let balances = {};

app.get("/", (req, res) => {
  res.send("Welcome to the Financial Transactions API!");
});

app.post("/transactions", (req, res) => {
  const { account_id, transaction_type, amount } = req.body;

  if (!["deposit", "withdrawal"].includes(transaction_type)) {
    return res.status(400).json({ error: "Invalid transaction type" });
  }

  if (transaction_type === "withdrawal" && (balances[account_id] || 0) < amount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  if (transaction_type === "deposit") {
    balances[account_id] = (balances[account_id] || 0) + amount;
  } else if (transaction_type === "withdrawal") {
    balances[account_id] = (balances[account_id] || 0) - amount;
  }

  const newTransaction = {
    account_id,
    transaction_type,
    amount,
    balance: balances[account_id],
  };
  transactions.push(newTransaction);

  res.json({ message: "Transaction recorded successfully", transaction: newTransaction });
});

app.get("/transactions", (req, res) => {
  res.json(transactions);
});

app.get("/balance/:account_id", (req, res) => {
  const account_id = req.params.account_id;
  res.json({ account_id, balance: balances[account_id] || 0 });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
