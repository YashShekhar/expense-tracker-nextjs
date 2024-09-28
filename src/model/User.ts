import mongoose, { Schema, Document } from "mongoose";

export enum ExpenseType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export enum Category {
  FOOD = "FOOD",
  EMI = "EMI",
  INVESTMENT = "INVESTMENT",
}

export interface Item extends Document {
  itemName: string;
  itemValue: number;
  expenseType: ExpenseType;
  category: Category;
  createdAt: Date;
  modifiedAt: Date;
}

const ItemSchema: Schema<Item> = new Schema({
  itemName: {
    type: String,
    required: [true, "Item name is requeired"],
  },
  itemValue: {
    type: Number,
    required: [true, "Value is required"],
  },
  expenseType: {
    type: String,
    enum: ExpenseType,
    default: ExpenseType.EXPENSE,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: Category,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  password: string;
  item: Array<Item>;
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  item: [ItemSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
