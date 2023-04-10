import React, { useState } from 'react';
import "./App.css"
function Expance() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [outgoingTotal, setOutgoingTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [searchText, setSearchText] = useState('');

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
    const quantity = parseInt(document.querySelector('#quantity').value);
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
      description
    };
    setTransactions([...transactions, newTransaction]);
    if (type === 'income') {
      setIncomeTotal(incomeTotal + cost);
    } else {
      setOutgoingTotal(outgoingTotal + cost);
    }
    updateBalances();
    document.querySelector('form').reset();
    const storedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    localStorage.setItem('transactions', JSON.stringify([...storedTransactions, newTransaction]));
  }

  function handleFilterButtonClick() {
    const transactionRows = document.querySelectorAll('#transactions-table tr');
    transactionRows.forEach(row => {
      const dateCell = row.querySelector('td:nth-child(4)');
      if (dateCell) {
        const rowDate = dateCell.textContent;
        if (rowDate === filterDate || !filterDate) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      }
    });
  }

  function handleSearchButtonClick() {
    const transactionRows = document.querySelectorAll('#transactions-table tr');
    transactionRows.forEach(row => {
      const cells = row.querySelectorAll('td');
      let found = false;
      cells.forEach(cell => {
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
    <div>
      <h1>Transaction Tracker</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="type">Type:</label>
        <select id="type">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" />
        <label htmlFor="subName">Sub-Name:</label>
        <input id="subName" type="text" />
        <label htmlFor="date">Date:</label>
        <input id="date" type="date" />
        <label htmlFor="quantity">Quantity:</label>
        <input id="quantity" type="number" min="1" />
        <label htmlFor="where">Where:</label>
        <input id="where" type="text" />
        <label htmlFor="cost">Cost:</label>
        <input id="cost" type="number" min="0" step="0.01" />
        <label htmlFor="description">Description:</label>
        <input id="description" type="text" />
        <button type="submit">Add Transaction</button>
      </form>
      <hr />
      <label htmlFor="filter-date">Filter by Date:</label>
      <input id="filter-date" type="date" onChange={(e) => setFilterDate(e.target.value)} />
      <button onClick={handleFilterButtonClick}>Filter</button>
      <br />
      <label htmlFor="search-text">Search:</label>
      <input id="search-text" type="text" onChange={(e) => setSearchText(e.target.value.toLowerCase())} />
      <button onClick={handleSearchButtonClick}>Search</button>
      <br />
      <table id="transactions-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Sub-Name</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Where</th>
            <th>Cost</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.type}</td>
              <td>{transaction.name}</td>
              <td>{transaction.subName}</td>
              <td>{transaction.date}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.where}</td>
              <td>{'$' + transaction.cost.toFixed(2)}</td>
              <td>{transaction.description}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6"></td>
            <td id="income-balance">${incomeTotal.toFixed(2)}</td>
            <td id="outgoing-balance">${outgoingTotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="6"></td>
            <td colSpan="2" id="remaining-balance">${(incomeTotal - outgoingTotal).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );

};
export default Expance;