const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validation");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    `${process.env.JWT_SECRET}`,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      const user = await User.findOne({ username });

      if (!valid) {
        throw new UserInputError("Username or password invalid", { errors });
      }

      if (!user) {
        errors.general = "Username or password invalid";
        throw new UserInputError("Username or password invalid", { errors });
      }

      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(user.password, salt);
      const match = await bcrypt.compareSync(password, hash);

      if (!match) {
        errors.general = "Username or password invalid";
        throw new UserInputError("Username or password invalid", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // TODO Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // TODO Make sure user doesnt already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username already exist", {
          errors: {
            username: "This username already exist",
          },
        });
      }

      // TODO hash password and create an auth token
      var salt = bcrypt.genSaltSync(10);
      password: await bcrypt.hashSync(password, salt);

      const readUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await readUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
