// describing 'user interactions' functions - registration, authorization and getting users - взаимодейтсвие с пользователем

// import models
const User = require("./models/User");
const Role = require("./models/Role");

// Crypto module
const bcrypt = require("bcryptjs");

//express-validator
const { validationResult } = require("express-validator");

class authContrloller {
  async registration(req, res) {
    try {
      //request validation before sending request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration error", errors });
      }
      // User & password
      const { username, password } = req.body;
      // check in DB if user exists
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User ${username} already exists` });
      }
      // hash the password
      const hashedPassword = bcrypt.hashSync(password, 7);
      // get Roles from DB
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashedPassword,
        roles: [userRole.value],
      });
      // save to BD
      await user.save();
      // return response to 'client'
      return res.json({ message: "Registartion completed successfuly" });
    } catch (error) {
      console.log(error);
      // inform client (which sends requests) about error
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
        const { username, password } = req.body
        // looking for user in BD
        const user = await User.findOne({ username })
        if(!user) {
            return res.status(400).json({message: `User ${username} not found`})
        }
        // compare entered password with DB hashed password (user.password from res)
        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword) {
            return res.status(400).json({message: `Password is incorrect`})
        }
    } catch (error) {
      console.log(error);
      // inform client (which sends requests) about error
      res.status(400).json({ message: "Login error" });
    }
  }

  async getUsers(req, res) {
    try {
      /* // Hardcoded roles - to add them to DB
            const userRole = new Role()
            const adminRole = new Role({value: "ADMIN"})

            // save roles to MONGO - save() is async function as working with BD
            await userRole.save()
            await adminRole.save() */

      res.json("server is working");
    } catch (error) {}
  }
}

// export object of 'authContloller' class
module.exports = new authContrloller();
