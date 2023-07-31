'use strict';

const express = require('express');
const gracefulShutdown = require('graceful-shutdown-express');

const port = process.env.PORT || 1337;
const app = express();

app.use(express.json());

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const closeServer = exitCode => {
    console.log('Server is closed');
    process.exit(exitCode);
};

process.on('uncaughtException', err => {
    console.error('Uncaught exception:', err);
    gracefulShutdown(server, () => {
        closeServer(1);
    });
});

process.on('unhandledRejection', reason => {
    console.error(`Unhandled rejection. Reason: ${reason}`);
    gracefulShutdown(server, () => {
        closeServer(1);
    });
});

process.on('SIGINT', () => {
    console.log('Server is shutting down');
    gracefulShutdown(server, {
        timeout: 30000,
        forceExit: true,
        onShutdown: err => {
            if (err) {
                console.error('Error during server shutdown:', err);
                closeServer(1);
            } else {
                closeServer(0);
            }
        }
    });
});
