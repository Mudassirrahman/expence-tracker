import React, { useState, useEffect } from 'react';
import './App.css';


function Expance1() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [outgoingTotal, setOutgoingTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    updateBalances();
  }, [incomeTotal, outgoingTotal]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    setTransactions(storedTransactions);
    let totalIncome = 0;
    let totalOutgoing = 0;
    storedTransactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.cost;
      } else {
        totalOutgoing += transaction.cost;
      }
    });
    setIncomeTotal(totalIncome);
    setOutgoingTotal(totalOutgoing);
  }, []);

  useEffect(() => {
    handleFilterButtonClick();
  }, [startDate, endDate, filterDate]);

  function updateBalances() {
    const incomeBalance = document.querySelector('#income-balance');
    const outgoingBalance = document.querySelector('#outgoing-balance');
    const remainingBalance = document.querySelector('#remaining-balance');
    incomeBalance.textContent = '$' + incomeTotal.toFixed(2);
    outgoingBalance.textContent = '$' + outgoingTotal.toFixed(2);
    remainingBalance.textContent = '$' + (incomeTotal - outgoingTotal).toFixed(2);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const type = document.querySelector('#type').value;
    const name = document.querySelector('#name').value;
    const subName = document.querySelector('#subName').value;
    const date = document.querySelector('#date').value;
    const quantity = document.querySelector('#quantity').value;
    const where = document.querySelector('#where').value;
    const cost = parseFloat(document.querySelector('#cost').value);
    const description = document.querySelector('#description').value;
    const newTransaction = {
      type,
      name,
      subName,
      date,
      quantity,
      where,
      cost,
      description,
    };
    setTransactions([...transactions, newTransaction]);
    if (type === 'income') {
      setIncomeTotal(incomeTotal + cost);
    } else {
      setOutgoingTotal(outgoingTotal + cost);
    }
    document.querySelector('form').reset();
    localStorage.setItem('transactions', JSON.stringify([...transactions, newTransaction]));
  }

  function handleFilterButtonClick() {
    const transactionRows = document.querySelectorAll('#transactions-table tr');
    transactionRows.forEach((row) => {
      const dateCell = row.querySelector('td:nth-child(4)');
      if (dateCell) {
        const rowDate = dateCell.textContent;
        if (rowDate >= startDate && rowDate <= endDate && (rowDate === filterDate || !filterDate)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      }
    });
  }

  function handleSearchButtonClick() {
    const transactionRows = document.querySelectorAll('#transactions-table tr');
    transactionRows.forEach((row) => {
      const cells = row.querySelectorAll('td');
      let found = false;
      cells.forEach((cell) => {
        if (cell.textContent.toLowerCase().includes(searchText)) {
          found = true;
        }
      });
      if (found) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  

 return (
  <div className="App">
    <h1>Expenses Tracker</h1>
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="type">Type:</label>
      <select id="type">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <br />
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" />
      <br />
      <label htmlFor="subName">Sub Name:</label>
      <input type="text" id="subName" />
      <br />
      <label htmlFor="date">Date:</label>
      <input type="date" id="date" />
      <br />
      <label htmlFor="quantity">Quantity:</label>
      <input type="text" id="quantity" />
      <br />
      <label htmlFor="where">Where:</label>
      <input type="text" id="where" />
      <br />
      <label htmlFor="cost">Cost:</label>
      <input type="number" id="cost" step="0.01" />
      <br />
      <label htmlFor="description">Description:</label>
      <input type="text" id="description" />
      <br />
      <button type="submit">Add Transaction</button>
    </form>
    <h2>Transactions</h2>
    <div>
      <label htmlFor="filter-date">Filter by date:</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={handleFilterButtonClick}>Filter</button>
    </div>
    <div>
      <label htmlFor="search-text">Search:</label>
      <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value.toLowerCase())} />
      <button onClick={handleSearchButtonClick}>Search</button>
    </div>
    <table id="transactions-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Sub Name</th>
          <th>Date</th>
          <th>Quantity</th>
          <th>Where</th>
          <th>Cost</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => {
          return (
            <tr key={index}>
              <td>{transaction.type}</td>
              <td>{transaction.name}</td>
              <td>{transaction.subName}</td>
              <td>{transaction.date}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.where}</td>
              <td>{transaction.cost.toFixed(2)}</td>
              <td>{transaction.description}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="6">Total Income:</td>
          <td id="income-balance">${incomeTotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td colSpan="6">Total Expenses:</td>
          <td id="outgoing-balance">${outgoingTotal.toFixed(2)}</td>
        </tr>
        <tr>
          

          <td colSpan="6">Remaining Balance:</td>
         
            <td colSpan="2" id="remaining-balance">${(incomeTotal - outgoingTotal).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );

};
export default Expance1;