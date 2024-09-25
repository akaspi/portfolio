import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  email: string
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
}, { collection: 'Users'});

const User = mongoose.model<User>('User', UserSchema);

export default User;
