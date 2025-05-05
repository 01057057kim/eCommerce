const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const configureMiddleware = (app) => {
    const allowedOrigins = (process.env.CLIENT_ORIGIN || '')
        .split(',')
        .map(origin => origin.trim());

    app.use(cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));

    app.use((req, res, next) => {
        req.dbConnected = req.app.get('dbConnected') || false;
        next();
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: process.env.NODE_ENV === 'production' ? {} : err
        });
    });
};

module.exports = configureMiddleware;
