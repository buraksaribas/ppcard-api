const FieldTypeModel = require('../models/fieldType.model')
const bcrypt = require('bcryptjs')
const response = require('../helpers/response')
const ApiError = require('../helpers/error')
const { createToken } = require('../middlewares/auth')

class FieldTypeController {
	static create = async (req, res) => {
		const { title } = req.body

		const checkTitle = await FieldTypeModel.findOne({ title: title })

		console.log(checkTitle)
		if (checkTitle)
			throw new ApiError("Bu alan zaten kayıtlı")

		const fieldType = new FieldTypeModel({
			title: title,
		})

		await fieldType
			.save()
			.then((data) => {
				return response.created(res, data, "Kayıt başarılı.")
			})
			.catch((err) => {
				throw new ApiError("Alan kayıt edilemedi!");
			})
	}

	static getAll = async (req, res) => {
		await FieldTypeModel.find()
			.then((data) => {
				return response.success(res, data)
			}).catch((err) => {
				throw new ApiError("İşlem başarısız");
			})
	}

	static update = async (req, res) => {
		const { title } = req.body

		await FieldTypeModel.findByIdAndUpdate(req.params.id, { title: title })
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
		console.log(req.params.id)
		await FieldTypeModel.findByIdAndDelete(req.params.id)
			.then((data) => {
				if (!data)
					return response.error(res, null, "Kayıt bulunamadı")

				return response.success(res)
			}).catch((err) => {
				console.log(err)
				throw new ApiError("İşlem başarısız");
			})
	}
}

module.exports = FieldTypeController