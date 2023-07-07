import React, { useEffect, useState } from "react";
import RaffleGrid from "../raffle-grid";
import { type Raffle, type RaffleAward } from "@prisma/client";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { CurrencyBRLFormatter } from "~/components/input/currency";
import { rafflesRouter } from "~/utils/routes";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

type Props = {
    raffle: Raffle & {
        tickets: {
            number: number;
            drawn: boolean;
        }[];
        awards: RaffleAward[];
    },
    onTicketClick?: (raffle: Raffle, ticket: number) => void
}

const RaffleArtboard: React.FC<Props> = ({ raffle, onTicketClick = () => {
    // pass
} }) => {
    const { data } = useSession();
    const [formattedDate, setFormattedDate] = useState('');
    const routeItem = rafflesRouter.overview(raffle.id);

    useEffect(() => {
        setFormattedDate(format(raffle.drawDate, 'P p', { locale: ptBR }));
    }, [raffle.drawDate]);

    const handleTicketClick = (ticket: number) => {
        if (raffle.drawn) {
            return;
        }

        if (!data) {
            toast.custom("Você precisa fazer login para comprar um número.")
            return;
        }

        if (raffle.ownerId === data.user.id) {
            toast.custom("Você não pode comprar números da sua rifa.", { className: "alert-warning" })
            return;
        }

        onTicketClick(raffle, ticket);
    }

    return (
        <div className="artboard phone-2 bg-base-300 rounded-md p-3 pb-5 flex flex-col shadow-md">
            <div className="flex flex-1 flex-col">
                <h2 className="text-2xl text-center font-extrabold break-words my-3">{raffle.title}</h2>
                <div className="flex justify-between mb-3 items-center">
                    <p className="text-sm">Data do Sorteio: <time>{formattedDate}</time></p>
                    <div className="flex items-center">
                        <div className="badge badge-primary mx-2">
                            <CurrencyBRLFormatter displayType="text" value={raffle.price} />
                        </div>
                        {raffle.id && (
                            <Link href={routeItem.link} className="btn btn-sm btn-circle btn-outline" >{routeItem.icon}</Link>
                        )}
                    </div>
                </div>
                <p className="break-words overflow-ellipsis line-clamp-3">{raffle.description}</p>
                <div className="flex flex-1 items-center mb-2">
                    <ul className="menu menu-sm p-0 -ml-3">
                        <li>
                            <h2 className="menu-title">Prêmios</h2>
                            <ul className="overflow-y-auto max-h-24">
                                {raffle.awards.map((award, i) => (
                                    <li key={i} className="hover-bordered">
                                        <a className="hover:cursor-default">{i + 1}º - {award.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <RaffleGrid size={raffle.size} tickets={raffle.tickets} onTicketClick={handleTicketClick} />
        </div>
    );
}

export default RaffleArtboard;