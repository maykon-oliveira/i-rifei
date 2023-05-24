import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { BreadcrumbsContext } from "~/utils/context/breadcrumbs";
import { purchasesRouter, rafflesRouter } from "~/utils/routes";
import { api } from "~/utils/trpc";

type Props = {

}

type RaffleTicketGrouped = {
    id: string;
    title: string;
    drawDate: Date;
    tickets: number[];
}

const MyPurchasesPage: React.FC<Props> = () => {
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);

    useEffect(() => setBreadcrumbs([purchasesRouter.list], []), []);

    const { data, isLoading } = api.ticket.myPurchases.useQuery();

    if (!data || isLoading) {
        return <h1>Carregando...</h1>
    }

    const tickets: RaffleTicketGrouped[] = data.reduce((acc: RaffleTicketGrouped[], curr) => {
        const raffle = acc.find(({ id }) => id === curr.raffle.id);

        if (!raffle) {
            return [...acc, { ...curr.raffle, tickets: [curr.number] }]
        } else {
            raffle.tickets.push(curr.number);
        }

        return [...acc];
    }, []);

    return (
        <div className="sm:overflow-x-auto">
            <table className="table table-zebra table-compact w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Título</th>
                        <th>Data do Sorteio</th>
                        <th>Números</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((raffle, i) => {
                        const routeItem = rafflesRouter.overview(raffle.id);

                        return (
                            <tr key={i}>
                                <th>
                                    <Link href={routeItem.link} className="btn btn-ghost" >{routeItem.icon}</Link>
                                </th>
                                <td>{raffle.title}</td>
                                <td>
                                    <span>
                                        {format(raffle.drawDate, 'P p', { locale: ptBR })}
                                    </span>
                                </td>
                                <td>
                                    <span className="badge rounded text-lg py-4">{raffle.tickets.sort((a, b) => a < b ? -1 : 1).join(", ")}</span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default MyPurchasesPage;