/**
 * Represents a financial transaction.
 * @typedef {object} Transaction
 * @property {number} id - The unique identifier of the transaction.
 * @property {number} tenant - The ID of the tenant associated with the transaction.
 * @property {string} date - The date of the transaction (e.g., "YYYY-MM-DD").
 * @property {string} description - A brief description of the transaction.
 * @property {string} amount - The amount of the transaction (as a string, e.g., "100.00").
 * @property {string} type - The type of transaction ("charge" or "payment").
 */

/**
 * Calculates the total balance from a list of transactions.
 * Assumes 'charge' amounts reduce the balance and 'payment' increases it.
 *
 * @param {Transaction[]} transactions - An array of transaction objects.
 * @returns {number} The calculated balance.
 */
export const calculateBalance = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const amount = parseFloat(transaction.amount);
    const absAmount = Math.abs(amount);

    if (isNaN(amount)) {
      console.warn("Invalid amount found in transaction:", transaction);
      return acc;
    }

    return transaction.type === "charge" ? acc - absAmount : acc + absAmount;
  }, 0);
};
