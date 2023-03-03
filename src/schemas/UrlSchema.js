import Joi from 'joi';

export const urlSchema = Joi.object({
    url: Joi.string().uri().min(3).trim().required()
});