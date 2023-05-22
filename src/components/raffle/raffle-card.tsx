import { Raffle, RaffleAward } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import RaffleTable from "./raffle-table";
import { CurrencyBRLFormatter } from "../input/currency";
import { useSession } from "next-auth/react";
import { IoShareSocialOutline } from "react-icons/io5";
import SocialShare from "../social-share";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "react-hot-toast";

type Props = {
    raffle: Raffle & {
        tickets: {
            number: number;
        }[];
        awards: RaffleAward[];
    },
    onTicketClick: (raffle: Raffle, ticket: number) => void
}

enum Tab {
    DETAILS = 0,
    AWARDS = 1
}

const RaffleCard: React.FC<Props> = ({ raffle, onTicketClick }) => {
    const { data } = useSession();
    const [tab, setTab] = useState(Tab.DETAILS);
    const detailRef = useRef<HTMLDivElement>(null);
    const awardRef = useRef<HTMLDivElement>(null);
    const roundedClass = tab === Tab.DETAILS ? 'rounded-tl-none' : 'rounded-tr-none';
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        setFormattedDate(format(raffle.drawDate, 'P p', { locale: ptBR }));
    }, [raffle.drawDate]);

    const switchTab = () => {
        if (tab === Tab.DETAILS) {
            setTab(Tab.AWARDS);
            awardRef.current?.scrollIntoView({
                block: 'nearest'
            });
        } else {
            setTab(Tab.DETAILS);
            detailRef.current?.scrollIntoView({
                block: 'nearest'
            });
        }
    }

    const handleTicketClick = (ticket: number) => {
        if (!data) {
            toast.custom("Você precisa fazer login para comprar um número")
            return;
        }

        if (raffle.ownerId === data.user.id) {
            toast.custom("Você não pode comprar números da sua rifa", { className: "alert-warning" })
            return;
        }

        onTicketClick(raffle, ticket);
    }

    return (
        <div className="max-w-lg mx-auto flex flex-col">
            <div className="tabs w-full">
                <a onClick={switchTab} className={`tab tab-lifted tab-border-none tab-lg flex-1 ${(tab === Tab.DETAILS) && 'text-base-content bg-base-300'}`}>
                    Detalhes
                </a>
                <a onClick={switchTab} className={`tab tab-lifted tab-border-none tab-lg flex-1 ${(tab === Tab.AWARDS) && 'text-base-content bg-base-300'}`}>
                    Prêmios
                </a>
            </div>
            <div className={`bg-base-300 rounded-xl flex-1 ${roundedClass} p-10 shadow-xl`}>
                <div className="carousel h-full">
                    <div ref={detailRef} className="carousel-item flex-col w-full mx-1">
                        <div className="flex-1">
                            <RaffleTable size={raffle.size} tickets={raffle.tickets.map(({ number }) => number)} onTicketClick={handleTicketClick} />
                        </div>
                        <div className="divider"></div>
                        <div className="flex-grow-0">
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-extrabold break-words">{raffle.title}</h2>
                                <div className="flex justify-between mb-3 items-center">
                                    <p className="text-base-content/70 text-sm">Data do Sorteio: {formattedDate}</p>
                                    <div className="flex items-center">
                                        <div className="badge badge-primary">
                                            <CurrencyBRLFormatter displayType="text" value={raffle.price} />
                                        </div>
                                        {raffle.id && (
                                            <div className="dropdown dropdown-hover dropdown-left">
                                                <label tabIndex={0} className="ml-3 btn btn-sm btn-circle btn-outline"><IoShareSocialOutline /></label>
                                                <ul tabIndex={0} className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-52">
                                                    <SocialShare raffle={raffle} />
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="break-words">{raffle.description}</p>
                            </div>
                        </div>
                    </div>
                    <div ref={awardRef} className="carousel-item flex-col w-full mx-1">
                        <ul className="menu">
                            <li className="menu-title">
                                <span>Prêmios</span>
                            </li>
                            {raffle.awards.map(({ name }, i) => (
                                <li key={i} className="hover-bordered"><a className="cursor-default">{name}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RaffleCard;