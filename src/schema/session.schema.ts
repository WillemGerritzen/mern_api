import {object, string} from "zod";

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: "Email is required",
        }).email("Email must be a valid email"),
        password: string({
            required_error: "Password is required",
        }).min(8, "Password too short - should be 8 chars minimum").max(255),
    })
});
