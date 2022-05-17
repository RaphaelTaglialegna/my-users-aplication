import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

const velueRequired = '400|All fields must be filled';

const userSchema = Joi.object({
  user: Joi.string().required().messages({
    'any.required': velueRequired,
    'string.empty': velueRequired,
  }),
  email: Joi.string().email().required().messages({
    'any.required': velueRequired,
    'string.empty': velueRequired,
    'string.email': '401|Incorrect email',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': velueRequired,
    'string.empty': velueRequired,
    'string.min': '401|Password must be 6 caracters',
  }),

});

const ValidateUser = (req: Request, res: Response, next: NextFunction) => {
  const {username, email, password } = req.body;
  const message = userSchema.validate({ email, password });
  if (message.error) {
    const [status, error] = message.error.message.split('|');
    const STATUSCODE: number = +status;
    return res.status(STATUSCODE).json({ message: error });
  }
  next();
};

export default ValidateUser;
