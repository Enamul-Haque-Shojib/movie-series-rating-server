"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidationSchema = void 0;
const zod_1 = require("zod");
const registerAuthValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required"
        }),
        email: zod_1.z.string({
            required_error: "Email is required"
        }).email(),
        password: zod_1.z.string({
            required_error: "Password is required"
        }),
    })
});
const updateAuthValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        password: zod_1.z.string().optional(),
    })
});
const loginAuthValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required"
        }).email(),
        password: zod_1.z.string({
            required_error: "Password is required"
        }),
    })
});
exports.AuthValidationSchema = {
    registerAuthValidationSchema,
    updateAuthValidationSchema,
    loginAuthValidationSchema
};
