const joi = require('joi')
const ApiError = require('../helpers/error')

class authValidation {
	static register = async (req, res, next) => {
		try {
			await joi.object({
				name: joi.string().trim().required().messages({
					'string.base': 'Ad alanı normal metin olmalıdır',
					'string.required': 'Ad alanı zorunludur'
				}),
				email: joi.string().email().trim().required().messages({
					'string.base': 'email alanı normal metin olmalıdır',
					'string.required': 'email alanı zorunludur',
					'string.email': 'Geçerli bir email adresi girin'
				}),
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

	static forgot = async (req, res, next) => {
		try {
			await joi.object({
				email: joi.string().email().trim().required().messages({
					'string.base': 'email alanı normal metin olmalıdır',
					'string.required': 'email alanı zorunludur',
					'string.email': 'Geçerli bir email adresi girin'
				})
			}).validateAsync(req.body)
		} catch (error) {
			console.log(error)
			throw new ApiError(error.details[0].message)
		}
		next()
	}

	static login = async (req, res, next) => {
		try {
			await joi.object({
				email: joi.string().email().trim().required().messages({
					'string.base': 'email alanı normal metin olmalıdır',
					'string.required': 'email alanı zorunludur',
					'string.email': 'Geçerli bir email adresi girin'
				}),
				password: joi.string().trim().min(6).max(100).required().messages({
					'string.min': 'Parola en az 6 karakter olmalıdır',
					'string.max': 'Parola en fazla 100 karakter olabilir',
					'string.required': 'Parola alanı zorunludur',
				})
			}).validateAsync(req.body)
		} catch (error) {
			console.log(error)
			throw new ApiError(error.details[0].message)
		}
		next()
	}

	static reset = async (req, res, next) => {
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

module.exports = authValidation