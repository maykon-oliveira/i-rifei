import { raffleRouter } from "~/server/api/routers/raffle";
import { prisma } from "~/server/db";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth";
import RaffleTable from "./raffle-table";

type Props = {
    params: {
        id: string;
    }
}

export default async function Page({ params }: Props) {
    const session = await getServerSession(authOptions);

    const caller = raffleRouter.createCaller({ prisma, session });
    const data = await caller.getMyRaffles();

    return (
        <div className="sm:overflow-x-auto">
            <RaffleTable raffles={data}></RaffleTable>
        </div>
    )
}
