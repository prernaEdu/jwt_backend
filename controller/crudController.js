const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'secretkey';

exports.saveUser = async (req, res) => {
    try {
        const payload = req.body;
        console.log(payload);
        
        if (payload) {
            let isAlreadyExist = await User.findOne({email:payload.email});
            if(isAlreadyExist){
                return res.send('user already exist');
            }
            const user = new User(payload);
            user['id'] = `user_${await User.countDocuments() + 1}`;
            const savedUser = await user.save();
            if (savedUser) {
                return res.send('user saved successfully');
            } else {
                return res.send('error savind data'); 
            }
        } else {
            throw new Error("user data is required");
        }
    } catch (error) {
        console.log(error);
    }
}

exports.getUser = async (req, res) => {
    try {
        const payload = req.query;
        const users = await User.find(payload);
        if (users.length) {
            return res.send(users);
        } else {
            res.send('no user found');
        }
    } catch (error) {
        console.log(error);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.id) {
            return res.send('userId is required');
        };
        const updatedUser = await User.findOneAndUpdate({ id: payload.id }, payload);
        if (updatedUser) {
            return res.send('user updated successfully');
        } else {
            res.send('could not update user');
        }
    } catch (error) {
        console.log(error);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const payload = req.query;
        if (!payload.id) {
            return res.send('userId is required');
        };
        const updatedUser = await User.findOneAndDelete({ id: payload.id });
        if (updatedUser) {
            return res.send('user deleted successfully');
        } else {
            res.send('could not delete user');
        }
    } catch (error) {
        console.log(error);
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
};