// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   const [transactions, setTransactions] = useState([]);
//   const [transactionType, setTransactionType] = useState("");
//   const [transactionDate, setTransactionDate] = useState("");

//   const [incomeAmount, setIncomeAmount] = useState("");
//   const [incomeDescription, setIncomeDescription] = useState("");
//   const [incomeDate, setIncomeDate] = useState("");

//   const [outcomeAmount, setOutcomeAmount] = useState("");
//   const [outcomeDescription, setOutcomeDescription] = useState("");
//   const [outcomeDate, setOutcomeDate] = useState("");

//   const handleAddIncome = () => {
//     const newIncome = {
//       date: incomeDate,
//       description: incomeDescription,
//       amount: parseFloat(incomeAmount),
//       type: "income",
//     };
//     setTransactions([...transactions, newIncome]);
//     setIncomeAmount("");
//     setIncomeDescription("");
//     setIncomeDate("");
//   };

//   const handleAddOutcome = () => {
//     const newOutcome = {
//       date: outcomeDate,
//       description: outcomeDescription,
//       amount: parseFloat(outcomeAmount),
//       type: "outcome",
//     };
//     setTransactions([...transactions, newOutcome]);
//     setOutcomeAmount("");
//     setOutcomeDescription("");
//     setOutcomeDate("");
//   };

//   const handleFilterTransactions = () => {
//     const filteredTransactions = transactions.filter((transaction) => {
//       if (transactionType && transactionType !== transaction.type) {
//         return false;
//       }
//       if (transactionDate && transactionDate !== transaction.date) {
//         return false;
//       }
//       return true;
//     });
//     setTransactions(filteredTransactions);
//   };

//   const getTotal = (type) => {
//     const filteredTransactions = transactions.filter(
//       (transaction) => transaction.type === type
//     );
//     return filteredTransactions.reduce((total, transaction) => {
//       return total + transaction.amount;
//     }, 0);
//   };

//   const incomeTotal = getTotal("income");
//   const outcomeTotal = getTotal("outcome");
//   const balanceTotal = incomeTotal - outcomeTotal;

//   return (
//     <>
//       <div className="App">
//         <h1>Transaction Tracker</h1>

//         <div className="income-form">
//           <h2>Add Income</h2>
//           <input
//             type="date"
//             value={incomeDate}
//             onChange={(e) => setIncomeDate(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={incomeDescription}
//             onChange={(e) => setIncomeDescription(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Amount"
//             value={incomeAmount}
//             onChange={(e) => setIncomeAmount(e.target.value)}
//           />
//           <button onClick={handleAddIncome}>Add</button>
//         </div>

//         <div className="outcome-form">
//           <h2>Add Outcome</h2>
//           <input
//             type="date"
//             value={outcomeDate}
//             onChange={(e) => setOutcomeDate(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={outcomeDescription}
//             onChange={(e) => setOutcomeDescription(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Amount"
//             value={outcomeAmount}
//             onChange={(e) => setOutcomeAmount(e.target.value)}
//           />
//           <button onClick={handleAddOutcome}>Add</button>
//         </div>

//         <div className="filter-form">
//           <h2>Filter Transactions</h2>
//           <select
//             value={transactionType}
//             onChange={(e) => setTransactionType(e.target.value)}
//           >
//             <option value="">All Types</option>
//             <option value="income">Income</option>
//             <option value="outcome">Outcome</option>
//           </select>
//           <input
//             type="date"
//             value={transactionDate}
//             onChange={(e) => setTransactionDate(e.target.value)}
//           />
//           <button onClick={handleFilterTransactions}>Filter</button>
//         </div>

//         <div className="totals">
//           <h2>Totals</h2>
//           <p>Income: {incomeTotal}</p>
//           <p>Outcome: {outcomeTotal}</p>
//           <p>Balance: {balanceTotal}</p>
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Description</th>
//               <th>Type</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((transaction, index) => (
//               <tr key={index}>
//                 <td>{transaction.date}</td>
//                 <td>{transaction.description}</td>
//                 <td>{transaction.type}</td>
//                 <td>{transaction.amount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }
// export default App;

