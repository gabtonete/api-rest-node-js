module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://reactjsgabt.herokuapp.com");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    next();
};