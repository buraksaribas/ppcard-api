const FieldModel = require('../models/field.model')
const bcrypt = require('bcryptjs')
const response = require('../helpers/response')
const ApiError = require('../helpers/error')
const { createToken } = require('../middlewares/auth')
const UserModel = require('../models/user.model')

class FieldController {
	static getAll = async (req, res) => {
		await FieldModel
			.find({ user: req.user._id })
			.populate('type')
			.then((data) => {
				return response.success(res, data)
			})
			.catch((err) => {
				console.log(err)
				throw new ApiError("Alan kayıt edilemedi!");
			});
	}

	static create = async (req, res) => {
		const { title, value, typeId } = req.body

		const field = new FieldModel({
			title: title,
			value: value,
			type: { _id: typeId },
			user: { _id: req.user._id }
		})

		await field.save()

		const user = await UserModel.findById({ _id: req.user._id })

		if (user)
			await user.fields.push(field);

		await user.save()
			.then((data) => {
				return response.success(res, data)
			})
			.catch((err) => {
				console.log(err)
				throw new ApiError("Alan kayıt edilemedi!");
			});
	}

	static update = async (req, res) => {
		const { title, value } = req.body

		await FieldModel.findByIdAndUpdate(req.params.id, { title: title, value: value })
			.then((data) => {
				if (!data)
					return response.error(res, null, "Kayıt bulunamadı")

				return response.success(res)
			}).catch((err) => {
				console.log(err)
				throw new ApiError("İşlem başarısız");
			})
	}

	static delete = async (req, res) => {

		const isDeleted = await FieldModel.findByIdAndDelete(req.params.id)

		if (!isDeleted)
			return response.error(res, null, "Kayıt bulunamadı")

		await UserModel.findByIdAndUpdate(
			req.user._id,
			{ $pull: { fields: req.params.id } },
			{ new: true }
		).then((data) => {
			return response.success(res, data)
		}).catch((err) => {
			console.log(err)
			throw new ApiError("İşlem başarısız");
		})
	}


}

module.exports = FieldController