// import React, { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [transactions, setTransactions] = useState([]);
//   const [transactionType, setTransactionType] = useState("");
//   const [transactionDate, setTransactionDate] = useState("");

//   const [incomeAmount, setIncomeAmount] = useState("");
//   const [incomeDescription, setIncomeDescription] = useState("");
//   const [incomeDate, setIncomeDate] = useState("");

//   const [outcomeAmount, setOutcomeAmount] = useState("");
//   const [outcomeDescription, setOutcomeDescription] = useState("");
//   const [outcomeDate, setOutcomeDate] = useState("");

//   // Load transactions from local storage on mount
//   useEffect(() => {
//     const storedTransactions = JSON.parse(localStorage.getItem("transactions"));
//     if (storedTransactions) {
//       setTransactions(storedTransactions);
//     }
//   }, []);

//   // Save transactions to local storage on change
//   useEffect(() => {
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//   }, [transactions]);

//   const handleAddIncome = () => {
//     const newIncome = {
//       date: incomeDate,
//       description: incomeDescription,
//       amount: parseFloat(incomeAmount),
//       type: "income",
//     };
//     setTransactions([...transactions, newIncome]);
//     setIncomeAmount("");
//     setIncomeDescription("");
//     setIncomeDate("");
//   };

//   const handleAddOutcome = () => {
//     const newOutcome = {
//       date: outcomeDate,
//       description: outcomeDescription,
//       amount: parseFloat(outcomeAmount),
//       type: "outcome",
//     };
//     setTransactions([...transactions, newOutcome]);
//     setOutcomeAmount("");
//     setOutcomeDescription("");
//     setOutcomeDate("");
//   };

//   const handleFilterTransactions = () => {
//     const filteredTransactions = transactions.filter((transaction) => {
//       if (transactionType && transactionType !== transaction.type) {
//         return false;
//       }
//       if (transactionDate && transactionDate !== transaction.date) {
//         return false;
//       }
//       return true;
//     });
//     setTransactions(filteredTransactions);
//   };

//   const getTotal = (type) => {
//     const filteredTransactions = transactions.filter(
//       (transaction) => transaction.type === type
//     );
//     return filteredTransactions.reduce((total, transaction) => {
//       return total + transaction.amount;
//     }, 0);
//   };

//   const incomeTotal = getTotal("income");
//   const outcomeTotal = getTotal("outcome");
//   const balanceTotal = incomeTotal - outcomeTotal;
// import React, { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [transactions, setTransactions] = useState([]);
//   const [transactionType, setTransactionType] = useState("");
//   const [transactionDate, setTransactionDate] = useState("");
//   const [filteredTransactions, setFilteredTransactions] = useState([]);

//   const [incomeAmount, setIncomeAmount] = useState("");
//   const [incomeDescription, setIncomeDescription] = useState("");
//   const [incomeDate, setIncomeDate] = useState("");

//   const [outcomeAmount, setOutcomeAmount] = useState("");
//   const [outcomeDescription, setOutcomeDescription] = useState("");
//   const [outcomeDate, setOutcomeDate] = useState("");

//   useEffect(() => {
//     const savedTransactions = localStorage.getItem("transactions");
//     if (savedTransactions) {
//       setTransactions(JSON.parse(savedTransactions));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//     setFilteredTransactions(transactions);
//   }, [transactions]);

//   const handleAddIncome = () => {
//     const newIncome = {
//       date: incomeDate,
//       description: incomeDescription,
//       amount: parseFloat(incomeAmount),
//       type: "income",
//     };
//     setTransactions([...transactions, newIncome]);
//     setIncomeAmount("");
//     setIncomeDescription("");
//     setIncomeDate("");
//   };

