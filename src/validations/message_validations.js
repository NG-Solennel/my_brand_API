import Joi from "joi";
const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const messageSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  hiring: Joi.boolean().default(false),
  description: Joi.string().min(10).max(200),
  message: Joi.string().min(5).max(400).required(),
});

const validateMessage = validator(messageSchema);
export default validateMessage;
