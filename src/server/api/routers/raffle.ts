import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { CreateRaffleInput } from "~/server/schema/raffle";

export const raffleRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateRaffleInput)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const raffle = await ctx.prisma.raffle.create({
        data: {
          ...input,
          userId
        }
      });

      return "Nova Rifa Criada";
    }),

  getMyRaffles: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.raffle.findMany({
      where: {
        userId: ctx.session.user.id
      }
    });
  }),

  getOne: publicProcedure.input(z.object({
    id: z.string()
  })).query(async ({ ctx, input }) => {
    const raffle = await ctx.prisma.raffle.findUnique({
      where: {
        id: input.id
      }
    });

    if (!raffle) {
      throw new TRPCError({
        code: "NOT_FOUND"
      });
    }

    return raffle;
  }),

  delete: protectedProcedure.input(z.object({
    id: z.string()
  })).mutation(async ({ ctx, input }) => {
    const raffle = await ctx.prisma.raffle.findUnique({
      where: {
        id: input.id
      }
    });

    if (!raffle) {
      throw new TRPCError({
        code: "NOT_FOUND"
      });
    }

    if (raffle.userId !== ctx.session.user.id) {
      throw new TRPCError({
        code: "FORBIDDEN"
      });
    }

    await ctx.prisma.raffle.delete({
      where: {
        id: input.id
      }
    });

    return "Rifa deletada";
  }),

});
