import { z } from "zod";

const addMediaValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        }),
        description: z.string({
            required_error: "Description is required"
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
        status: z.enum(["MOVIE", "SERIES"]),
    })
    
});
const updateMediaValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        buy_price: z.string().optional(),
        rent_price: z.string().optional(),
        year: z.string().optional(),
        status: z.enum(["MOVIE", "SERIES"]).optional(),
    })
    
});

export const MediaValidationSchema = {
    addMediaValidationSchema,
    updateMediaValidationSchema
}

