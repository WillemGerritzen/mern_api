import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
    {
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true,}
    },
    {
        timestamps: true
    }
);

userSchema.pre<UserDocument>("save", async function (next) {
    let user = this as UserDocument;

    if (!user.isModified("password")) {
        return next();
    }

    const saltWorkFactor: number = Number(process.env.SALT_WORK_FACTOR)

    const salt = await bcrypt.genSalt(saltWorkFactor);

    user.password = await bcrypt.hash(user.password, salt);

    return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((_) => false);
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;