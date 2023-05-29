const mongoose = require('mongoose')
const { Schema, model } = mongoose

const viewSchema = new Schema({
	title: { type: String, required: true, trim: true },
	user: { type: Schema.Types.ObjectId, ref: 'users' },
	fields: [{ type: Schema.Types.ObjectId, ref: 'fields' }],
}, { collection: 'views', timestamps: true, versionKey: false })

const view = model('views', viewSchema)

module.exports = view