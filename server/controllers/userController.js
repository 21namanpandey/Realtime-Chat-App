const User = require("../model/userModal");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: "Username already used", status: false })
            
        }
        // if (emailCheck) {
        //     return res.json({ msg: "Email already used", status: false })
        //     const hashedPassword = await bcrypt.hash(password, 10);
        //     const user = await User.create({
        //         email,
        //         username,
        //         password: hashedPassword,
        //     })
        //     delete user.password;
        //     return res.json({ status: true, user });
        // }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            // Email is already used
            return res.json({ msg: "Email already used", status: false });
        }
        
        // If emailCheck is false, proceed with user creation
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                email,
                username,
                password: hashedPassword,
            });
        
            // Omitting the user's password from the response for security
            delete user.password;
        
            return res.json({ status: true, user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
    } catch (ex) {
        next(ex); 
    }
};