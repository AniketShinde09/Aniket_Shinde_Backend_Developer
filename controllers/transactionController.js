const { Transaction } = require('../models/transactionModel');
const {Category} =require('../models/transactionModel');
// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({
      success: true,  // Indicates that the request was successful
      message: 'Transactions fetched successfully',  // Custom message
      count: transactions.length,  // Number of transactions
      transactions,  // The transactions data
      lastUpdated: new Date(),  // Server timestamp for when the response is sent
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching transactions' });
  }
};

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const savedTransaction = await newTransaction.save();
   
  // category data

  const { name, type } = req.body;
   // Check if both name and type are provided
   if (!name ) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!type) {
    return res.status(400).json({ error: ' type is required' });
  }
  const newCategory = new Category({name, type});
  const savedCategory = await newCategory.save();


    res.status(201).json({
      success: true,  // Additional field
      message: 'Transaction created successfully',  // Custom message
      transactionId: savedTransaction._id,  // Add transaction ID
      transactionDetails: savedTransaction,  // Full transaction object
      categoryId:savedCategory._id,  //Add category ID
      categoryDetails:savedCategory,  //// Full category object
      timestamp: new Date(),  // Add server response timestamp
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
     // Add additional data in the response
    res.json({
      success: true,  // Indicates success
      message: 'Transaction fetched successfully',  // Custom success message
      transactionId: transaction._id,  // Explicitly include the transaction ID
      transactionDetails: transaction,  // Full transaction object
      fetchedAt: new Date(),  // Timestamp for when the transaction is fetched
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the transaction' });
  }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Add additional data in the response
    res.status(201).json({
      success: true,  // Indicates the transaction was updated successfully
      message: 'Transaction updated successfully',  // Custom success message
      updatedTransactionId: updatedTransaction._id,  // Explicitly include the transaction ID
      updatedTransactionDetails: updatedTransaction,  // Full updated transaction object
      updatedAt: new Date(),  // Timestamp indicating when the update occurred
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(201).json({
      success: true,  // Indicates successful deletion
      message: 'Transaction deleted successfully',  // Custom success message
      deletedTransactionId: deletedTransaction._id,  // Include the ID of the deleted transaction
      deletedTransactionDetails: deletedTransaction,  // Optionally include full details of the deleted transaction
      deletedAt: new Date(),  // Timestamp of the deletion
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the transaction' });
  }
};

// Get a summary of all transactions
exports.getTransactionSummary = async (req, res) => {
  try {
    // Find all transactions
    const transactions = await Transaction.find();

    // Initialize totals
    let totalIncome = 0;
    let totalExpenses = 0;

    // Calculate total income and total expenses
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else if (transaction.type === 'expense') {
        totalExpenses += transaction.amount;
      }
    });

    // Calculate balance (total income - total expenses)
    const balance = totalIncome - totalExpenses;

    // Return the summary in the response
    res.status(200).json({
      success: true,
      message: 'Transaction summary fetched successfully',
      totalIncome,
      totalExpenses,
      balance,
      transactionCount: transactions.length, // Total number of transactions
      summaryFetchedAt: new Date(), // Timestamp of when the summary was fetched
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the transaction summary' });
  }
};
