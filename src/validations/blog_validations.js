import Joi from "joi";

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const blogSchema = Joi.object({
  title: Joi.string().min(2).max(80).required(),
  content: Joi.string().min(1).max(10000).required(),
  image: Joi.string().required(),
});

const updateSchema = Joi.object({
  title: Joi.string().min(2).max(80),
  content: Joi.string().min(20).max(10000),
  image: Joi.string(),
});
const validateBlogPost = validator(blogSchema);
const validateBlogUpdate = validator(updateSchema);
export { validateBlogPost, validateBlogUpdate };
