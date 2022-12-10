import Joi from "joi";
const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const likeSchema = Joi.object({
  email: Joi.string().email().required(),
});

const validateLikes = validator(likeSchema);
export default validateLikes;
