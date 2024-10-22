const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  // name should be any name like Food,Utilities,Salary,Entertainment
  name:{type: String, required: true},
  // type should be income (OR) expense
  type: { type: String, required: true },
  // category sholud be same as name it should be any name like Food,Utilities,Salary,Entertainment
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String },
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
const Category = mongoose.model('Category', categorySchema);

module.exports = { Transaction,Category };
