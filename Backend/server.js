const express = require('express');
const connectDB = require('./database/db');
const configureMiddleware = require('./middlewares/middlewares');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();

configureMiddleware(app);

app.use(routes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const conn = await connectDB();
    if (conn) {
      app.set('dbConnected', true);
    }
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
  }
};

startServer();