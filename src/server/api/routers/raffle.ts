import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { createRaffleSchema } from "~/server/schema/raffle";

export const raffleRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createRaffleSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const raffle = await ctx.prisma.raffle.create({
        data: {
          ...input,
          userId
        }
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.raffle.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
