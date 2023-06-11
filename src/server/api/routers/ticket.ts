import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

export const ticketRouter = createTRPCRouter({
    myPurchases: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.ticket.findMany({
            where: {
                userId: ctx.session.user.id
            },
            include: {
                raffle: {
                    select: {
                        id: true,
                        title: true,
                        drawDate: true,
                        drawn: true
                    }
                }
            },
            orderBy: [{
                raffle: {
                    drawn: 'asc'
                }
            }, {
                raffle: {
                    drawDate: 'desc'
                }
            }]
        });
    }),
    confirmPayment: protectedProcedure.input(z.object({
        userId: z.string(),
        raffleId: z.string(),
        value: z.boolean()
    })).mutation(async ({ ctx, input }) => {
        const tickets = await ctx.prisma.ticket.findMany({
            where: {
                userId: input.userId,
                raffleId: input.raffleId,
                paymentConfirmed: !input.value
            },
            include: {
                raffle: {
                    select: {
                        ownerId: true
                    }
                }
            }
        });

        if (tickets.length === 0) {
            return 'Pagamento confirmado';
        }

        if (tickets[0]?.raffle.ownerId !== ctx.session.user.id) {
            throw new TRPCError({
                code: 'FORBIDDEN',
                message: 'Você não o dono dessa rifa para confirmar o pagamento.'
            })
        }

        await ctx.prisma.ticket.updateMany({
            data: {
                paymentConfirmed: input.value
            }, where: {
                userId: input.userId,
                raffleId: input.raffleId
            },
        });

        return 'Pagamento confirmado';
    }),
});