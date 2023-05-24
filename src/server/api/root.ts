import { createTRPCRouter } from "~/server/api/trpc";
import { raffleRouter } from "~/server/api/routers/raffle";
import { userRouter } from '~/server/api/routers/user';
import { ticketRouter } from '~/server/api/routers/ticket';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  raffle: raffleRouter,
  user: userRouter,
  ticket: ticketRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
