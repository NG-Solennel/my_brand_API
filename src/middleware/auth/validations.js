import validateMessage from "../../validations/message_validations";
import {
  validateBlogUpdate,
  validateBlogPost,
} from "../../validations/blog_validations";
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
  const { title, content } = req.body;
  const data = {
    title,
    content,
    image: req.file.path,
  };
  const { error } = validateBlogPost(data);
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
const updateValidation = (req, res, next) => {
  let data = {};
  if (req.body.title) {
    data.title = req.body.title;
  }
  if (req.body.content) {
    data.content = req.body.content;
  }
  if (req.file) {
    data.image = req.file.path;
  }
  const { error } = validateBlogUpdate(data);
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
  updateValidation,
};
