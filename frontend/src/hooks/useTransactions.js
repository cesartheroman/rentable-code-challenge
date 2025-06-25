import { useState, useEffect, useCallback } from "react";

/**
 * Custom React hook for fetching transactions related to a specific tenant.
 * It manages the loading state, potential errors, and the transaction data.
 *
 * @param {number | null} tenantId - The unique identifier of the tenant whose transactions are to be fetched.
 *                                   If null or undefined, no transactions will be fetched.
 * @returns {{transactions: Array<Object>, loading: boolean, error: string | null}} An object containing:
 *   - `transactions`: An array of transaction objects. Each object is expected to have properties like `id`, `tenant`, `date`, `description`, `amount`, `type`.
 *   - `loading`: A boolean indicating if the transactions are currently being fetched.
 *   - `error`: A string containing an error message if the fetch failed, otherwise null.
 */
const useTransactions = (tenantId) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    if (!tenantId) {
      setTransactions([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/transactions/?tenant_id=${tenantId}`);
      if (!response.ok) {
        throw new Error(`HTTP Error, status: ${response.status}`);
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error(`Failed to fetch transactions: ${error.message || error}`);
      setError("Failed to load transactions. Please try again.");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error };
};

export default useTransactions;
