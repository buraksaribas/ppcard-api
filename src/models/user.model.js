const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
	name: { type: String, required: true, trim: true },
	email: { type: String, required: true, lowercase: true, unique: true, trim: true },
	password: { type: String, required: true, trim: true },
	userType: { type: String, enum: ['user', 'admin'], default: 'user' },
	views: [{ type: Schema.Types.ObjectId, ref: 'views' }],
	fields: [{ type: Schema.Types.ObjectId, ref: 'fields' }],
}, { collection: 'users', timestamps: true, versionKey: false })

userSchema.pre('remove', function (next) {
	this.model('fields').remove({ user: this._id }, next);
});

const user = model('users', userSchema)

module.exports = user