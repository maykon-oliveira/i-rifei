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
      try {
        await ctx.prisma.$transaction(async (prisma) => {
          const ownerId = ctx.session.user.id;
          const { awards, ...data } = input;

          const createdRaffle = await prisma.raffle.create({
            data: {
              ...data,
              ownerId,
            }
          });

          const awardsPromise = awards.map(({ name }) => {
            return prisma.raffleAward.create({
              data: {
                name,
                raffleId: createdRaffle.id,
              },
            });
          });

          await Promise.all(awardsPromise);
        });

      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        })
      } finally {
        await ctx.prisma.$disconnect();
      }

      return "Nova Rifa Criada";
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.raffle.findMany();
  }),

  getMyRaffles: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.raffle.findMany({
      where: {
        ownerId: ctx.session.user.id
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

    if (raffle.ownerId !== ctx.session.user.id) {
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
