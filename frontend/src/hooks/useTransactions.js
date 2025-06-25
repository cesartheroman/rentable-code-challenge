import { useState, useEffect, useCallback } from "react";

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
