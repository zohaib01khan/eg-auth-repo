import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as validator from 'validator';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({
    minlength: 3,
    maxlength: 1024,
    required: [true, 'Please tell us your name!'],
  })
  name: string;

  @Prop({
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'Please provide your email'],
    validate: [validator.isEmail, 'Please provide a valid email!'],
  })
  email: string;

  @Prop({
    select: false,
    required: false,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
