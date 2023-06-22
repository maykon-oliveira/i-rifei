import { z } from "zod";

export const CreateRaffleInput = z.object({
    title: z.string().nonempty().max(40),
    description: z.string().max(300).nonempty(),
    price: z.number().positive().safe(),
    size: z.number().lte(100).gte(2).positive().safe(),
    drawDate: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}[-+]\d{2}:\d{2})?$/),
    awards: z.array(z.object({
        name: z.string().nonempty()
    })).min(1)
});

export type CreateRaffleInput = z.infer<typeof CreateRaffleInput>;