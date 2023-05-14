import React from "react";
import RaffleCard from "./raffle-card";
import { api } from "~/utils/trpc";
import { IoSadOutline } from "react-icons/io5";

type Props = {

}

const RaffleCardShowcase: React.FC<Props> = () => {
    const { data: raffles } = api.raffle.getAll.useQuery();

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
        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-y-10 pt-10">
            {raffles?.map((raffle, i) => <RaffleCard key={i} raffle={raffle} />)}
        </div>
    );
}

export default RaffleCardShowcase;