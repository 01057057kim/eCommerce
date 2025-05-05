const mongoose = require('mongoose');

const getWelcome = (req, res) => {
    res.json({ message: 'Welcome to the MongoDB Atlas Express API' });
};

const testConnection = (req, res) => {
    res.json({ message: 'Connection successful! Backend is running.' });
};

const getHealth = async (req, res) => {
    try {
        const dbStatus = mongoose.connection.readyState;
        const dbConnected = dbStatus === 1;
        
        req.app.set('dbConnected', dbConnected);
        
        res.json({
            status: 'ok',
            server: 'running',
            dbConnected: dbConnected,
            dbState: getDbStateText(dbStatus),
            message: 'Health Good'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            server: 'running', 
            dbConnected: false,
            error: error.message
        });
    }
};

const getData = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ 
                message: 'Database connection not available',
                dbState: getDbStateText(mongoose.connection.readyState)
            });
        }
        res.json({ 
            message: 'Database connection confirmed. Ready to query data.',
            dbConnected: true
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error accessing database', 
            error: error.message 
        });
    }
};

function getDbStateText(state) {
    switch(state) {
        case 0: return 'disconnected';
        case 1: return 'connected';
        case 2: return 'connecting';
        case 3: return 'disconnecting';
        default: return 'unknown';
    }
}

module.exports = {
    getWelcome,
    getHealth,
    getData,
    testConnection
};