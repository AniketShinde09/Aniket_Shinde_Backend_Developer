const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactionRoutes');
const connectDB = require('./config'); 

connectDB()
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api', transactionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
