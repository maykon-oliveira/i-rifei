"use client";

import { Raffle, Ticket } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import RaffleBuyModal from "~/components/modal/raffle-buy-modal";
import RaffleTable from "~/components/raffle/raffle-table";
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
    const { data: raffle, refetch } = api.raffle.overviewDetails.useQuery({
        id: initialData.id
    }, { enabled: false, initialData });
    const { mutate } = api.raffle.buyTicket.useMutation();

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
                toast.success(data || 'Sucesso');
                await refetch();
            },
            onError(error) {
                toast.error(error.message)
            },
        })
    }

    return <RaffleTable size={raffle.size} tickets={raffle.tickets} onTicketClick={handleTicketClick} />
}

export default OverviewTable;