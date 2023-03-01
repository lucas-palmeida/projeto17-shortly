import Joi from 'joi';

export const authSchema = Joi.object({
    name: Joi.string().min(3).max(55).trim().required(),
    email: Joi.string().email().min(3).max(55).trim().required(),
    password: Joi.string().min(6).max(36).trim().required(),
    confirmPassword: Joi.ref('password')
}).with('password', 'confirmPassword');