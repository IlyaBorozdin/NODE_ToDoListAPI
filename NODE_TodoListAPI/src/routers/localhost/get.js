const logger = require('../../middlewares/logger/logger');

const getHandler = (req, res, next) => {
    logger.res(req, res);
    res.status(200).json({
        message: 'Welcome to the Task API!',
        description: 'This API provides functionality to manage tasks and collaborate on projects.',
        features: [
            'Create, read, update, and delete tasks.',
            'Filter tasks based on various criteria.',
            'Assign tasks to users.',
            'Set task deadlines and priorities.'
        ],
        resources: [
            {
                path: '/task',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                description: 'Manage tasks in the database.',
                usage: [
                    'GET /task - Retrieve a list of tasks.',
                    'POST /task - Create a new task.',
                    'PUT /task - Update existing tasks.',
                    'DELETE /task - Delete tasks.'
                ]
            },
            {
                path: '/task/:id',
                methods: ['GET', 'PUT', 'DELETE'],
                description: 'Manage a specific task by its ID.',
                usage: [
                    'GET /task/:id - Retrieve details of a task by ID.',
                    'PUT /task/:id - Finish an existing task by ID.',
                    'DELETE /task/:id - Delete a task by ID.'
                ]
            }
        ]
    });
};

module.exports = getHandler;