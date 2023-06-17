"use client";

import { type Raffle, type Ticket } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import RaffleBuyModal from "~/components/modal/raffle-buy-modal";
import Overlay from "~/components/overlay";
import RaffleGrid from "~/components/raffle/raffle-grid";
import { ModalContext } from "~/utils/context/modal";
import { api } from "~/utils/trpc";

type Props = {
    raffle: Raffle & {
        tickets: (Ticket & {
            user: {
                id: string;
                name: string;
            };
        })[];
    }
}

const OverviewTable: React.FC<Props> = ({ raffle: initialData }) => {
    const { data: loggedUser } = useSession();
    const { openModal } = useContext(ModalContext);
    const { data: raffle, isFetching, refetch } = api.raffle.overviewDetails.useQuery({
        id: initialData.id
    }, { enabled: false, initialData });
    const { mutate, isLoading: buying } = api.raffle.buyTicket.useMutation();

    const handleTicketClick = (ticket: number) => {
        if (raffle.drawn) {
            return;
        }

        if (!loggedUser) {
            toast.custom("Você precisa fazer login para comprar um número.");
            return;
        }

        if (raffle.ownerId === loggedUser.user.id) {
            toast.custom("Você não pode comprar números da sua rifa.", { className: "alert-warning" })
            return;
        }

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
        <Overlay active={isFetching || buying}>
            <RaffleGrid size={raffle.size} tickets={raffle.tickets} onTicketClick={handleTicketClick} />
        </Overlay>
    );
}

export default OverviewTable;