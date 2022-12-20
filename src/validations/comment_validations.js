import Joi from "joi";
const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });
const commentSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(2).max(100).required(),
});

const validateComment = validator(commentSchema);
export default validateComment;