//   const handleAddOutcome = () => {
//     const newOutcome = {
//       date: outcomeDate,
//       description: outcomeDescription,
//       amount: parseFloat(outcomeAmount),
//       type: "outcome",
//     };
//     setTransactions([...transactions, newOutcome]);
//     setOutcomeAmount("");
//     setOutcomeDescription("");
//     setOutcomeDate("");
//   };

//   const handleFilterTransactions = () => {
//     const filtered = transactions.filter((transaction) => {
//       if (transactionType && transactionType !== transaction.type) {
//         return false;
//       }
//       if (transactionDate && transactionDate !== transaction.date) {
//         return false;
//       }
//       return true;
//     });
//     setFilteredTransactions(filtered);
//   };

//   const getTotal = (type) => {
//     const filtered = filteredTransactions.filter(
//       (transaction) => transaction.type === type
//     );
//     return filtered.reduce((total, transaction) => {
//       return total + transaction.amount;
//     }, 0);
//   };

//   const incomeTotal = getTotal("income");
//   const outcomeTotal = getTotal("outcome");
//   const balanceTotal = incomeTotal - outcomeTotal;

//   useEffect(() => {
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//   }, [transactions]);
  
//   return (
//     <>
//       <div className="App">
//         <h1>Transaction Tracker</h1>

//         <div className="income-form">
//           <h2>Add Income</h2>
//           <input
//             type="date"
//             value={incomeDate}
//             onChange={(e) => setIncomeDate(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={incomeDescription}
//             onChange={(e) => setIncomeDescription(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Amount"
//             value={incomeAmount}
//             onChange={(e) => setIncomeAmount(e.target.value)}
//           />
//           <button onClick={handleAddIncome}>Add</button>
//         </div>

//         <div className="outcome-form">
//           <h2>Add Outcome</h2>
//           <input
//             type="date"
//             value={outcomeDate}
//             onChange={(e) => setOutcomeDate(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={outcomeDescription}
//             onChange={(e) => setOutcomeDescription(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Amount"
//             value={outcomeAmount}
//             onChange={(e) => setOutcomeAmount(e.target.value)}
//           />
//           <button onClick={handleAddOutcome}>Add</button>
//         </div>

//         <div className="filter-form">
//           <h2>Filter Transactions</h2>
//           <select
//             value={transactionType}
//             onChange={(e) => setTransactionType(e.target.value)}
//           >
//             <option value="">All Types</option>
//             <option value="income">Income</option>
//             <option value="outcome">Outcome</option>
//           </select>
//           <input
//             type="date"
//             value={transactionDate}
//             onChange={(e) => setTransactionDate(e.target.value)}
//           />
//           <button onClick={handleFilterTransactions}>Filter</button>
//         </div>

//         <div className="totals">
//           <h2>Totals</h2>
//           <p>Income: {incomeTotal}</p>
//           <p>Outcome: {outcomeTotal}</p>
//           <p>Balance: {balanceTotal}</p>
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Description</th>
//               <th>Type</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((transaction, index) => (
//               <tr key={index}>
//                 <td>{transaction.date}</td>
//                 <td>{transaction.description}</td>
//                 <td>{transaction.type}</td>
//                 <td>{transaction.amount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }
// return (
//   <>
//     <div className="App">
//       <h1>Transaction Tracker</h1>

//       <div className="income-form">
//         <h2>Add Income</h2>
//         <input
//           type="date"
//           value={incomeDate}
//           onChange={(e) => setIncomeDate(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={incomeDescription}
//           onChange={(e) => setIncomeDescription(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Amount"
//           value={incomeAmount}
//           onChange={(e) => setIncomeAmount(e.target.value)}
//         />
//         <button onClick={handleAddIncome}>Add</button>
//       </div>

