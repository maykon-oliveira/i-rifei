import { Raffle, RaffleAward } from "@prisma/client";
import React, { useRef, useState } from "react";
import RaffleTable from "./raffle-table";
import { CurrencyBRLFormatter } from "../input/currency";
import { IoShareSocialOutline } from "react-icons/io5";
import SocialShare from "../social-share";

type Props = {
    raffle: Raffle & { awards: RaffleAward[] }
}

enum Tab {
    DETAILS = 0,
    AWARDS = 1
}

const RaffleCard: React.FC<Props> = ({ raffle }) => {
    const [tab, setTab] = useState(Tab.DETAILS);
    const detailRef = useRef<HTMLDivElement>(null);
    const awardRef = useRef<HTMLDivElement>(null);
    const formatter = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' });

    const switchTab = () => {
        if (tab === Tab.DETAILS) {
            setTab(Tab.AWARDS);
            awardRef.current?.scrollIntoView();
        } else {
            setTab(Tab.DETAILS);
            detailRef.current?.scrollIntoView();
        }
    }

    return (
        <div className="card bg-base-300 w-10/12 mx-auto indicator">
            <span className="indicator-item">
                <div className="dropdown dropdown-end dropdown-hover">
                    <button tabIndex={0} className="btn btn-tiny btn-circle btn-primary">
                        <IoShareSocialOutline />
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <SocialShare raffle={raffle} />
                    </ul>
                </div>
            </span>
            <div className="carousel flex-grow w-full">
                <div ref={detailRef} className="carousel-item flex-col w-full">
                    <div className="px-10 pt-10 flex-1">
                        <RaffleTable size={raffle.size} />
                    </div>
                    <div className="divider"></div>
                    <div className="card-body flex-grow-0 pt-0">
                        <h2 className="card-title break-all justify-between">
                            {raffle.title}
                            <div className="badge badge-secondary">
                                <CurrencyBRLFormatter displayType="text" value={raffle.price} />
                            </div>
                        </h2>
                        <p className="text-sm text-slate-500">Data do Sorteio: {formatter.format(raffle.drawDate)}</p>
                        <p className="leading-relaxed break-words">{raffle.description}</p>
                    </div>
                </div>
                <div ref={awardRef} className="carousel-item flex-col w-full">
                    <ul className="menu m-10">
                        <li className="menu-title">
                            <span>Prêmios</span>
                        </li>
                        {raffle.awards.map(({ name, id }) => (
                            <li key={id} className="hover-bordered"><a className="cursor-default">{name}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="tabs">
                <a onClick={switchTab} className={`flex-1 tab tab-bordered ${(tab === Tab.DETAILS) && 'tab-active'}`}>
                    Detalhes
                </a>
                <a onClick={switchTab} className={`flex-1 tab tab-bordered ${(tab === Tab.AWARDS) && 'tab-active'}`}>
                    Prêmios
                </a>
            </div>
        </div>
    );
}

export default RaffleCard;