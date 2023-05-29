const mongoose = require('mongoose')
const { Schema, model } = mongoose

const fieldSchema = new Schema({
	title: { type: String, required: true, trim: true },
	value: { type: String, required: true, trim: true },
	type: { type: Schema.Types.ObjectId, ref: 'fieldTypes' },
	user: { type: Schema.Types.ObjectId, ref: 'users' },
}, { collection: 'fields', timestamps: true, versionKey: false })


const field = model('fields', fieldSchema)

module.exports = field