const postHandler = (req, res) => {
    return res.status(404).json({ error: 'POST /task/:id not found' });
};

module.exports = postHandler;