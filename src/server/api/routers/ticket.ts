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
                        drawDate: true
                    }
                }
            },
            orderBy: {
                raffle: {
                    drawDate: 'desc'
                }
            }
        });
    }),
});