//       <div className="outcome-form">
//         <h2>Add Outcome</h2>
//         <input
//           type="date"
//           value={outcomeDate}
//           onChange={(e) => setOutcomeDate(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={outcomeDescription}
//           onChange={(e) => setOutcomeDescription(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Amount"
//           value={outcomeAmount}
//           onChange={(e) => setOutcomeAmount(e.target.value)}
//         />
//         <button onClick={handleAddOutcome}>Add</button>
//       </div>

//       <div className="filter-form">
//         <h2>Filter Transactions</h2>
//         <select
//           value={transactionType}
//           onChange={(e) => setTransactionType(e.target.value)}
//         >
//           <option value="">All Types</option>
//           <option value="income">Income</option>
//           <option value="outcome">Outcome</option>
//         </select>
//         <input
//           type="date"
//           value={transactionDate}
//           onChange={(e) => setTransactionDate(e.target.value)}
//         />
//         <button onClick={handleFilterTransactions}>Filter</button>
//       </div>

//       <div className="totals">
//         <h2>Totals</h2>
//         <p>Income: {incomeTotal}</p>
//         <p>Outcome: {outcomeTotal}</p>
//         <p>Balance: {balanceTotal}</p>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Description</th>
//             <th>Type</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((transaction, index) => (
//             <tr key={index}>
//               <td>{transaction.date}</td>
//               <td>{transaction.description}</td>
//               <td>{transaction.type}</td>
//               <td>{transaction.amount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </>
// );

