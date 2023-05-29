const jwt = require('jsonwebtoken')
const ApiError = require('../helpers/error')
const UserModel = require('../models/user.model')

const createToken = async (user, res) => {
	const payload = {
		sub: user._id,
		name: user.name
	}

	const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
		algorithm: "HS512",
		expiresIn: process.env.JWT_EXPIRE_TIME
	})

	return res.status(200).json({
		success: true,
		token,
		message: "Giriş Başarılı"
	})
}

const validateToken = async (req, res, next) => {
	const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ")

	if (!headerToken)
		throw new ApiError("Geçersiz Oturum Lütfen Oturum Açın", 401)

	const token = req.headers.authorization.split(" ")[1]

	await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
		if (err) throw new ApiError("Geçersiz Token", 401)

		const user = await UserModel.findById(decoded.sub).select("_id name email fields views")
		if (!user)
			throw new ApiError("Geçersiz Token", 401)

		req.user = user
		next();
	})

}

module.exports = {
	createToken,
	validateToken
}