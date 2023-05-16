import { Raffle, RaffleAward } from "@prisma/client";
import React, { useRef, useState } from "react";
import RaffleTable from "./raffle-table";
import { CurrencyBRLFormatter } from "../input/currency";
import { useSession } from "next-auth/react";
import { IoShareSocialOutline } from "react-icons/io5";
import SocialShare from "../social-share";

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
    const viewOnly = data ? (raffle.ownerId === data.user.id) : false;
    const [tab, setTab] = useState(Tab.DETAILS);
    const detailRef = useRef<HTMLDivElement>(null);
    const awardRef = useRef<HTMLDivElement>(null);
    const formatter = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' });
    const roundedClass = tab === Tab.DETAILS ? 'rounded-tl-none' : 'rounded-tr-none';

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
                    <div ref={detailRef} className="carousel-item flex-col w-full">
                        <div className="flex-1">
                            <RaffleTable size={raffle.size} tickets={raffle.tickets.map(({ number }) => number)} viewOnly={viewOnly} onTicketClick={(ticket) => onTicketClick(raffle, ticket)} />
                        </div>
                        <div className="divider"></div>
                        <div className="flex-grow-0">
                            <div className="flex items-center mb-3">
                                <div className="flex-1">
                                    <h2 className="text-2xl font-extrabold break-words">{raffle.title}</h2>
                                    <p className="text-sm text-slate-400">Data do Sorteio: {formatter.format(raffle.drawDate)}</p>
                                </div>
                                <div>
                                    <div className="badge badge-secondary">
                                        <CurrencyBRLFormatter displayType="text" value={raffle.price} />
                                    </div>
                                    <div className="dropdown dropdown-hover dropdown-left">
                                        <label tabIndex={0} className="ml-3 btn btn-sm btn-circle btn-outline"><IoShareSocialOutline /></label>
                                        <ul tabIndex={0} className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-52">
                                            <SocialShare raffle={raffle} />
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p className="break-words">{raffle.description}</p>
                        </div>
                    </div>
                    <div ref={awardRef} className="carousel-item flex-col w-full">
                        <ul className="menu">
                            <li className="menu-title">
                                <span>Prêmios</span>
                            </li>
                            {raffle.awards.map(({ name, id }) => (
                                <li key={id} className="hover-bordered"><a className="cursor-default">{name}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RaffleCard;