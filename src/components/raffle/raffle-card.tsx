import { Raffle } from "@prisma/client";
import React from "react";
import RaffleTable from "./raffle-table";
import { CurrencyBRLFormatter } from "../input/currency";
import { IoShareSocialOutline } from "react-icons/io5";
import SocialShare from "../social-share";
import { useSession } from "next-auth/react";

type Props = {
    raffle: Raffle
}

const RaffleCard: React.FC<Props> = ({ raffle }) => {
    const { data } = useSession();
    const canBuy = (data?.user.id != raffle.ownerId);

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
            <div className={`px-10 pt-10 flex-1 ${canBuy && 'tooltip'} tooltip-secondary`} data-tip="Escolha um número para comprar">
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
                <p className="leading-relaxed mt-4 break-words">{raffle.description}</p>
            </div>
        </div>
    );
}

export default RaffleCard;