//           }
//           export default App;
  // return (
  //   <>
  //     <div className="App">
  //       <h1>Transaction Tracker</h1>

  //       <div className="income-form">
  //         <h2>Add Income</h2>
  //         <input
  //           type="date"
  //           value={incomeDate}
  //           onChange={(e) => setIncomeDate(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="Description"
  //           value={incomeDescription}
  //           onChange={(e) => setIncomeDescription(e.target.value)}
  //         />
  //         <input
  //           type="number"
  //           placeholder="Amount"
  //           value={incomeAmount}
  //           onChange={(e) => setIncomeAmount(e.target.value)}
  //         />
  //         <button onClick={handleAddIncome}>Add</button>
  //       </div>

  //       <div className="outcome-form">
  //         <h2>Add Outcome</h2>
  //         <input
  //           type="date"
  //           value={outcomeDate}
  //           onChange={(e) => setOutcomeDate(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="Description"
  //           value={outcomeDescription}
  //           onChange={(e) => set


  import React, { useState, useEffect } from "react";
  import "./App.css";
  
  function App() {
    const [transactions, setTransactions] = useState([]);
    const [transactionType, setTransactionType] = useState("");
    const [transactionDate, setTransactionDate] = useState("");
  
    const [incomeAmount, setIncomeAmount] = useState("");
    const [incomeDescription, setIncomeDescription] = useState("");
    const [incomeDate, setIncomeDate] = useState("");
  
    const [outcomeAmount, setOutcomeAmount] = useState("");
    const [outcomeDescription, setOutcomeDescription] = useState("");
    const [outcomeDate, setOutcomeDate] = useState("");
  
    // Load transactions from local storage on initial render
    useEffect(() => {
      const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
      if (savedTransactions) {
        setTransactions(savedTransactions);
      }
    }, []);
  
    // Save transactions to local storage when the transactions state changes
    useEffect(() => {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);
  
    const handleAddIncome = () => {
      const newIncome = {
        date: incomeDate,
        description: incomeDescription,
        amount: parseFloat(incomeAmount),
        type: "income",
      };
      setTransactions([...transactions, newIncome]);
      setIncomeAmount("");
      setIncomeDescription("");
      setIncomeDate("");
    };
  
    const handleAddOutcome = () => {
      const newOutcome = {
        date: outcomeDate,
        description: outcomeDescription,
        amount: parseFloat(outcomeAmount),
        type: "outcome",
      };
      setTransactions([...transactions, newOutcome]);
      setOutcomeAmount("");
      setOutcomeDescription("");
      setOutcomeDate("");
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
  
    const incomeTotal = getTotal("income");
    const outcomeTotal = getTotal("outcome");
    const balanceTotal = incomeTotal - outcomeTotal;

  // return (
  //   <>
  //     <div className="App">
  //       <h1>Transaction Tracker</h1>
  
  //       <div className="income-form">
  //         <h2>Add Income</h2>
  //         <input
  //           type="date"
  //           value={incomeDate}
  //           onChange={(e) => setIncomeDate(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="Description"
  //           value={incomeDescription}
  //           onChange={(e) => setIncomeDescription(e.target.value)}
  //         />
  //         <input
  //           type="number"
  //           placeholder="Amount"
  //           value={incomeAmount}
  //           onChange={(e) => setIncomeAmount(e.target.value)}
  //         />
  //         <button onClick={handleAddIncome}>Add</button>
  //       </div>
  
  //       <div className="outcome-form">
  //         <h2>Add Outcome</h2>
  //         <input
  //           type="date"
  //           value={outcomeDate}
  //           onChange={(e) => setOutcomeDate(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="Description"
  //           value={outcomeDescription}
  //           onChange={(e) => setOutcomeDescription(e.target.value)}
  //         />
  //         <input
  //           type="number"
  //           placeholder="Amount"
  //           value={outcomeAmount}
  //           onChange={(e) => setOutcomeAmount(e.target.value)}
  //         />
  //         <button onClick={handleAddOutcome}>Add</button>
  //       </div>
  
  //       <div className="filter-form">
  //         <h2>Filter Transactions</h2>
  //         <select
  //           value={transactionType}
  //           onChange={(e) => setTransactionType(e.target.value)}
  //         >
  //           <option value="">All Types</option>
  //           <option value="income">Income</option>
  //           <option value="outcome">Outcome</option>
  //         </select>
  //         <input
  //           type="date"
  //           value={transactionDate}
  //           onChange={(e) => setTransactionDate(e.target.value)}
  //         />
  //         <button onClick={handleFilterTransactions}>Filter</button>
  //       </div>
  
  //       <div className="totals">
  //         <h2>Totals</h2>
  //         <p>Income: {incomeTotal}</p>
  //         <p>Outcome: {outcomeTotal}</p>
  //         <p>Balance: {balanceTotal}</p>
  //       </div>
  
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Date</th>
  //             <th>Description</th>
  //             <th>Type</th>
  //             <th>Amount</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {transactions.map((transaction, index) => (
  //             <tr key={index}>
  //               <td>{transaction.date}</td>
  //               <td>{transaction.description}</td>
  //               <td>{transaction.type}</td>
  //               <td>{transaction.amount}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </>
  // );
  return (
    <div className="App">
      <h1>Transaction Tracker</h1>

      <h2>Add Income</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddIncome(); }}>
        <label>
          Date:
          <input type="text" value={incomeDate} onChange={(e) => setIncomeDate(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={incomeDescription} onChange={(e) => setIncomeDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Amount:
          <input type="text" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Income</button>
      </form>

      <h2>Add Outcome</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddOutcome(); }}>
        <label>
          Date:
          <input type="text" value={outcomeDate} onChange={(e) => setOutcomeDate(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={outcomeDescription} onChange={(e) => setOutcomeDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Amount:
          <input type="text" value={outcomeAmount} onChange={(e) => setOutcomeAmount(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Outcome</button>
      </form>

      <h2>Filter Transactions</h2>
      <label>
        Type:
        <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="outcome">Outcome</option>
        </select>
      </label>
      <br />
      <label>
        Date:
        <input type="text" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} />
      </label>
      <br />
      <button onClick={handleFilterTransactions}>Filter</button>

      <h2>Transactions</h2>
      <table>
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

      <h2>Summary</h2>
      <p>Income Total: {incomeTotal}</p>
      <p>Outcome Total: {outcomeTotal}</p>
      <p>Balance: {balanceTotal}</p>
    </div>
  );

            }
            export default App;  