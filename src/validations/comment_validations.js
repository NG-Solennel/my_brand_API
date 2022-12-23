import Joi from "joi";
const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });
const commentSchema = Joi.object({
  message: Joi.string().min(2).max(100).required(),
});

const validateComment = validator(commentSchema);
export default validateComment;
