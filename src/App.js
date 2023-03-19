import React, { useState } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState('');
  const [transactionDate, setTransactionDate] = useState('');

  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeDescription, setIncomeDescription] = useState('');
  const [incomeDate, setIncomeDate] = useState('');

  const [outcomeAmount, setOutcomeAmount] = useState('');
  const [outcomeDescription, setOutcomeDescription] = useState('');
  const [outcomeDate, setOutcomeDate] = useState('');

  const handleAddIncome = () => {
    const newIncome = {
      date: incomeDate,
      description: incomeDescription,
      amount: parseFloat(incomeAmount),
      type: 'income'
    };
    setTransactions([...transactions, newIncome]);
    setIncomeAmount('');
    setIncomeDescription('');
    setIncomeDate('');
  };

  const handleAddOutcome = () => {
    const newOutcome = {
      date: outcomeDate,
      description: outcomeDescription,
      amount: parseFloat(outcomeAmount),
      type: 'outcome'
    };
    setTransactions([...transactions, newOutcome]);
    setOutcomeAmount('');
    setOutcomeDescription('');
    setOutcomeDate('');
  };

  const handleFilterTransactions = () => {
    const filteredTransactions = transactions.filter((transaction) => {
      if (transactionType && transactionType !== transaction.type) {
        return false;
      }
      if (transactionDate && transactionDate !== transaction.date) {
        return false;
      }
      return true;
    });
    setTransactions(filteredTransactions);
  };

  const getTotal = (type) => {
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.type === type
    );
    return filteredTransactions.reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);
  };

  const incomeTotal = getTotal('income');
  const outcomeTotal = getTotal('outcome');
  const balanceTotal = incomeTotal - outcomeTotal;

  return (
    <>


 {/* return (
  <div className="container">
    <h1>Expense Tracker</h1>
    <div className="income-outcome">
      <div className="income">
        <h2>Income</h2>
        <input type="number" id="income-amount" placeholder="Enter amount" value={incomeAmount} onChange={handleIncomeAmountChange} />
        <input type="text" id="income-description" placeholder="Enter description" value={incomeDescription} onChange={handleIncomeDescriptionChange} />
        <input type="date" id="income-date" placeholder="Enter date" value={incomeDate} onChange={handleIncomeDateChange} />
        <button id="add-income-btn" onClick={addIncome}>Add Income</button>
      </div>
      <div className="outcome">
        <h2>Outcome</h2>
        <input type="number" id="outcome-amount" placeholder="Enter amount" value={outcomeAmount} onChange={handleOutcomeAmountChange} />
        <input type="text" id="outcome-description" placeholder="Enter description" value={outcomeDescription} onChange={handleOutcomeDescriptionChange} />
        <input type="date" id="outcome-date" placeholder="Enter date" value={outcomeDate} onChange={handleOutcomeDateChange} />
        <button id="add-outcome-btn" onClick={addOutcome}>Add Outcome</button>
      </div>
    </div>
    <div className="filter">
      <h2>Filter Transactions</h2>
      <div className="filter-type">
        <label htmlFor="transaction-type">Transaction Type:</label>
        <select id="transaction-type" value={filterType} onChange={handleFilterTypeChange}>
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="outcome">Outcome</option>
        </select>
      </div>
      <div className="filter-date">
        <label htmlFor="transaction-date">Transaction Date:</label>
        <input type="date" id="transaction-date" value={filterDate} onChange={handleFilterDateChange} />
      </div>
      <button id="filter-transactions-btn" onClick={filterTransactions}>Filter Transactions</button>
    </div>
    <table id="expense-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div id="balance">
      <h2>Balance</h2>
      <p id="income-total">Total Income: ${incomeTotal}</p>
      <p id="outcome-total">Total Outcome: ${outcomeTotal}</p>
      <p id="balance-total">Balance: ${balanceTotal}</p>
    </div>
  </div>
); */}

  {/* <div className="App">
    <h1>Transaction Tracker</h1>
    <div className="transaction-form">
      <h2>Add Income</h2>
      <label htmlFor="income-date">Date:</label>
      <input type="date" id="income-date" value={incomeDate} onChange={(e) => setIncomeDate(e.target.value)} />
      <label htmlFor="income-description">Description:</label>
      <input type="text" id="income-description" value={incomeDescription} onChange={(e) => setIncomeDescription(e.target.value)} />
      <label htmlFor="income-amount">Amount:</label>
      <input type="number" id="income-amount" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} />
      <button onClick={handleAddIncome}>Add Income</button>
    </div>
    <div className="transaction-form">
      <h2>Add Outcome</h2>
      <label htmlFor="outcome-date">Date:</label>
      <input type="date" id="outcome-date" value={outcomeDate} onChange={(e) => setOutcomeDate(e.target.value)} />
      <label htmlFor="outcome-description">Description:</label>
      <input type="text" id="outcome-description" value={outcomeDescription} onChange={(e) => setOutcomeDescription(e.target.value)} />
      <label htmlFor="outcome-amount">Amount:</label>
      <input type="number" id="outcome-amount" value={outcomeAmount} onChange={(e) => setOutcomeAmount(e.target.value)} />
      <button onClick={handleAddOutcome}>Add Outcome</button>
    </div>
    <div className="filter-form">
      <h2>Filter Transactions</h2>
      <label htmlFor="transaction-type">Type:</label>
      <select id="transaction-type" value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
        <option value="">All</option>
        <option value="income">Income</option>
        <option value="outcome">Outcome</option>
      </select>
      <label htmlFor="transaction-date">Date:</label>
      <input type="date" id="transaction-date" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} />
      <button onClick={handleFilterTransactions}>Filter Transactions</button>
    </div>
    <div className="transaction-summary">
      <h2>Transaction Summary</h2>
      <div>
        <span>Income Total: </span>
        <span>{incomeTotal}</span>
      </div>
      <div>
        <span>Outcome Total: </span>
        <span>{outcomeTotal}</span>
      </div>
      <div>
        <span>Balance Total: </span>
        <span>{balanceTotal}</span>
      </div>
    </div>
    <div className="transaction-list">
      <h2>Transaction List</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </div> */}
    
  <div className="App">
    <h1>Transaction Tracker</h1>

    <div className="income-form">
      <h2>Add Income</h2>
      <input type="date" value={incomeDate} onChange={(e) => setIncomeDate(e.target.value)} />
      <input type="text" placeholder="Description" value={incomeDescription} onChange={(e) => setIncomeDescription(e.target.value)} />
      <input type="number" placeholder="Amount" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} />
      <button onClick={handleAddIncome}>Add</button>
    </div>

    <div className="outcome-form">
      <h2>Add Outcome</h2>
      <input type="date" value={outcomeDate} onChange={(e) => setOutcomeDate(e.target.value)} />
      <input type="text" placeholder="Description" value={outcomeDescription} onChange={(e) => setOutcomeDescription(e.target.value)} />
      <input type="number" placeholder="Amount" value={outcomeAmount} onChange={(e) => setOutcomeAmount(e.target.value)} />
      <button onClick={handleAddOutcome}>Add</button>
    </div>

    <div className="filter-form">
      <h2>Filter Transactions</h2>
      <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="outcome">Outcome</option>
      </select>
      <input type="date" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} />
      <button onClick={handleFilterTransactions}>Filter</button>
    </div>

    <div className="totals">
      <h2>Totals</h2>
      <p>Income: {incomeTotal}</p>
      <p>Outcome: {outcomeTotal}</p>
      <p>Balance: {balanceTotal}</p>
    </div>

    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Type</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>{transaction.type}</td>
            <td>{transaction.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>


    </>
)
};
export default App;
