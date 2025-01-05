import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from "bcrypt";
const login = async (req, res) => {

  // verifying user credentials

  try {
    const { email, password } = req.body;
    // using email to find a user
    const user = await User.findOne({ email })
    // if user doesnt ezist
    if (!user) {
      res.status(404).json({ success: false, error: "User Not Found" })
    }

    // password = password that was enterred, user.password is the encrypted
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      res.status(404).json({ success: false, error: "Wrong Password" })
    }

    // payload is the data that we will store inside the token
    const token = jwt.sign({ _id: user._id, role: user.role },
      process.env.JWT_KEY, { expiresIn: "10d" }
    )

    // returning properties to the front end, user will contain the three variables
    res.status(200).json({
      success: true, token, user: {
        _id: user._id, name: user.name, role: user.role
      },
    });


  } catch (error) {
    res.status(500).json({success: false, error: error.message})
  }
}

const verify = (req, res) =>{
  return res.status(200).json({success: true, user: req.user})
}

export {login, verify}