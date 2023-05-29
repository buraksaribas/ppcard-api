const mongoose = require('mongoose')
const { Schema, model } = mongoose

const fieldTypeSchema = new Schema({
	title: { type: String, required: true, trim: true },
}, { collection: 'fieldTypes', timestamps: true, versionKey: false })

const fieldType = model('fieldTypes', fieldTypeSchema)

module.exports = fieldType