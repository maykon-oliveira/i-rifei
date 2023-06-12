import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { CreateRaffleInput } from "~/server/schema/raffle";
import { parseISO } from "date-fns";
import { type Ticket, type User } from "@prisma/client";

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

      } catch (e: any) {
        const error = e as Error;

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message
        });
      } finally {
        await ctx.prisma.$disconnect();
      }

      return "Nova Rifa Criada";
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.raffle.findMany({
      where: {
        drawn: false,
      },
      include: {
        awards: true,
        tickets: {
          select: {
            number: true,
            drawn: true,
            paymentConfirmed: true
          }
        }
      }
    });
  }),

  getCardData: publicProcedure.input(z.object(
    { id: z.string() }
  )).query(({ ctx, input }) => {
    return ctx.prisma.raffle.findUniqueOrThrow({
      where: {
        id: input.id
      },
      include: {
        awards: true,
        tickets: {
          select: {
            number: true,
            drawn: true,
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
                name: true,
              }
            },
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
            id: true,
            paymentConfirmed: false
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

    if (raffle.drawn) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Não é possivel comprar números.'
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

      return "Número comprado.";
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
        winner: true,
        owner: true,
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

    if (tickets.length === 0) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Nenhum número foi vendido para iniciar o sorteio.'
      });
    }

    if (tickets.some(({ paymentConfirmed }) => !paymentConfirmed)) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Confirme o pagamento de todos os número antes de sortear.'
      });
    }

    const drawnTickets: (Ticket & {
      user: User;
    })[] = [];

    for (let time = 0; time < 10; time++) {
      const randomIndex = Math.floor(Math.random() * tickets.length);
      drawnTickets.push(tickets[randomIndex]!);
    }

    const ticketDrawn = drawnTickets[drawnTickets.length - 1]!;

    try {
      await ctx.prisma.$transaction(async (prisma) => {
        await prisma.raffle.update({
          data: {
            drawn: true,
            winnerId: ticketDrawn.userId,
            realDrawDate: new Date()
          },
          where: {
            id: ticketDrawn.raffleId
          }
        });
        await prisma.ticket.update({
          data: {
            drawn: true
          },
          where: {
            id: ticketDrawn.id
          }
        });
      });

    } catch (e: any) {
      const error = e as Error;

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message
      });
    } finally {
      await ctx.prisma.$disconnect();
    }

    return {
      drawnTickets: drawnTickets.map(({ number }) => number)
    }
  }),

  drawnConfirm: protectedProcedure.input(z.object({
    id: z.string()
  })).mutation(async ({ ctx, input }) => {
    const raffle = await ctx.prisma.raffle.findUniqueOrThrow({
      where: {
        id: input.id
      }
    });

    if (ctx.session.user.id !== raffle.ownerId) {
      throw new TRPCError({
        code: 'FORBIDDEN'
      });
    }

    await ctx.prisma.raffle.update({
      data: {
        published: true,
      },
      where: {
        id: raffle.id
      },
    });

    return 'Sorteio confirmado';
  }),

});
