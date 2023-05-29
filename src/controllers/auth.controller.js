const UserModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const response = require('../helpers/response')
const ApiError = require('../helpers/error')
const { createToken, forgotToken } = require('../middlewares/auth')
const transporter = require('../config/email.config')
const jwt = require('jsonwebtoken')

class AuthController {

	static login = async (req, res) => {
		const { email, password } = req.body

		const user = await UserModel.findOne({ email: email })

		if (!user)
			throw new ApiError('Kullanıcı kayıtlı değil.');

		const isMatch = await bcrypt.compare(password, user.password)
		console.log(isMatch)
		console.log(user.password)

		if (!isMatch)
			throw new ApiError('Kullanıcı veya şifre geçersiz', 401);

		createToken(user, res)
	}

	static register = async (req, res) => {
		const { name, email, password, password_confirmation } = req.body

		const checkUser = await UserModel.findOne({ email: email })

		if (checkUser)
			throw new ApiError('Eposta adresi kullanılıyor!')

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt)

		const user = new UserModel({
			name: name,
			email: email,
			password: hashedPassword
		})

		await user
			.save()
			.then((data) => {
				return response.created(res, data, "Kayıt başarılı.")
			})
			.catch((err) => {
				throw new APIError("Kullanıcı kayıt edilemedi!");
			})
	}

	static forgot = async (req, res) => {
		const { email } = req.body
		const user = await UserModel.findOne({ email: email })
		if (user) {
			const secret = user._id + process.env.JWT_SECRET_KEY
			const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
			const link = `http://127.0.0.1:3000/api/auth/reset/${user._id}/${token}`

			// Send Email
			await transporter.sendMail({
				from: process.env.EMAIL_FROM,
				to: user.email,
				subject: "xCard - Parola sıfırlama linki",
				html: `Parolanızı sıfırlamak için <a href=${link}>tıklayın</a>`
			}).then((data) => {
				return response.success(res, null, "Parola sıfırlama epostası gönderildi.")
			}).catch((err) => {
				return response.error(res, null, "Eposta adresi bulunamadı.")
			})
		}
	}

	static reset = async (req, res) => {
		const { password, password_confirmation } = req.body
		const { id, token } = req.params
		const user = await UserModel.findById(id)
		const new_secret = user._id + process.env.JWT_SECRET_KEY

		if (!jwt.verify(token, new_secret))
			throw new ApiError('Geçersiz Token');

		const salt = await bcrypt.genSalt()
		const newHashPassword = await bcrypt.hash(password, salt)
		await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
			.then((data) => {
				return response.success(res, null, "Parola başarı ile sıfırlandı.")
			}).catch((err) => {
				throw new ApiError('Birşeyler ters gitti', 500);
			})
	}
}

module.exports = AuthController