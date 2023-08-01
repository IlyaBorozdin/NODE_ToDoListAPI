const getHandler = (req, res) => {
    console.log('GET request: OK\n');
    return res.status(200).json(req.task);
};

module.exports = getHandler;