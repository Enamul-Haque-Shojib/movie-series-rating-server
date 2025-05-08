import { z } from "zod";

const addMediaValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        }),
        description: z.string({
            required_error: "Description is required"
        }),
        synopsis: z.string({
            required_error: "Synopsis is required"
        }),
        buy_price: z.string({
            required_error: "Buy price is required"
        }),
        rent_price: z.string({
            required_error: "Rent price is required"
        }),
        year: z.string({
            required_error: "Year is required"
        }),
        genre: z.string({
            required_error: "Genre is required"
        }),
        streamingPlatform: z.string({
            required_error: "Streaming platform is required"
        }),
        status: z.enum(["MOVIE", "SERIES"]),
    })
    
});
const updateMediaValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        synopsis: z.string().optional(),
        buy_price: z.string().optional(),
        rent_price: z.string().optional(),
        year: z.string().optional(),
        streamingPlatform: z.string().optional(),
        genre: z.string().optional(),
        status: z.enum(["MOVIE", "SERIES"]).optional(),
    })
    
});

export const MediaValidationSchema = {
    addMediaValidationSchema,
    updateMediaValidationSchema
}

