import React from "react";
import useTransactions from "../hooks/useTransactions";
import { calculateBalance } from "../utils/finance";

/**
 * Renders a ledger of transactions for a specific tenant.
 * Displays the current balance and a list of transactions.
 *
 * @param {object} props - The props for the component.
 * @param {number} props.tenantId - The unique identifier of the tenant.
 * @param {string} props.tenantName - The name of the tenant.
 * @param {function(): void} props.onClose - Callback function to close the ledger display.
 */
export default function TenantLedger({ tenantId, tenantName, onClose }) {
  const { transactions, loading, error } = useTransactions(tenantId);
  const balance = calculateBalance(transactions);
  const isNegativeBalance = balance <= 0;

  if (loading) {
    return (
      <div className="tenant-ledger-overlay">
        <h3>Ledger for {tenantName}</h3>
        <p>Loading transactions...</p>
        <button onClick={onClose} className="secondary">
          Close
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tenant-ledger-overlay error">
        <h3>Ledger for {tenantName}</h3>
        <p>Error loading ledger: {error.message}</p>
        <button onClick={onClose} className="secondary">
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="tenant-ledger-overlay">
      <h3>
        Ledger for Tenant: {tenantName}
        <button
          onClick={onClose}
          className="secondary"
          style={{ marginLeft: "10px" }}
        >
          Close
        </button>
      </h3>
      {transactions.length === 0 ? (
        <p>No transactions found for this tenant.</p>
      ) : (
        <>
          <h4
            className={
              isNegativeBalance ? "balance-positive" : "balance-negative"
            }
          >
            Current Balance: ${Math.abs(balance).toFixed(2)}
            {isNegativeBalance ? " (Credit)" : " (Owed)"}
          </h4>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th style={{ textAlign: "right" }}>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td
                    className={`amount-column ${transaction.type === "charge" ? "amount-charge" : "amount-payment"}`}
                  >
                    {transaction.type === "charge" ? "+" : "-"}$
                    {Math.abs(parseFloat(transaction.amount)).toFixed(2)}
                  </td>
                  <td>
                    <span
                      className={`transaction-type-badge ${transaction.type === "charge" ? "transaction-type-charge" : "transaction-type-payment"}`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
