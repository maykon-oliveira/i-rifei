import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { CreateRaffleInput } from "~/server/schema/raffle";
import { parseISO } from "date-fns";
import { Ticket, User } from "@prisma/client";

export const raffleRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateRaffleInput)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.$transaction(async (prisma) => {
          const ownerId = ctx.session.user.id;
          const { awards, drawDate, ...data } = input;

          const createdRaffle = await prisma.raffle.create({
            data: {
              ...data,
              drawDate: parseISO(drawDate),
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
    return ctx.prisma.raffle.findMany({
      where: {
        drawn: false
      },
      include: {
        awards: true,
        tickets: {
          select: {
            number: true,
            drawn: true
          }
        }
      }
    });
  }),

  getMyRaffles: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.raffle.findMany({
      where: {
        ownerId: ctx.session.user.id
      },
      include: {
        tickets: {
          select: {
            id: true
          }
        }
      },
      orderBy: [
        {
          drawn: 'asc'
        },
        {
          createdAt: 'desc'
        }
      ]
    });
  }),

  allDetails: protectedProcedure.input(z.object({
    id: z.string()
  })).query(async ({ ctx, input }) => {
    const raffle = await ctx.prisma.raffle.findUnique({
      where: {
        id: input.id
      },
      include: {
        awards: true,
        winner: true,
        tickets: {
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
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
      },
      include: {
        tickets: {
          select: {
            id: true
          }
        }
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

    if (raffle.drawn) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Rifa sorteada não pode ser apagada."
      });
    }

    if (raffle.tickets.length > 0) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Rifa com números vendidos não pode ser apagada."
      });
    }

    await ctx.prisma.raffle.delete({
      where: {
        id: input.id
      }
    });

    return "Rifa deletada";
  }),

  buyTicket: protectedProcedure.input(z.object({
    id: z.string(),
    ticket: z.number(),
  })).mutation(async ({ ctx, input }) => {
    const raffle = await ctx.prisma.raffle.findUnique({
      where: {
        id: input.id,
      },
      include: {
        tickets: {
          include: {
            user: true
          }
        }
      }
    });

    if (!raffle) {
      throw new TRPCError({
        code: 'NOT_FOUND'
      })
    }

    if (raffle.ownerId === ctx.session.user.id) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: "Você não pode comprar números da sua rifa."
      });
    }

    const ticketBought = raffle.tickets.find(({ number }) => number === input.ticket);

    if (!ticketBought || (ticketBought.userId === ctx.session.user.id)) {
      await ctx.prisma.ticket.create({
        data: {
          raffleId: raffle.id,
          userId: ctx.session.user.id,
          number: input.ticket
        }
      });

      return "Número comprado";
    }

    throw new TRPCError({
      code: 'CONFLICT',
      message: `${ticketBought.user.name} já comprou esse número.`
    });
  }),

  overviewDetails: publicProcedure.input(z.object({
    id: z.string()
  })).query(async ({ ctx, input }) => {
    const raffle = await ctx.prisma.raffle.findUnique({
      where: {
        id: input.id
      },
      include: {
        awards: true,
        tickets: {
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    if (!raffle) {
      throw new TRPCError({
        code: "NOT_FOUND"
      });
    }

    return raffle;
  }),

  startDrawn: protectedProcedure.input(z.object({
    id: z.string()
  })).mutation(async ({ ctx, input }) => {
    const { tickets } = await ctx.prisma.raffle.findUniqueOrThrow({
      where: {
        id: input.id
      },
      include: {
        tickets: {
          include: {
            user: true
          }
        }
      }
    });

    const drawnNumbers: (Ticket & {
      user: User;
    })[] = [];

    for (let time = 0; time < 10; time++) {
      const randomIndex = Math.floor(Math.random() * tickets.length);
      drawnNumbers.push(tickets[randomIndex]!!);
    }

    const { id, name } = drawnNumbers[drawnNumbers.length - 1]?.user!!;

    return {
      drawnNumbers: drawnNumbers.map(({ number }) => number),
      winner: {
        id, name
      }
    }
  }),

});
