const ViewModel = require('../models/view.model')
const bcrypt = require('bcryptjs')
const response = require('../helpers/response')
const ApiError = require('../helpers/error')
const { createToken } = require('../middlewares/auth')
const UserModel = require('../models/user.model')

class ViewController {
	static getAll = async (req, res) => {
		await ViewModel
			.find({ _id: { $in: req.user.views } })
			.populate('fields')
			.then((data) => {
				return response.success(res, data)
			})
			.catch((err) => {
				console.log(err)
				throw new ApiError("Alan kayıt edilemedi!");
			});
	}

	static getSingle = async (req, res) => {
		const { _id } = req.body
		await ViewModel
			.find({ _id: _id })
			.then((data) => {
				return response.success(res, data)
			})
			.catch((err) => {
				console.log(err)
				throw new ApiError("Alan kayıt edilemedi!");
			});
	}

	static create = async (req, res) => {
		const { title } = req.body
		const view = new ViewModel({
			title: title,
			owner: { _id: req.user._id }
		})


		await view.save()

		const user = await UserModel.findById({ _id: req.user._id })

		if (user)
			await user.views.push(view);

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

		await ViewModel.findByIdAndUpdate(req.params.id, { title: title, value: value })
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

		const isDeleted = await ViewModel.findByIdAndDelete(req.params.id)

		if (!isDeleted)
			return response.error(res, null, "Kayıt bulunamadı")

		await UserModel.findByIdAndUpdate(
			req.user._id,
			{ $pull: { views: req.params.id } },
			{ new: true }
		).then((data) => {
			return response.success(res, data)
		}).catch((err) => {
			console.log(err)
			throw new ApiError("İşlem başarısız");
		})
	}

	static addField = async (req, res) => {
		const { fieldId, viewId } = req.body

		const view = await ViewModel.findOne({ _id: viewId })

		if (view.fields.includes(fieldId))
			return response.error(res, fieldId, "Alan zaten kullanılıyor!")

		view.fields.push(fieldId)

		view.save()
			.then((data) => {
				console.log(data);
				return response.success(res, data)
			}).catch((err) => {
				console.log(err)
				throw new ApiError("İşlem başarısız");
			})
	}

	static deleteField = async (req, res) => {
		const { fieldId, viewId } = req.body

		const view = await ViewModel.findOne({ _id: viewId })

		console.log(view.fields)
		console.log(view.fields.includes('6468070562c8a91b999fa78c'))

		if (!view.fields.includes(fieldId))
			return response.error(res, fieldId, "Alan yok")

		view.fields.pop(fieldId)

		view.save()
			.then((data) => {
				console.log(data);
				return response.success(res, data)
			}).catch((err) => {
				console.log(err)
				throw new ApiError("İşlem başarısız");
			})
	}
}

module.exports = ViewController