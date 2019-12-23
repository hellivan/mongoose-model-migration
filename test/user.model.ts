import { Schema, model } from 'mongoose';

export const UserModel = model(
    'User',
    new Schema({
        name: String,
        active: Boolean
    })
);
