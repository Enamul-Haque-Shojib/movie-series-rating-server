"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaValidationSchema = void 0;
const zod_1 = require("zod");
const addMediaValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required"
        }),
        director: zod_1.z.string({
            required_error: "Director is required"
        }),
        description: zod_1.z.string({
            required_error: "Description is required"
        }),
        synopsis: zod_1.z.string({
            required_error: "Synopsis is required"
        }),
        buy_price: zod_1.z.string({
            required_error: "Buy price is required"
        }),
        rent_price: zod_1.z.string({
            required_error: "Rent price is required"
        }),
        year: zod_1.z.string({
            required_error: "Year is required"
        }),
        genre: zod_1.z.string({
            required_error: "Genre is required"
        }),
        streamingPlatform: zod_1.z.string({
            required_error: "Streaming platform is required"
        }),
        status: zod_1.z.enum(["MOVIE", "SERIES"]),
    })
});
const updateMediaValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        director: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        synopsis: zod_1.z.string().optional(),
        buy_price: zod_1.z.string().optional(),
        rent_price: zod_1.z.string().optional(),
        year: zod_1.z.string().optional(),
        streamingPlatform: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        status: zod_1.z.enum(["MOVIE", "SERIES"]).optional(),
    })
});
exports.MediaValidationSchema = {
    addMediaValidationSchema,
    updateMediaValidationSchema
};
