import validateMessage from "../../validations/message_validations";
import validateBlogPost from "../../validations/blog_validations";
import validateComment from "../../validations/comment_validations";
import {
  validateUser,
  validateLogin,
  validateAdmin,
} from "../../validations/user_validations";

const loginValidation = (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) {
    res.status(400).json({
      ValidationError: error.details.map((detail) =>
        detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
      ),
    });
  } else {
    next();
  }
};
const userValidation = (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).json({
      ValidationError: error.details.map((detail) =>
        detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
      ),
    });
  } else {
    next();
  }
};

const adminValidation = (req, res, next) => {
  const { error } = validateAdmin(req.body);
  if (error) {
    res.status(400).json({
      ValidationError: error.details.map((detail) =>
        detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
      ),
    });
  } else {
    next();
  }
};

const messageValidation = (req, res, next) => {
  const { error } = validateMessage(req.body);
  if (error) {
    res.status(400).json({
      ValidationError: error.details.map((detail) =>
        detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
      ),
    });
  } else {
    next();
  }
};

const blogValidation = (req, res, next) => {
  const { error } = validateBlogPost(req.body);
  if (error) {
    res.status(400).json({
      ValidationError: error.details.map((detail) =>
        detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
      ),
    });
  } else {
    next();
  }
};

const commentValidation = (req, res, next) => {
  const { error } = validateComment(req.body);
  if (error) {
    res.status(400).json({
      ValidationError: error.details.map((detail) =>
        detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
      ),
    });
  } else {
    next();
  }
};

export {
  commentValidation,
  blogValidation,
  messageValidation,
  userValidation,
  loginValidation,
  adminValidation,
};
