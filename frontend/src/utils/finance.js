/**
 * Calculates the total balance from a list of transactions.
 * Positive balance = tenant owes money
 * Negative balance = tenant has credit
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

    // Charges increase what tenant owes, payments decrease it
    return transaction.type === "charge" ? acc + absAmount : acc - absAmount;
  }, 0);
};
