"use client";

import React from "react";
import { api } from "~/utils/trpc";
import { IoSadOutline } from "react-icons/io5";
import Loading from "../loading";
import RaffleCard from "./raffle-card";

type Props = {

}

const RaffleCardShowcase: React.FC<Props> = () => {
    const { data: raffles, isLoading } = api.raffle.getAll.useQuery();

    if (isLoading) {
        return <Loading />;
    }

    if (!raffles?.length) {
        return (
            <div className="hero min-h-8 bg-base-200 mx-auto my-10">
                <div className="hero-content">
                    <div className="max-w-md">
                        <p className="text-center py-6">Não temos rifas disponíveis.</p>
                        <div className="flex justify-center">
                            <IoSadOutline size={98} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-flow-row-dense grid-cols-1 gap-10 justify-center lg:grid-cols-2 xl:grid-cols-3">
            {raffles.map((raffle) => (<div key={raffle.id} className="mx-auto">
                <RaffleCard raffle={raffle} />
            </div>))}
        </div>
    );
}

export default RaffleCardShowcase;