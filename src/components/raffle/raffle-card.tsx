"use client";

import { Raffle, RaffleAward } from "@prisma/client";
import React, { useContext } from "react";
import { api } from "~/utils/trpc";
import RaffleArtboard from "./artboard/raffle-artboard";
import { toast } from "react-hot-toast";
import { ModalContext } from "~/utils/context/modal";
import RaffleBuyModal from "../modal/raffle-buy-modal";
import Overlay from "../overlay";

type Props = {
    raffle: Raffle & {
        tickets: {
            number: number;
            drawn: boolean;
        }[];
        awards: RaffleAward[];
    },
}

const RaffleCard: React.FC<Props> = ({ raffle: initialData }) => {
    const { data: raffle, isFetching, refetch } = api.raffle.getCardData.useQuery({
        id: initialData.id
    }, { enabled: false, initialData });

    const { mutate, isLoading: buyingTicket } = api.raffle.buyTicket.useMutation();
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
                await refetch();
                toast.success(data || 'Sucesso');
            },
            onError(error) {
                toast.error(error.message)
            },
        })
    }

    return (
        <Overlay active={isFetching || buyingTicket}>
            <RaffleArtboard raffle={raffle} onTicketClick={onTicketClick} />
        </Overlay>
    )
}

export default RaffleCard;