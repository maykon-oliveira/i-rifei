import { useRouter } from "next/router";
import React from "react";
import LandpageLayout from "~/components/layout/landpage";
import RaffleTable from "~/components/raffle/raffle-table";
import { NextPageWithLayout } from "~/utils";
import { api } from "~/utils/trpc";

const RaffleOverviewPage: NextPageWithLayout = () => {
    const router = useRouter()
    const { data: raffle, isLoading } = api.raffle.overviewDetails.useQuery({
        id: router.query.id as string
    });

    if (!raffle || isLoading) {
        return <h1>Carregando...</h1>
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="max-w-lg text-center">
                    <h1 className="text-5xl font-bold">{raffle.title}</h1>
                    <p className="py-6">{raffle.description}</p>
                </div>
                <div>
                    <RaffleTable size={raffle.size} tickets={raffle.tickets.map(({ number }) => number)} onTicketClick={() => { }} />
                </div>
            </div>
        </div>
    );
}

export default RaffleOverviewPage;

RaffleOverviewPage.getLayout = function (page) {
    return <LandpageLayout>{page}</LandpageLayout>
}