import { z } from "zod";

export const CreateRaffleInput = z.object({
    name: z.string().nonempty(),
    description: z.string().max(300).nonempty(),
    price: z.number().positive().safe(),
    size: z.number().lte(100).gte(2).positive().safe(),
    drawDay: z.date().min(new Date()).optional()

});

export type CreateRaffleInput = z.infer<typeof CreateRaffleInput>;