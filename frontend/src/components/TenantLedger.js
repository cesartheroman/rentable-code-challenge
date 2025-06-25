import React from "react";
import useTransactions from "../hooks/useTransactions";

export default function TenantLedger({ tenantId }) {
  const balance = 12.0;

  const { transactions, loading, error } = useTransactions(tenantId);

  if (loading) return <div>Loading tenant ledger...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div>
      <h3>Ledger for Tenant {tenantId}</h3>
      <h4>Current Balance: ${balance.toFixed(2)}</h4>
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
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.description}</td>
              <td>{tx.transaction_type}</td>
              <td
                style={{
                  color: tx.transaction_type === "charge" ? "red" : "green",
                }}
              >
                ${parseFloat(tx.amount).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
