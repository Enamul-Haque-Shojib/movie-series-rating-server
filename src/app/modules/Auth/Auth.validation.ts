import { z } from "zod";

const registerAuthValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required"
        }),
        email: z.string({
            required_error: "Email is required"
        }).email(),
        password: z.string({
            required_error: "Password is required"
        }),
    })
    
});
const updateAuthValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().optional(),
    })
    
});
const loginAuthValidationSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required"
        }).email(),
        password: z.string({
            required_error: "Password is required"
        }),
    })
    
});

export const AuthValidationSchema = {
    registerAuthValidationSchema,
    updateAuthValidationSchema,
    loginAuthValidationSchema
}

