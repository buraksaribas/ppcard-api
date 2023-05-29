const joi = require('joi')
const ApiError = require('../helpers/error')

class userValidation {
	static changePassword = async (req, res, next) => {
		try {
			await joi.object({
				password: joi.string().trim().min(6).max(100).required().messages({
					'string.min': 'Parola en az 6 karakter olmalıdır',
					'string.max': 'Parola en fazla 100 karakter olabilir',
					'string.required': 'Parola alanı zorunludur',
				}),
				password_confirmation: joi.any().valid(joi.ref('password')).required().messages({
					'any.only': 'Parolalar uyuşmuyor'
				})
			}).validateAsync(req.body)
		} catch (error) {
			console.log(error)
			throw new ApiError(error.details[0].message)
		}
		next()
	}
}

module.exports = userValidation