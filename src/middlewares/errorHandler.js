const ApiError = require('../helpers/error')

const errorHandler = (err, req, res, next) => {
	console.log(err)
	if (err instanceof ApiError) {
		return res.status(err.statusCode || 400).json({
			success: false,
			message: err.message
		})
	}
	return res.status(500).json({
		success: false,
		message: 'Beklenmedik bir hata oluştu',
	})
}

module.exports = errorHandler