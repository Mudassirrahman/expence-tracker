import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, Document, Page, Text, View,StyleSheet } from '@react-pdf/renderer';

import './App.css';


function Expance1() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [outgoingTotal, setOutgoingTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [generatePDF, setGeneratePDF] = useState(false);


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
    incomeBalance.textContent = 'pkr: ' + incomeTotal.toFixed(2);
    outgoingBalance.textContent = 'pkr: ' + outgoingTotal.toFixed(2);
    remainingBalance.textContent = 'pkr: ' + (incomeTotal - outgoingTotal).toFixed(2);
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

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transaction: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    textAlign: 'justify',
    width: '14.28%',
    marginRight: '2%',
  },
  type: {
    width: '10%',
  },
});

const PDFDocument = () => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.total}>Total Income: pkr {incomeTotal.toFixed(2)}</Text>
        <Text style={styles.total}>Total Expenses: pkr {outgoingTotal.toFixed(2)}</Text>
        <Text style={styles.total}>Remaining Balance: pkr {(incomeTotal - outgoingTotal).toFixed(2)}</Text>
        <View style={styles.transaction}>
          <Text style={[styles.text, styles.type]}>Type</Text>
          <Text style={styles.text}>Name</Text>
          <Text style={styles.text}>Sub Name</Text>
          <Text style={styles.text}>Date</Text>
          <Text style={styles.text}>Quantity</Text>
          <Text style={styles.text}>Where</Text>
          <Text style={styles.text}>Cost</Text>
          <Text style={styles.text}>Description</Text>
        </View>
        {transactions.map((transaction, index) => (
          <View style={styles.transaction} key={index}>
            <Text style={[styles.text, styles.type]}>{transaction.type}</Text>
            <Text style={styles.text}>{transaction.name}</Text>
            <Text style={styles.text}>{transaction.subName}</Text>
            <Text style={styles.text}>{transaction.date}</Text>
            <Text style={styles.text}>{transaction.quantity}</Text>
            <Text style={styles.text}>{transaction.where}</Text>
            <Text style={styles.text}>{transaction.cost.toFixed(2)}</Text>
            <Text style={styles.text}>{transaction.description}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

  

 return (
  <div className="App">
    <h1>Expenses Tracker</h1>
    <table>
  <tfoot>
        <tr>
          <td colSpan="6">Total Income:</td>
          <td id="income-balance">pkr:{incomeTotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td colSpan="6">Total Expenses:</td>
          <td id="outgoing-balance">pkr:{outgoingTotal.toFixed(2)}</td>
        </tr>
        <tr>
          

          <td colSpan="6">Remaining Balance:</td>
         
            <td colSpan="2" id="remaining-balance">pkr:{(incomeTotal - outgoingTotal).toFixed(2)}</td>
          </tr>
        </tfoot>
    </table>
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="type">Type:</label>
      <select id="type">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <br />
      
	    <label htmlFor="name">Name:</label>
	  	<select id="name" name="name">
		 	<option value="Sugar cane">Sugar cane</option>
			<option value="Rice">Rice</option>
			<option value="Mango Field">Mango Field</option>
		</select>
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
		  <select id="where" name="where">
			<option value="Area A">Area A</option>
			<option value="Area B">Area B</option>
			<option value="Area C">Area C</option>
	  	</select>
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
    
      </table>
<button onClick={() => setGeneratePDF(true)}>Generate PDF</button>
    {generatePDF && (
      <PDFDownloadLink document={<PDFDocument />} fileName="expenses.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>
    )}
    </div>
  );

};
export default Expance1;