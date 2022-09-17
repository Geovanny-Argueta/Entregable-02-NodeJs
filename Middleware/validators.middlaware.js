const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const errorMessage = error.array().map((err) => err.msg);
    const message = errorMessage.join(". ");
    return res.status(400).json({
      status: "error",
      message,
    });
  }
  next();
};

const userValidators = [
  body("name")
    .isString()
    .withMessage("name is required")
    .notEmpty()
    .withMessage("the name field must not be empty")
    .isLength({ min: 4 })
    .withMessage("Name must be at least 4 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("password is required")
    .notEmpty()
    .withMessage("the password field must not be empty")
    .isLength({ min: 4 })
    .withMessage("password must be at least 4 letters"),
  checkValidations,
];

const tasksValidators = [
  body("title")
    .isString()
    .withMessage("title is required")
    .notEmpty()
    .withMessage("the title field must not be empty")
    .isLength({ min: 4 })
    .withMessage("title must be at least 4"),
  checkValidations,
];

module.exports = { userValidators, tasksValidators };
