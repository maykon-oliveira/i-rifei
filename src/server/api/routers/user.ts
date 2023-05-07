import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";
import { createUserSchema } from "~/server/schema/user";

export const userRouter = createTRPCRouter({
    register: publicProcedure
        .input(createUserSchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const user = await ctx.prisma.user.create({
                    data: input
                })
                return user
            } catch (e) {
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new TRPCError({
                            code: 'CONFLICT',
                            message: 'User already exists'
                        });
                    }
                }

                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong'
                });
            }
        }),
});
