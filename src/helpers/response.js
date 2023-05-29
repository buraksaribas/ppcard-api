class Response {
	static success(res, data = null, message = null) {
		return res.status(200).json({
			success: true,
			data: data,
			message: message ?? "İşlem başarı ile gerçekleşti"
		})
	}

	static created(res, data = null, message = null) {
		return res.status(201).json({
			success: true,
			data: data,
			message: message ?? "Kayıt başarılı"
		})
	}

	static error(res, data = null, message = null) {
		return res.status(400).json({
			success: false,
			data: data,
			message: message ?? "İşlem başarısız"
		})
	}

	static unAuthenticated(res, data = null, message = null) {
		return res.status(401).json({
			success: false,
			data: data,
			message: message ?? "Yetkiniz bulunmamaktadır"
		})
	}

	static notFound(res, data = null, message = null) {
		return res.status(404).json({
			success: false,
			data: data,
			message: message ?? "İstek bulunamadı"
		})
	}

	static internalServerError(res, data = null, message = null) {
		return res.status(500).json({
			success: false,
			data: data,
			message: message ?? "Beklenmedik bir hata oluştu"
		})
	}
}

module.exports = Response