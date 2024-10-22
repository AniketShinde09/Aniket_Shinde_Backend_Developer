const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController'); // Ensure the path is correct

// Define routes with their corresponding controller methods
router.get('/transactionsget', transactionController.getAllTransactions);   
router.post('/transactions', transactionController.createTransaction);
router.get('/transactions/:id', transactionController.getTransactionById);
router.put('/transactions/:id', transactionController.updateTransaction);
router.delete('/transactions/:id', transactionController.deleteTransaction);
router.get('/summary',transactionController.getTransactionSummary);
module.exports = router;
