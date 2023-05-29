const UserModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const response = require('../helpers/response')
const ApiError = require('../helpers/error')
const { createToken } = require('../middlewares/auth')

class UserController {
	static me = async (req, res) => {
		await UserModel.find({ _id: req.user._id })
			.populate('fields')
			.populate('views')
			.then((data) => {
				return response.success(res, data)
			})
			.catch((err) => {
				console.log(err)
				throw new ApiError("İşlem başarısız!");
			});
	}

	static changePassword = async (req, res) => {
		const { password, password_confirmation } = req.body

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: hashedPassword } })
			.then((data) => {
				return response.success(res, data, "Parola başarı ile değiştirildi.")
			})
			.catch((err) => {
				throw new APIError("Kullanıcı kayıt edilemedi!");
			})

	}
}

module.exports = UserController