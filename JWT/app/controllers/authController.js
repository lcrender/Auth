const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWTSECRET } = process.env;
const authCtrl = {};

authCtrl.signUp = async (req, res, next) => {
    const { username, email, password} = req.body;
    const user = new User({
        username,
        email,
        password
    });
    user.password = await user.encryptPassword(user.password)
    await user.save();
    const token = jwt.sign({id: user._id}, JWTSECRET, {
        expiresIn: 60 * 60 * 1
    })
    res.json({auth: true, token});
};

authCtrl.viewMe = async (req, res, next) => {
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
        return res.status(404).send('No user found');
    }
    res.json(user)
};

authCtrl.logIn = async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email})
    if (!user) {
        return res.status(404).send("The email doesn't exists");
    } 
    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
       return res.status(401).json({auth: false, token: null});
    }
    const token = jwt.sign({id: user._id}, JWTSECRET, {
        expiresIn: 60 * 60 * 1
    })
    res.json({auth: true, token}); 
};

module.exports = authCtrl;