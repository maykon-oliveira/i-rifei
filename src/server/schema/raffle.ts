import { z } from "zod";

export const createRaffleSchema = z.object({
    name: z.string().nonempty(),
    description: z.string().max(300).nonempty(),
    price: z.number().positive().safe(),
    size: z.number().multipleOf(2).lte(100).gte(4).positive().safe(),
    drawDay: z.date().min(new Date()).optional()

});

export type CreateRaffleInput = z.TypeOf<typeof createRaffleSchema>;