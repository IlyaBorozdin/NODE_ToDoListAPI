const gracefulShutdown = require('graceful-shutdown-express');
const server = require('../server');
const storage = require('./db/usedStorage');

const shutdown = (exitCode) => {
    console.log('Server is closed');
    try {
        storage.end();
        console.log('Database is disconnected');
    } catch (err) {
        console.error('Error during database disconnection:', err);
    } finally {
        process.exit(exitCode);
    }
};

process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    gracefulShutdown(server, () => {
        shutdown(1);
    });
});

process.on('unhandledRejection', (reason) => {
    console.error(`Unhandled rejection. Reason: ${reason}`);
    gracefulShutdown(server, () => {
        shutdown(1);
    });
});

process.on('SIGINT', () => {
    console.log('Server is shutting down');
    gracefulShutdown(server, {
        timeout: 30000,
        forceExit: true,
        onShutdown: (err) => {
            if (err) {
                console.error('Error during server shutdown:', err);
                shutdown(1);
            } else {
                shutdown(0);
            }
        },
    });
});
