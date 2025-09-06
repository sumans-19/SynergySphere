import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String }, // NOTE: Hash passwords for production!
});

export default model('User', UserSchema);