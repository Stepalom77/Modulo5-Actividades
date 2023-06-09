const User = require('../models/User');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken');

const signup = async(req, res) => {
    let userCreated = null;
    let { name, email, password, bio } = req.body;
    const user = await User.findOne({ email: email });
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        userCreated = await User.create({
            name,
            email,
            password: hashedPassword,
            bio,
          });
          await userCreated.save();
    } catch(error) {
        console.error(error)
        if (user) {
            return res.status(400).json({message: 'The email you typed is already been used by another user'});
          } else {
            return res.status(400).json({ message: 'There was an error' });
          }
    }
    return res.status(201).json(userCreated)
}

const login = async (req, res) => {
    let token = null;
    let { email, password } = req.body;
    let user = null;
    let isMatch = null;
    try {
      user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: 'The user does not exist' });
      }
      isMatch = await bcrypt.compare(password, user.password);
      token = await createToken({ id: user.id, email: user.email });
  
      if (user.active !== true) {
        return res.status(400).json({ message: 'Only a verified user can log in' });
      }
  
      return res.status(200).json({ token, message: 'You have successfully logged in' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'There was an error' });
    }
  };
  

/*const login = async(req, res) => {
    let token = null;
    let {email, password} = req.body;
    let user = null;
    let isMatch = null;
    try {
        user = await User.findOne({ email: email });
        isMatch = bcrypt.compare(password, user.password);
        token = await createToken({ 
            id: user.id, 
            email: user.email 
          })
    } catch(error) {
        console.error(error);
        if(user.active !== true) {
            res.status(400).json({message: 'Only a verified user can log in'});
        } else if(!user) {
            res.status(404).json({message: 'The user does not exists'});
        } else if(!isMatch) {
            res.status(401).json({message: 'Unauthorized'});
        } else {
            res.status(400).json({message: 'There was an error'});
        }
    }
    return res.status(200).json({token, message: 'You have successfully logged in'});
};*/

const validate = async(req, res) => {
    let user = null;
    const userId = req.params.id
    try {
        user = await User.findById(userId);
        user.active = true;
        await user.save();
    } catch(error) {
        if(!user) {
            res.status(404).json({message: 'The user does not exists'});
        } else {
            res.status(400).json({message: 'There was an error'});
        }
    }
    return res.status(200).json(user);
}

module.exports = {
    signup,
    login,
    validate
}