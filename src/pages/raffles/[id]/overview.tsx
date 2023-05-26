import { Raffle } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import LandpageLayout from "~/components/layout/landpage";
import RaffleBuyModal from "~/components/raffle/raffle-buy-modal";
import RaffleCountdown from "~/components/raffle/raffle-countdown";
import RaffleTable from "~/components/raffle/raffle-table";
import { NextPageWithLayout } from "~/utils";
import { ModalContext } from "~/utils/context/modal";
import { api } from "~/utils/trpc";

const RaffleOverviewPage: NextPageWithLayout = () => {
    const { data: loggedUser } = useSession();
    const { openModal } = useContext(ModalContext);
    const router = useRouter()
    const { mutate } = api.raffle.buyTicket.useMutation();
    const { data: raffle, isLoading, refetch } = api.raffle.overviewDetails.useQuery({
        id: router.query.id as string
    });

    if (!raffle || isLoading) {
        return <h1>Carregando...</h1>
    }

    const handleTicketClick = (ticket: number) => {
        if (!loggedUser) {
            toast.custom("Você precisa fazer login para comprar um número")
            return;
        }

        if (raffle.ownerId === loggedUser.user.id) {
            toast.custom("Você não pode comprar números da sua rifa", { className: "alert-warning" })
            return;
        }

        openModal(<RaffleBuyModal ticketNumber={ticket} onConfirm={() => buyTicket(raffle, ticket)} />)
    }

    const buyTicket = (raffle: Raffle, ticket: number) => {
        mutate({
            id: raffle.id,
            ticket
        }, {
            onSuccess(data) {
                toast.success(data || 'Sucesso');
                refetch();
            },
            onError(error) {
                toast.error(error.message)
            },
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="flex justify-center flex-col items-center">
                    <p className="text-base-content/70 text-sm mb-3">Cronômetro para o dia do sorteio</p>
                    <RaffleCountdown date={raffle.drawDate} />
                </div>
                <div className="max-w-lg text-center">
                    <h1 className="text-5xl font-bold">{raffle.title}</h1>
                    <p className="py-6">{raffle.description}</p>
                </div>
                <div className="my-5 mb-10 shadow-xl">
                    <RaffleTable size={raffle.size} tickets={raffle.tickets} onTicketClick={handleTicketClick} />
                </div>
                <div className="flex flex-col w-full">
                    <h3 className="text-3xl text-center mb-3">Prêmios</h3>
                    <ul className="list-decimal menu">
                        {raffle.awards.map((award, i) => (
                            <li key={award.id} className="hover-bordered">
                                <a className="cursor-default">{i + 1}. {award.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RaffleOverviewPage;

RaffleOverviewPage.getLayout = function (page) {
    return <LandpageLayout>{page}</LandpageLayout>
}