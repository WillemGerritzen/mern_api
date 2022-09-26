import {object, string, TypeOf} from "zod";


export const createUserSchema = object({
    body: object({
        email: string({
            required_error: "Email is required"
        }).email("Email must be a valid email"),
        name: string({
            required_error: "Name is required"
        }).min(1).max(255),
        password: string({
            required_error: "Password is required"
        }).min(8, "Password too short - should be 8 chars minimum").max(255),
        passwordConfirmation: string({
            required_error: "passwordConfirmation is required"
    }).min(8).max(255),
    }).refine(data => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"]
    }),
});

export type CreateUserInput = Omit<
    TypeOf<typeof createUserSchema>,
    "body.passwordConfirmation"
    >;