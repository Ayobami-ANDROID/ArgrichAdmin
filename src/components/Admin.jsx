import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [accountDetails, setAccountDetails] = useState({
    name: 'NNAMDI OBI',
    account: '1200195968',
    openingBalance: 191272.99,
    closingBalance: 597.99,
    summary: {
      moneyIn: 500,
      moneyOut: 188090,
    },
    dateRange: {
      start: '2024/08/01',
      end: '2024/08/06',
    },
    accountType: 'Target Savings',
  });

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get('/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchTransactionData();
  }, []);

  const downloadPDF = () => {
    axios.get('/api/transactions/pdf', { responseType: 'blob' })
      .then((response) => {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'transactions.pdf');
      })
      .catch((error) => {
        console.error('Error downloading PDF:', error);
      });
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{accountDetails.name}</h1>
        <p>Account: {accountDetails.account}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Opening Balance: ₦{accountDetails.openingBalance.toLocaleString()}</p>
            <p>Closing Balance: ₦{accountDetails.closingBalance.toLocaleString()}</p>
          </div>
          <div>
            <p>Money In: ₦{accountDetails.summary.moneyIn.toLocaleString()}</p>
            <p>Money Out: ₦{accountDetails.summary.moneyOut.toLocaleString()}</p>
          </div>
        </div>
        <p>Date Range: {accountDetails.dateRange.start} - {accountDetails.dateRange.end}</p>
        <p>Account Type: {accountDetails.accountType}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Transaction History</h2>
        <button
          onClick={downloadPDF}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download PDF
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Trans date</th>
            <th className="py-2 px-4 text-left">Reference</th>
            <th className="py-2 px-4 text-right">Debit</th>
            <th className="py-2 px-4 text-right">Credit</th>
            <th className="py-2 px-4 text-right">Balance</th>
            <th className="py-2 px-4 text-left">Value Date</th>
            <th className="py-2 px-4 text-left">Remark</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
            >
              <td className="py-2 px-4">{transaction.transDate}</td>
              <td className="py-2 px-4">{transaction.reference}</td>
              <td className="py-2 px-4 text-right">
                {transaction.debit ? `₦${transaction.debit.toLocaleString()}` : '-'}
              </td>
              <td className="py-2 px-4 text-right">
                {transaction.credit ? `₦${transaction.credit.toLocaleString()}` : '-'}
              </td>
              <td className="py-2 px-4 text-right">
                ₦{transaction.balance.toLocaleString()}
              </td>
              <td className="py-2 px-4">{transaction.valueDate}</td>
              <td className="py-2 px-4">{transaction.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;