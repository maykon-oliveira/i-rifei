"use client";

import React, { useContext } from "react";
import { api } from "~/utils/trpc";
import { IoSadOutline } from "react-icons/io5";
import { ModalContext } from "~/utils/context/modal";
import RaffleBuyModal from "../modal/raffle-buy-modal";
import { RaffleAward, type Raffle } from "@prisma/client";
import { toast } from "react-hot-toast";
import RaffleArtboard from "./artboard/raffle-artboard";

type Props = {
    raffles: (Raffle & {
        tickets: {
            number: number;
            drawn: boolean;
            paymentConfirmed: boolean;
        }[];
        awards: RaffleAward[];
    })[]
}

const RaffleCardShowcase: React.FC<Props> = ({ raffles }) => {
    const { refetch } = api.raffle.getAll.useQuery(undefined, { initialData: raffles, enabled: false });
    const { mutate } = api.raffle.buyTicket.useMutation();
    const { openModal } = useContext(ModalContext);

    const onTicketClick = (raffle: Raffle, ticket: number) => {
        openModal(<RaffleBuyModal ticketNumber={ticket} onConfirm={() => buyTicket(raffle, ticket)} />)
    }

    const buyTicket = (raffle: Raffle, ticket: number) => {
        mutate({
            id: raffle.id,
            ticket
        }, {
            async onSuccess(data) {
                toast.success(data || 'Sucesso');
                await refetch();
            },
            onError(error) {
                toast.error(error.message)
            },
        })
    }

    if (!raffles.length) {
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
            {raffles.map((raffle) => <div key={raffle.id} className="mx-auto"><RaffleArtboard raffle={raffle} onTicketClick={onTicketClick} /></div>)}
        </div>
    );
}

export default RaffleCardShowcase;