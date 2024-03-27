const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded) {
                req.userId = decoded.userId; 
                next();
            } else {
                res.status(400).json({ msg: "Not Authorized"}); 
            }
        } catch (err) {
            res.status(400).json({ msg: "Invalid Token",});
        }
    } else {
        res.status(400).json({ msg: "Please Login First!"});
    }
};

module.exports = auth;
