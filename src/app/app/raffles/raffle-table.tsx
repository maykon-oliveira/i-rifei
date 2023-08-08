"use client";

import { type Raffle } from "@prisma/client";
import { isBefore, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import Drawn from "~/components/drawn";
import { rafflesRouter } from "~/utils/routes";
import RafleTableActions from "./raffle-table-action";
import { BreadcrumbsContext } from "~/utils/context/breadcrumbs";
import { api } from "~/utils/trpc";

type Props = {
    raffles: Raffle[]
}

const RaffleTable: React.FC<Props> = ({ raffles: initialData }) => {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);

    useEffect(() => setBreadcrumbs([rafflesRouter.list], [rafflesRouter.new]), []);

    const { data, refetch } = api.raffle.getMyRaffles.useQuery(undefined, { enabled: false, initialData });

    const onDelete = async () => {
        await refetch()
    };

    return (
        <table className="table table-zebra table-compact w-full mb-64">
            <thead>
                <tr>
                    <th></th>
                    <th>Título</th>
                    <th className="flex justify-center">Nº Vendidos</th>
                    <th>Data do Sorteio</th>
                    <th>Sorteado</th>
                    <th className="text-center"></th>
                </tr>
            </thead>
            <tbody>
                {data?.map((raffle) => {
                    const routeItem = rafflesRouter.view(raffle);
                    const totalTickets = raffle.size * raffle.size;

                    return (
                        <tr key={raffle.id}>
                            <th>
                                <Link href={routeItem.link} className="btn btn-ghost" >{routeItem.icon}</Link>
                            </th>
                            <td>{raffle.title}</td>
                            <td>
                                <div className="flex justify-center">
                                    <div className={`badge rounded ${raffle.tickets?.length === totalTickets ? 'badge-success tooltip' : ''}`} data-tip="Todos os números vendidos">{raffle.tickets?.length}/{totalTickets}</div>
                                </div>
                            </td>
                            <td>
                                <span className={`${!raffle.drawn && isBefore(raffle.drawDate, new Date()) ? 'badge-error tooltip rounded px-2' : ''}`} data-tip="Data do sorteio expirou">
                                    {format(raffle.drawDate, 'P p', { locale: ptBR })}
                                </span>
                            </td>
                            <td><Drawn drawn={raffle.drawn} /></td>
                            <td className="text-center">
                                <div className="dropdown dropdown-hover dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost m-1"><IoEllipsisVertical /></label>
                                    <ul tabIndex={0} className="dropdown-content z-30 menu menu-compact p-2 shadow bg-base-100 rounded-box w-52">
                                        <RafleTableActions onDelete={onDelete} raffle={raffle} />
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

export default RaffleTable;